(() => {
  const avatar = document.getElementById('avatar');
  const statusText = document.getElementById('statusText');
  const speechBubble = document.getElementById('speechBubble');
  const panel = document.getElementById('debugPanel');
  const toggle = document.getElementById('debugToggle');
  const emotionSelect = document.getElementById('emotionSelect');
  const intensityRange = document.getElementById('intensityRange');
  const physicsRange = document.getElementById('physicsRange');
  const speakingCheck = document.getElementById('speakingCheck');
  const rigStatus = document.getElementById('rigStatus');
  const rigLayers = [...document.querySelectorAll('[data-layer]')];

  const VALID_EMOTIONS = ['neutral','happy','shy','sad','angry','flirty','provocative','focused'];
  const VALID_GESTURES = ['nod','tilt','bounce','step'];
  const REQUIRED_LAYERS = ['hairBack','body','chest','head','eyesOpen','eyesClosed','mouthClosed','mouthOpen','hairFront'];
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const state = { emotion:'neutral', intensity:.55, physics:.62, speaking:false, text:'Ciao. Sono qui.', rig:'pseudo', reducedMotion:reducedMotionQuery.matches };
  const motion = {
    targetX:0,targetY:0,x:0,y:0,vx:0,vy:0,rot:0,vrot:0,
    headX:0,headY:0,headVX:0,headVY:0,headRot:0,headVRot:0,
    hairX:0,hairY:0,hairVX:0,hairVY:0,hairRot:0,hairVRot:0,
    chestX:0,chestY:0,chestVX:0,chestVY:0,
    lookX:0,lookY:0,lastT:performance.now()
  };

  let blinkTimer=0, blinkUntil=0, mouthTimer=0;
  let lastPointer=null;
  const clamp01=(value,fallback=0)=>{const n=Number(value);return Number.isFinite(n)?Math.max(0,Math.min(1,n)):fallback};
  const spring=(pos,vel,target,k,d,dt)=>{vel+=(target-pos)*k*dt;vel*=Math.exp(-d*dt);pos+=vel*dt;return[pos,vel]};

  async function detectRig(){
    const loaded=new Set();
    await Promise.all(rigLayers.map(img=>new Promise(resolve=>{
      const name=img.dataset.layer;
      const done=ok=>{if(ok)loaded.add(name);resolve()};
      if(img.complete)return done(img.naturalWidth>0);
      img.addEventListener('load',()=>done(true),{once:true});
      img.addEventListener('error',()=>done(false),{once:true});
    })));
    const complete=REQUIRED_LAYERS.every(name=>loaded.has(name));
    state.rig=complete?'layered':'pseudo';
    avatar.dataset.rig=state.rig;
    if(rigStatus)rigStatus.textContent=complete?'Rig: layered · blink/lip-sync/fisica indipendente':'Rig: pseudo-layer · testa/capelli/torace animati dalla PNG canonica';
    return complete;
  }

  function render(){
    avatar.className=`avatar state-idle emotion-${state.emotion}`;
    avatar.dataset.speaking=String(state.speaking);
    avatar.dataset.rig=state.rig;
    avatar.dataset.reducedMotion=String(state.reducedMotion);
    const root=document.documentElement.style;
    root.setProperty('--intensity',state.intensity.toFixed(2));
    root.setProperty('--physics',state.physics.toFixed(2));
    statusText.textContent=state.speaking?`Luna · sta parlando · ${state.emotion}`:`Luna · pronta · ${state.emotion}`;
    speechBubble.textContent=state.text||'';
    speechBubble.style.visibility=state.text?'visible':'hidden';
    emotionSelect.value=state.emotion;
    intensityRange.value=String(state.intensity);
    physicsRange.value=String(state.physics);
    speakingCheck.checked=state.speaking;
  }

  function setState(next={}){
    if(next.emotion&&VALID_EMOTIONS.includes(next.emotion))state.emotion=next.emotion;
    if(next.intensity!==undefined)state.intensity=clamp01(next.intensity,state.intensity);
    if(next.physics!==undefined)state.physics=clamp01(next.physics,state.physics);
    if(next.speaking!==undefined)state.speaking=Boolean(next.speaking);
    if(next.text!==undefined)state.text=String(next.text);
    render();
    return {...state};
  }

  function impulse(x=0,y=0,rotation=0){
    if(state.reducedMotion)return;
    const p=.25+state.physics*1.1;
    motion.vx+=Number(x)*p; motion.vy+=Number(y)*p; motion.vrot+=Number(rotation)*p;
    motion.headVX+=Number(x)*p*.16; motion.headVY+=Number(y)*p*.11; motion.headVRot+=Number(rotation)*p*.42;
    motion.hairVX-=Number(x)*p*.24; motion.hairVY-=Number(y)*p*.16; motion.hairVRot-=Number(rotation)*p*.62;
    motion.chestVX-=Number(x)*p*.08; motion.chestVY-=Number(y)*p*.28;
  }

  function gesture(name){
    if(!VALID_GESTURES.includes(name))return false;
    avatar.classList.remove(...VALID_GESTURES.map(g=>`gesture-${g}`));
    void avatar.offsetWidth;
    avatar.classList.add(`gesture-${name}`);
    if(name==='nod')impulse(0,9,0);
    if(name==='tilt')impulse(-5,1,-1.2);
    if(name==='bounce')impulse(0,-18,.35);
    if(name==='step')impulse(9,-5,.8);
    setTimeout(()=>avatar.classList.remove(`gesture-${name}`),950);
    return true;
  }

  function speak(text,options={}){
    setState({text,speaking:true,emotion:options.emotion||state.emotion,intensity:options.intensity??state.intensity});
    impulse(0,-3,.18);
    if(options.autoStopMs!==0){
      const duration=options.autoStopMs||Math.max(1300,Math.min(8000,String(text).length*48));
      setTimeout(()=>setState({speaking:false}),duration);
    }
  }

  function onMatrixEvent(payload){
    if(!payload||typeof payload!=='object')return;
    if(payload.type==='luna.state')return void setState(payload);
    if(payload.type==='luna.speak')return void speak(payload.text||'',payload);
    if(payload.type==='luna.gesture')return void gesture(payload.gesture);
    if(payload.type==='luna.motion')return void impulse(payload.x||0,payload.y||0,payload.rotation||0);
  }

  function updateFace(now){
    if(state.rig!=='layered'){
      avatar.dataset.blink='false';
      avatar.dataset.mouth='closed';
      return;
    }
    if(now>blinkTimer){blinkUntil=now+90+Math.random()*70;blinkTimer=now+2200+Math.random()*4200;}
    avatar.dataset.blink=String(now<blinkUntil);
    if(state.speaking){
      if(now>mouthTimer){avatar.dataset.mouth=avatar.dataset.mouth==='open'?'closed':'open';mouthTimer=now+75+Math.random()*125;}
    } else avatar.dataset.mouth='closed';
  }

  function resetMotionCSS(){
    const root=document.documentElement.style;
    root.setProperty('--spring-x','0px');root.setProperty('--spring-y','0px');root.setProperty('--spring-r','0deg');
    root.setProperty('--head-x','0px');root.setProperty('--head-y','0px');root.setProperty('--head-r','0deg');
    root.setProperty('--hair-x','0px');root.setProperty('--hair-y','0px');root.setProperty('--hair-r','0deg');
    root.setProperty('--chest-x','0px');root.setProperty('--chest-y','0px');root.setProperty('--chest-sx','1');root.setProperty('--chest-sy','1');
  }

  function physicsLoop(now){
    const dt=Math.min(.032,Math.max(.001,(now-motion.lastT)/1000));
    motion.lastT=now;

    if(state.reducedMotion){
      updateFace(now);
      requestAnimationFrame(physicsLoop);
      return;
    }

    const stiffness=28+state.physics*34,damping=7.5+(1-state.physics)*3.5;
    [motion.x,motion.vx]=spring(motion.x,motion.vx,motion.targetX,stiffness,damping,dt);
    [motion.y,motion.vy]=spring(motion.y,motion.vy,motion.targetY,stiffness,damping,dt);
    const targetRot=motion.x*.035;
    [motion.rot,motion.vrot]=spring(motion.rot,motion.vrot,targetRot,stiffness*.8,damping+1.2,dt);

    const headTX=motion.x*.12+motion.lookX*1.4;
    const headTY=motion.y*.08+motion.lookY*.8;
    [motion.headX,motion.headVX]=spring(motion.headX,motion.headVX,headTX,52,9.4,dt);
    [motion.headY,motion.headVY]=spring(motion.headY,motion.headVY,headTY,50,9.2,dt);
    [motion.headRot,motion.headVRot]=spring(motion.headRot,motion.headVRot,motion.rot*.28,44,8.8,dt);

    [motion.hairX,motion.hairVX]=spring(motion.hairX,motion.hairVX,-motion.x*.18,24,5.8,dt);
    [motion.hairY,motion.hairVY]=spring(motion.hairY,motion.hairVY,-motion.y*.10,22,5.6,dt);
    [motion.hairRot,motion.hairVRot]=spring(motion.hairRot,motion.hairVRot,-motion.rot*.42,20,5.4,dt);

    const breath=Math.sin(now/660)*(.18+.22*state.physics);
    [motion.chestX,motion.chestVX]=spring(motion.chestX,motion.chestVX,-motion.x*.055,31,6.4,dt);
    [motion.chestY,motion.chestVY]=spring(motion.chestY,motion.chestVY,-motion.y*.16+breath,27,5.8,dt);

    const maxX=10+state.physics*9,maxY=8+state.physics*11;
    const x=Math.max(-maxX,Math.min(maxX,motion.x));
    const y=Math.max(-maxY,Math.min(maxY,motion.y));
    const r=Math.max(-1.8,Math.min(1.8,motion.rot));
    const root=document.documentElement.style;
    root.setProperty('--spring-x',`${x.toFixed(2)}px`);root.setProperty('--spring-y',`${y.toFixed(2)}px`);root.setProperty('--spring-r',`${r.toFixed(3)}deg`);
    root.setProperty('--head-x',`${motion.headX.toFixed(2)}px`);root.setProperty('--head-y',`${motion.headY.toFixed(2)}px`);root.setProperty('--head-r',`${motion.headRot.toFixed(3)}deg`);
    root.setProperty('--hair-x',`${motion.hairX.toFixed(2)}px`);root.setProperty('--hair-y',`${motion.hairY.toFixed(2)}px`);root.setProperty('--hair-r',`${motion.hairRot.toFixed(3)}deg`);
    root.setProperty('--chest-x',`${motion.chestX.toFixed(2)}px`);root.setProperty('--chest-y',`${motion.chestY.toFixed(2)}px`);
    root.setProperty('--chest-sx',(1+Math.abs(motion.chestX)*.0008).toFixed(4));root.setProperty('--chest-sy',(1+Math.max(-.004,breath*.0024)).toFixed(4));
    updateFace(now);
    requestAnimationFrame(physicsLoop);
  }

  function onPointerMove(event){
    const now=performance.now();
    motion.lookX=(event.clientX/window.innerWidth-.5)*2;
    motion.lookY=(event.clientY/window.innerHeight-.5)*2;
    const root=document.documentElement.style;
    root.setProperty('--look-x',motion.lookX.toFixed(3));
    root.setProperty('--look-y',motion.lookY.toFixed(3));

    if(lastPointer&&!state.reducedMotion){
      const elapsed=Math.max(8,Math.min(80,now-lastPointer.t));
      const frameScale=16.667/elapsed;
      const dx=(event.clientX-lastPointer.x)*frameScale;
      const dy=(event.clientY-lastPointer.y)*frameScale;
      impulse(dx*.035,dy*.02,dx*.002);
    }
    lastPointer={x:event.clientX,y:event.clientY,t:now};
  }

  function onReducedMotionChange(event){
    state.reducedMotion=event.matches;
    if(state.reducedMotion){
      Object.assign(motion,{x:0,y:0,vx:0,vy:0,rot:0,vrot:0,headX:0,headY:0,headVX:0,headVY:0,headRot:0,headVRot:0,hairX:0,hairY:0,hairVX:0,hairVY:0,hairRot:0,hairVRot:0,chestX:0,chestY:0,chestVX:0,chestVY:0});
      resetMotionCSS();
    }
    render();
  }

  window.LunaAvatar={version:'0.3.2',setState,getState:()=>({...state}),gesture,impulse,speak,onMatrixEvent,emotions:[...VALID_EMOTIONS],gestures:[...VALID_GESTURES],detectRig};
  window.addEventListener('message',event=>{const data=event.data;if(data&&typeof data==='object'&&String(data.type||'').startsWith('luna.'))onMatrixEvent(data)});
  window.addEventListener('pointermove',onPointerMove,{passive:true});
  window.addEventListener('pointerdown',()=>impulse(0,-4,0),{passive:true});
  reducedMotionQuery.addEventListener?.('change',onReducedMotionChange);
  toggle.addEventListener('click',()=>{panel.hidden=!panel.hidden});
  emotionSelect.addEventListener('change',e=>setState({emotion:e.target.value}));
  intensityRange.addEventListener('input',e=>setState({intensity:e.target.value}));
  physicsRange.addEventListener('input',e=>setState({physics:e.target.value}));
  speakingCheck.addEventListener('change',e=>setState({speaking:e.target.checked}));
  panel.querySelectorAll('[data-gesture]').forEach(button=>button.addEventListener('click',()=>gesture(button.dataset.gesture)));

  render();
  detectRig().then(render);
  requestAnimationFrame(physicsLoop);
})();
