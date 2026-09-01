(() => {
  const avatar = document.getElementById('avatar');
  const wrap = avatar.querySelector('.sprite-wrap');
  const statusText = document.getElementById('statusText');
  const speechBubble = document.getElementById('speechBubble');
  const panel = document.getElementById('debugPanel');
  const toggle = document.getElementById('debugToggle');
  const emotionSelect = document.getElementById('emotionSelect');
  const intensityRange = document.getElementById('intensityRange');
  const physicsRange = document.getElementById('physicsRange');
  const speakingCheck = document.getElementById('speakingCheck');

  const VALID_EMOTIONS = ['neutral', 'happy', 'shy', 'sad', 'angry', 'flirty', 'provocative', 'focused'];
  const VALID_GESTURES = ['nod', 'tilt', 'bounce', 'step'];

  const state = {
    emotion: 'neutral',
    intensity: 0.55,
    physics: 0.62,
    speaking: false,
    text: 'Ciao. Sono qui.'
  };

  const motion = {
    targetX: 0,
    targetY: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rot: 0,
    vrot: 0,
    lastT: performance.now()
  };

  const clamp01 = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : fallback;
  };

  function render() {
    avatar.className = `avatar state-idle emotion-${state.emotion}`;
    avatar.dataset.speaking = String(state.speaking);
    document.documentElement.style.setProperty('--intensity', state.intensity.toFixed(2));
    document.documentElement.style.setProperty('--physics', state.physics.toFixed(2));

    statusText.textContent = state.speaking
      ? `Luna · sta parlando · ${state.emotion}`
      : `Luna · pronta · ${state.emotion}`;

    speechBubble.textContent = state.text || '';
    speechBubble.style.visibility = state.text ? 'visible' : 'hidden';
    emotionSelect.value = state.emotion;
    intensityRange.value = String(state.intensity);
    physicsRange.value = String(state.physics);
    speakingCheck.checked = state.speaking;
  }

  function setState(next = {}) {
    if (next.emotion && VALID_EMOTIONS.includes(next.emotion)) state.emotion = next.emotion;
    if (next.intensity !== undefined) state.intensity = clamp01(next.intensity, state.intensity);
    if (next.physics !== undefined) state.physics = clamp01(next.physics, state.physics);
    if (next.speaking !== undefined) state.speaking = Boolean(next.speaking);
    if (next.text !== undefined) state.text = String(next.text);
    render();
    return { ...state };
  }

  function impulse(x = 0, y = 0, rotation = 0) {
    const p = 0.25 + state.physics * 1.1;
    motion.vx += Number(x) * p;
    motion.vy += Number(y) * p;
    motion.vrot += Number(rotation) * p;
  }

  function gesture(name) {
    if (!VALID_GESTURES.includes(name)) return false;
    avatar.classList.remove(...VALID_GESTURES.map(g => `gesture-${g}`));
    void avatar.offsetWidth;
    avatar.classList.add(`gesture-${name}`);

    if (name === 'nod') impulse(0, 9, 0);
    if (name === 'tilt') impulse(-5, 1, -1.2);
    if (name === 'bounce') impulse(0, -18, .35);
    if (name === 'step') impulse(9, -5, .8);

    window.setTimeout(() => avatar.classList.remove(`gesture-${name}`), 950);
    return true;
  }

  function speak(text, options = {}) {
    setState({
      text,
      speaking: true,
      emotion: options.emotion || state.emotion,
      intensity: options.intensity ?? state.intensity
    });
    impulse(0, -3, .18);

    if (options.autoStopMs !== 0) {
      const duration = options.autoStopMs || Math.max(1300, Math.min(8000, String(text).length * 48));
      window.setTimeout(() => setState({ speaking: false }), duration);
    }
  }

  function onMatrixEvent(payload) {
    if (!payload || typeof payload !== 'object') return;
    if (payload.type === 'luna.state') return void setState(payload);
    if (payload.type === 'luna.speak') return void speak(payload.text || '', payload);
    if (payload.type === 'luna.gesture') return void gesture(payload.gesture);
    if (payload.type === 'luna.motion') return void impulse(payload.x || 0, payload.y || 0, payload.rotation || 0);
  }

  function physicsLoop(now) {
    const dt = Math.min(0.032, Math.max(0.001, (now - motion.lastT) / 1000));
    motion.lastT = now;

    const stiffness = 28 + state.physics * 34;
    const damping = 7.5 + (1 - state.physics) * 3.5;

    motion.vx += (motion.targetX - motion.x) * stiffness * dt;
    motion.vy += (motion.targetY - motion.y) * stiffness * dt;
    motion.vx *= Math.exp(-damping * dt);
    motion.vy *= Math.exp(-damping * dt);
    motion.x += motion.vx * dt;
    motion.y += motion.vy * dt;

    const targetRot = motion.x * .035;
    motion.vrot += (targetRot - motion.rot) * (stiffness * .8) * dt;
    motion.vrot *= Math.exp(-(damping + 1.2) * dt);
    motion.rot += motion.vrot * dt;

    const maxX = 10 + state.physics * 9;
    const maxY = 8 + state.physics * 11;
    const x = Math.max(-maxX, Math.min(maxX, motion.x));
    const y = Math.max(-maxY, Math.min(maxY, motion.y));
    const r = Math.max(-1.8, Math.min(1.8, motion.rot));

    wrap.style.setProperty('--spring-x', `${x.toFixed(2)}px`);
    wrap.style.setProperty('--spring-y', `${y.toFixed(2)}px`);
    wrap.style.setProperty('--spring-r', `${r.toFixed(3)}deg`);

    requestAnimationFrame(physicsLoop);
  }

  window.LunaAvatar = {
    version: '0.2.0',
    setState,
    getState: () => ({ ...state }),
    gesture,
    impulse,
    speak,
    onMatrixEvent,
    emotions: [...VALID_EMOTIONS],
    gestures: [...VALID_GESTURES]
  };

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (data && typeof data === 'object' && String(data.type || '').startsWith('luna.')) onMatrixEvent(data);
  });

  toggle.addEventListener('click', () => { panel.hidden = !panel.hidden; });
  emotionSelect.addEventListener('change', (event) => setState({ emotion: event.target.value }));
  intensityRange.addEventListener('input', (event) => setState({ intensity: event.target.value }));
  physicsRange.addEventListener('input', (event) => setState({ physics: event.target.value }));
  speakingCheck.addEventListener('change', (event) => setState({ speaking: event.target.checked }));
  panel.querySelectorAll('[data-gesture]').forEach((button) => button.addEventListener('click', () => gesture(button.dataset.gesture)));

  let lastPointer = null;
  window.addEventListener('pointermove', (event) => {
    const nx = (event.clientX / window.innerWidth - 0.5) * 2;
    const ny = (event.clientY / window.innerHeight - 0.5) * 2;
    wrap.style.setProperty('--look-x', nx.toFixed(3));
    wrap.style.setProperty('--look-y', ny.toFixed(3));

    if (lastPointer) {
      const dx = event.clientX - lastPointer.x;
      const dy = event.clientY - lastPointer.y;
      impulse(dx * .035, dy * .02, dx * .002);
    }
    lastPointer = { x: event.clientX, y: event.clientY };
  }, { passive: true });

  window.addEventListener('pointerdown', () => impulse(0, -4, 0));

  render();
  requestAnimationFrame(physicsLoop);
})();
