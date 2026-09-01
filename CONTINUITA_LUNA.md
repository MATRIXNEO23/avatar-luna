# CONTINUITÀ PROGETTO LUNA

Ultimo aggiornamento: 2026-09-01
Repository: `MATRIXNEO23/avatar-luna`
Branch operativa: `main`

## Scopo

`avatar-luna` è un laboratorio separato da Neon Tides / Matrix Engine. Serve a sviluppare e testare l'avatar 2D/2.5D di Luna senza rischiare regressioni nel progetto principale. L'integrazione con Neon/Matrix avverrà solo dopo stabilizzazione di animazione, rig e prestazioni Android.

## Identità visiva canonica

La reference canonica attuale è `luna_08_no_cape.png` nella root del repository.

Priorità assoluta per ogni nuova sprite o asset:
1. fedeltà del volto;
2. fedeltà dei capelli;
3. colori e tratti distintivi;
4. coerenza dell'outfit;
5. espressione e posa;
6. movimento.

Non accettare sprite che cambiano significativamente volto, occhi, forma del viso o capelli di Luna.

## Stato renderer

Versione runtime attuale: v0.3.1.

Funzioni presenti:
- idle continuo;
- respirazione;
- spring physics con inerzia e damping;
- risposta a puntatore/touch;
- gesture `nod`, `tilt`, `bounce`, `step`;
- emozioni `neutral`, `happy`, `shy`, `sad`, `angry`, `flirty`, `provocative`, `focused`;
- fisica secondaria predisposta per testa, capelli e torace;
- API JavaScript `window.LunaAvatar`;
- eventi Matrix via `window.postMessage`;
- rilevamento automatico del rig.

## Modalità rig

Il renderer supporta due modalità:

### Pseudo-layer
Usa copie ritagliate della PNG canonica per simulare movimento secondario indipendente di testa, capelli e torace. È una soluzione temporanea: può generare seams/ghosting se le ampiezze sono troppo alte.

### Layered reale
Si attiva automaticamente quando sono presenti tutti gli asset in `assets/rig/`:
- `hair_back.png`
- `body.png`
- `chest.png`
- `head.png`
- `eyes_open.png`
- `eyes_closed.png`
- `mouth_closed.png`
- `mouth_open.png`
- `hair_front.png`

Tutti i layer devono avere lo stesso canvas e lo stesso allineamento 1:1. Non ritagliare ogni elemento con canvas diverso.

## Blink e lip-sync

Blink e lip-sync reali richiedono il rig layered completo. Con la PNG piatta possono essere solo simulati parzialmente; non considerare il pseudo-rig equivalente al rig finale.

## Fisica desiderata

Il movimento deve essere naturale, non un semplice su/giù. Usare spring/inertia/damping e input legati ad accelerazione/direzione del corpo.

Obiettivi:
- capelli: maggiore ritardo e ampiezza, overshoot controllato;
- testa: movimento più rapido e contenuto;
- torace: movimento secondario più piccolo e smorzato;
- idle: quasi fermo, con respirazione leggera;
- movimenti rapidi: maggiore risposta secondaria, sempre clampata.

Formula di riferimento:

```text
v += (target - x) * stiffness * dt
v *= exp(-damping * dt)
x += v * dt
```

## Prestazioni Android

Non è ancora stato completato un test runtime reale su Android. Non definire la build "Android-tested" finché non viene eseguito un test reale su device/emulatore.

Controlli richiesti:
- FPS e frame pacing;
- CPU e RAM;
- Chrome Android / WebView;
- touch/pointer;
- artefatti del pseudo-rig;
- tuning delle molle;
- fluidità generale.

Ottimizzazioni tecniche già identificate:
- rimuovere `getComputedStyle()` dal loop per-frame e mantenere lo sguardo in stato JS;
- evitare moltiplicazioni CSS come `var(--look-x) * 3px`, calcolando offset pixel in JS;
- normalizzare gli impulsi del puntatore rispetto al tempo;
- supportare `prefers-reduced-motion` anche a livello JS;
- mantenere trasformazioni compositor-friendly (`transform`, `opacity`);
- monitorare il costo GPU delle copie multiple della PNG nel pseudo-rig.

## Asset mobile

Per uno schermo piccolo conviene usare asset ottimizzati, ma senza ridurre inutilmente la qualità. La reference caricata in chat è 768×1536 e circa 195 KB; non è pesante. Prima priorità: ottenere vera trasparenza alpha se lo sfondo a scacchi è incorporato nell'immagine, poi eventualmente produrre una variante mobile.

Quando si ridimensionano i layer, usare lo stesso fattore di scala e mantenere identico canvas/allineamento.

## Sprite sheet

È stata generata una nuova character/sprite sheet ispirata direttamente alla reference canonica, con:
- pose full body;
- espressioni;
- occhi;
- bocche;
- capelli per fisica;
- torso/arti/accessori;
- animazioni;
- lip-sync e blink;
- thumbnail.

La sheet va considerata materiale di sviluppo, non automaticamente approvata come identità finale. Prima di ricavarne asset di produzione, verificare sempre che volto e capelli restino fedeli alla Luna canonica.

## API runtime

Esempi:

```js
LunaAvatar.setState({ emotion: 'happy', intensity: 0.8, physics: 0.65, speaking: false });
LunaAvatar.speak('Ciao.', { emotion: 'happy', intensity: 0.7 });
LunaAvatar.gesture('nod');
LunaAvatar.impulse(8, -5, 0.4);
```

Eventi Matrix:

```js
window.postMessage({ type: 'luna.state', emotion: 'focused', intensity: 0.65, physics: 0.6 }, '*');
window.postMessage({ type: 'luna.speak', text: 'Ho trovato una risposta.', emotion: 'happy' }, '*');
window.postMessage({ type: 'luna.gesture', gesture: 'step' }, '*');
window.postMessage({ type: 'luna.motion', x: 8, y: -4, rotation: 0.3 }, '*');
```

## Prossimi passi consigliati

1. Validare visivamente la nuova sprite sheet contro la reference canonica.
2. Ricavare asset layered reali fedeli a Luna.
3. Correggere le due criticità Android del loop (`getComputedStyle` e aritmetica CSS).
4. Eseguire test Android reale.
5. Misurare FPS/CPU/RAM e artefatti.
6. Tuning finale di spring, hair lag e chest secondary motion.
7. Solo dopo, collegare semanticamente gli stati Matrix al renderer.

## Regola di continuità

Questo file va aggiornato ad ogni modifica rilevante del progetto Luna: nuova versione, cambio architettura, asset canonici, test Android, bug importanti, decisioni sul rig, API o integrazione con Matrix Engine. Deve permettere di riprendere il lavoro senza rileggere l'intera chat.
