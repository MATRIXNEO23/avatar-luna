# CONTINUITÀ PROGETTO LUNA

Ultimo aggiornamento: 2026-09-01
Repository: `MATRIXNEO23/avatar-luna`
Branch operativa: `main`

## Scopo
`avatar-luna` è il laboratorio separato da Neon Tides / Matrix Engine per sviluppare avatar, grafica, rig e test mobile senza regressioni sul progetto principale.

## Identità visiva canonica
Reference: `luna_08_no_cape.png`.
Priorità: volto > capelli > colori/tratti > outfit > espressione/posa > movimento. Non accettare sprite che alterano significativamente l'identità di Luna.

## Stato attuale — v0.4.1
La v0.4 introduce la prima veste grafica orientata al prodotto e mantiene separati presentazione e laboratorio. La v0.4.1 prepara il Test Android #1.

### Modalità Presentazione
- Luna è il fulcro dello schermo;
- top bar minimale con nome, presenza e stato;
- sfondo scuro viola con illuminazione ambientale discreta;
- speech bubble inferiore pulita;
- unico comando tecnico visibile: `TEST`;
- interfaccia mobile-first.

### Modalità Test
Il pulsante `TEST` apre un pannello sovrapposto con emozione, intensità, fisica, frase manuale, Parla/Stop, gesture, speaking continuo e stato del rig.

Aggiunta sezione `Test Android #1`:
- pulsante `Avvia 15 s`;
- misura frame pacing tramite `requestAnimationFrame`;
- calcola FPS medio, frame time medio, p95 frame time, jank >33 ms e percentuale jank;
- registra viewport, DPR, rig, reduced-motion e user-agent;
- registra memoria JS quando `performance.memory` è disponibile;
- durante il test esegue una sequenza leggera di gesture per caricare il renderer;
- mostra report JSON copiabile;
- API `LunaAvatar.runDiagnostics()` e `LunaAvatar.getDiagnosticsReport()`;
- query `?diag=1` apre direttamente il laboratorio.

Runtime: `window.LunaAvatar.version = '0.4.1'`.

Commit diagnostica UI: `848a29122ae2727342bff93793b8e09bd72bbd0a`.
Commit runtime v0.4.1: `042691e1831b5acb28feee017d9373e9b315a1c1`.
Commit compatibilità CSS: `3004f637222671ddd73407ed74e1a906d048a1bc`.

## Compatibilità Android/WebView
Eliminata l'aritmetica CSS problematica con custom properties, tra cui `var(...) * px` e moltiplicazioni delle variabili capelli. Gli offset typed vengono ora calcolati in JavaScript e inviati al CSS già in `px`/`deg`.

Nuove variabili principali: `--wrap-x`, `--wrap-y`, `--hair-left-x`, `--hair-left-r`, `--hair-right-x`, `--hair-right-r`, `--aura-opacity`.

Aggiunto fallback `MediaQueryList.addListener` per WebView meno recenti e reset dello stato puntatore su `pointerup`, `pointercancel`, `pointerleave`.

## Renderer e rig
Funzioni: idle, respirazione, spring/inertia/damping, puntatore/touch, gesture, emozioni, fisica secondaria testa/capelli/torace, API `window.LunaAvatar`, eventi Matrix e rilevamento automatico rig.

Pseudo-layer: usa copie ritagliate della PNG canonica; può creare seams/ghosting.

Layered reale richiede tutti gli asset in `assets/rig/`: `hair_back.png`, `body.png`, `chest.png`, `head.png`, `eyes_open.png`, `eyes_closed.png`, `mouth_closed.png`, `mouth_open.png`, `hair_front.png`. Tutti devono avere canvas e allineamento 1:1 identici.

Blink e lip-sync reali richiedono il rig layered. Nel pseudo-rig il flusso testo → speaking è testabile, ma non la vera apertura della bocca.

## Android
Il test runtime Android reale NON è ancora stato eseguito, ma la pagina è ora pronta per il Test Android #1.

Procedura prevista sul telefono:
1. aprire la pagina dell'avatar;
2. premere `TEST` oppure usare `?diag=1`;
3. premere `Avvia 15 s`;
4. non cambiare app per 15 secondi;
5. copiare il report JSON;
6. annotare anche eventuali problemi visivi: seams, scatti, proporzioni, touch, bubble/pannello.

Il benchmark browser misura fluidità/rendering. CPU e RAM native dell'app/processo Android richiedono strumenti Android esterni o diagnostica host; la memoria JS viene riportata solo se esposta dal browser.

## Ottimizzazioni completate
- [x] rimosso `getComputedStyle()` dal loop per-frame;
- [x] gaze in stato JS;
- [x] pointer normalizzato nel tempo;
- [x] reduced-motion JS;
- [x] trasformazioni compositor-friendly;
- [x] eliminate moltiplicazioni CSS con custom properties;
- [x] fallback listener per reduced-motion;
- [x] reset pointer su fine/cancellazione contatto;
- [ ] misurare costo GPU delle copie multiple della PNG nel pseudo-rig sul device reale.

## Asset mobile
La reference 768×1536 (~195 KB nella copia caricata in chat) è già leggera. Priorità alla vera trasparenza alpha e alla fedeltà visiva prima di comprimere ulteriormente. La sprite sheet generata è materiale di sviluppo, non identità automaticamente approvata.

## API essenziale
```js
LunaAvatar.setUiMode('test');
LunaAvatar.setState({emotion:'happy',intensity:.8,physics:.65});
LunaAvatar.speak('Ciao.',{emotion:'happy'});
LunaAvatar.stopSpeaking();
LunaAvatar.gesture('nod');
LunaAvatar.impulse(8,-5,.4);
await LunaAvatar.runDiagnostics();
LunaAvatar.getDiagnosticsReport();
```

## Prossimi passi
1. Eseguire Test Android #1 reale sul telefono.
2. Analizzare report FPS/frame pacing e problemi visivi.
3. Rifinire layout/proporzioni sulla base dello screenshot reale.
4. Asset layered reali, soprattutto occhi e bocca.
5. Tuning spring/hair/chest e valutazione costo GPU pseudo-rig.
6. Solo dopo stabilizzazione, integrazione semantica con Matrix Engine.

## Regola di continuità
Aggiornare questo file dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API o architettura. Deve permettere di riprendere il lavoro senza rileggere la chat.
