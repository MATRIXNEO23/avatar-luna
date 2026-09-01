# Luna Virtual Assistant

Prototipo separato di avatar 2D leggero per Matrix Engine.

## Avvio rapido

Aprire `index.html` in un browser oppure pubblicare la repo con GitHub Pages.

## Asset corrente

- `luna_08_no_cape.png`

## Funzioni incluse

- idle continuo
- respirazione leggera
- floating/micro movimento
- aura dinamica
- stato `speaking`
- emozioni runtime: `neutral`, `happy`, `shy`, `sad`, `angry`, `flirty`, `focused`
- gesture: `nod`, `tilt`, `bounce`
- pannello test mobile
- API JavaScript predisposta per Matrix Engine
- ricezione eventi via `window.postMessage`

## API

```js
LunaAvatar.setState({
  emotion: 'happy',
  intensity: 0.8,
  speaking: false,
  text: 'Sono felice di vederti.'
});

LunaAvatar.speak('Ciao.', {
  emotion: 'happy',
  intensity: 0.7
});

LunaAvatar.gesture('nod');
```

### Eventi Matrix

```js
window.postMessage({
  type: 'luna.state',
  emotion: 'focused',
  intensity: 0.65,
  speaking: false,
  text: 'Sto pensando.'
}, '*');

window.postMessage({
  type: 'luna.speak',
  text: 'Ho trovato una risposta.',
  emotion: 'happy',
  intensity: 0.75
}, '*');

window.postMessage({
  type: 'luna.gesture',
  gesture: 'nod'
}, '*');
```

## Limite della v0.1

L'asset corrente è una singola immagine. Le variazioni emotive agiscono quindi su movimento, luce e stato visivo, ma non modificano realmente occhi/bocca. Per blink reale, lip-sync e mimica facciale serviranno livelli separati (occhi, bocca, capelli/viso) oppure ulteriori sprite coerenti.

## Obiettivo integrazione Matrix Engine

Matrix dovrebbe inviare soltanto lo stato semantico, per esempio:

```json
{
  "emotion": "shy",
  "intensity": 0.72,
  "speaking": true,
  "gesture": "tilt"
}
```

Il renderer dell'avatar decide come trasformare quello stato in animazione, mantenendo separata la logica cognitiva dalla rappresentazione grafica.
