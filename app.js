(() => {
  const avatar = document.getElementById('avatar');
  const statusText = document.getElementById('statusText');
  const speechBubble = document.getElementById('speechBubble');
  const panel = document.getElementById('debugPanel');
  const toggle = document.getElementById('debugToggle');
  const emotionSelect = document.getElementById('emotionSelect');
  const intensityRange = document.getElementById('intensityRange');
  const speakingCheck = document.getElementById('speakingCheck');

  const VALID_EMOTIONS = ['neutral', 'happy', 'shy', 'sad', 'angry', 'flirty', 'provocative', 'focused'];
  const VALID_GESTURES = ['nod', 'tilt', 'bounce'];

  const state = {
    emotion: 'neutral',
    intensity: 0.55,
    speaking: false,
    text: 'Ciao. Sono qui.'
  };

  function clamp01(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return state.intensity;
    return Math.max(0, Math.min(1, n));
  }

  function render() {
    avatar.className = `avatar state-idle emotion-${state.emotion}`;
    avatar.dataset.speaking = String(state.speaking);
    document.documentElement.style.setProperty('--intensity', state.intensity.toFixed(2));

    statusText.textContent = state.speaking
      ? `Luna · sta parlando · ${state.emotion}`
      : `Luna · pronta · ${state.emotion}`;

    speechBubble.textContent = state.text || '';
    speechBubble.style.visibility = state.text ? 'visible' : 'hidden';

    if ([...emotionSelect.options].some(option => option.value === state.emotion)) {
      emotionSelect.value = state.emotion;
    }
    intensityRange.value = String(state.intensity);
    speakingCheck.checked = state.speaking;
  }

  function setState(next = {}) {
    if (next.emotion && VALID_EMOTIONS.includes(next.emotion)) state.emotion = next.emotion;
    if (next.intensity !== undefined) state.intensity = clamp01(next.intensity);
    if (next.speaking !== undefined) state.speaking = Boolean(next.speaking);
    if (next.text !== undefined) state.text = String(next.text);
    render();
    return { ...state };
  }

  function gesture(name) {
    if (!VALID_GESTURES.includes(name)) return false;
    const className = `gesture-${name}`;
    avatar.classList.remove(...VALID_GESTURES.map(g => `gesture-${g}`));
    void avatar.offsetWidth;
    avatar.classList.add(className);
    window.setTimeout(() => avatar.classList.remove(className), 900);
    return true;
  }

  function speak(text, options = {}) {
    setState({ text, speaking: true, emotion: options.emotion || state.emotion, intensity: options.intensity ?? state.intensity });
    if (options.autoStopMs !== 0) {
      const duration = options.autoStopMs || Math.max(1300, Math.min(8000, String(text).length * 48));
      window.setTimeout(() => setState({ speaking: false }), duration);
    }
  }

  function onMatrixEvent(payload) {
    if (!payload || typeof payload !== 'object') return;
    if (payload.type === 'luna.state') return void setState(payload);
    if (payload.type === 'luna.speak') return void speak(payload.text || '', payload);
    if (payload.type === 'luna.gesture') gesture(payload.gesture);
  }

  window.LunaAvatar = {
    version: '0.1.1', setState, getState: () => ({ ...state }), gesture, speak, onMatrixEvent,
    emotions: [...VALID_EMOTIONS], gestures: [...VALID_GESTURES]
  };

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (data && typeof data === 'object' && String(data.type || '').startsWith('luna.')) onMatrixEvent(data);
  });

  toggle.addEventListener('click', () => { panel.hidden = !panel.hidden; });
  emotionSelect.addEventListener('change', (event) => setState({ emotion: event.target.value }));
  intensityRange.addEventListener('input', (event) => setState({ intensity: event.target.value }));
  speakingCheck.addEventListener('change', (event) => setState({ speaking: event.target.checked }));
  panel.querySelectorAll('[data-gesture]').forEach((button) => button.addEventListener('click', () => gesture(button.dataset.gesture)));

  let lastMove = 0;
  window.addEventListener('pointermove', (event) => {
    const now = performance.now();
    if (now - lastMove < 34) return;
    lastMove = now;
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    const wrap = avatar.querySelector('.sprite-wrap');
    wrap.style.setProperty('--look-x', x.toFixed(3));
    wrap.style.setProperty('--look-y', y.toFixed(3));
  }, { passive: true });

  render();
})();
