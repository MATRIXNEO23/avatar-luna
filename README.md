# Luna Virtual Assistant

Prototipo separato di avatar 2D leggero per Matrix Engine.

## Stato attuale: v0.3

La base `luna_08_no_cape.png` resta il riferimento canonico. Il renderer funziona già in fallback con una singola PNG e passa automaticamente al rig a livelli quando trova tutti gli asset in `assets/rig/`.

## Funzioni

- idle continuo e respirazione
- spring physics con inerzia e smorzamento
- risposta a puntatore/touch
- gesture: `nod`, `tilt`, `bounce`, `step`
- emozioni: `neutral`, `happy`, `shy`, `sad`, `angry`, `flirty`, `provocative`, `focused`
- fisica indipendente predisposta per testa, capelli e torace
- blink irregolare con livelli occhi
- lip-sync leggero aperto/chiuso durante `speaking`
- fallback automatico alla PNG singola se i livelli non sono completi
- API JavaScript e `window.postMessage` per Matrix Engine

## Rig richiesto

Vedi `assets/rig/README.md`. Servono PNG trasparenti allineati sullo stesso canvas: capelli dietro, corpo, torace, testa, occhi aperti/chiusi, bocca chiusa/aperta e capelli davanti.

## API

```js
LunaAvatar.setState({ emotion: 'happy', intensity: 0.8, physics: 0.65, speaking: false });
LunaAvatar.speak('Ciao.', { emotion: 'happy', intensity: 0.7 });
LunaAvatar.gesture('nod');
LunaAvatar.impulse(8, -5, 0.4);
```

### Eventi Matrix

```js
window.postMessage({ type: 'luna.state', emotion: 'focused', intensity: 0.65, physics: 0.6 }, '*');
window.postMessage({ type: 'luna.speak', text: 'Ho trovato una risposta.', emotion: 'happy' }, '*');
window.postMessage({ type: 'luna.gesture', gesture: 'step' }, '*');
window.postMessage({ type: 'luna.motion', x: 8, y: -4, rotation: 0.3 }, '*');
```

## Nota

Con la sola immagine base il movimento interessa necessariamente l'intero sprite. Blink, bocca, capelli e fisica regionale diventano realmente indipendenti solo quando sono presenti i livelli PNG separati; il codice v0.3 è già predisposto per attivarli automaticamente.
