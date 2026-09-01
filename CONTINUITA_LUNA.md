# CONTINUITÀ PROGETTO LUNA

Ultimo aggiornamento: 2026-09-01
Repository: `MATRIXNEO23/avatar-luna`
Branch operativa: `main`

## Scopo
`avatar-luna` è il laboratorio separato da Neon Tides / Matrix Engine per sviluppare avatar, grafica, rig e test mobile senza regressioni sul progetto principale.

## Identità visiva canonica
Reference: `luna_08_no_cape.png`.
Priorità: volto > capelli > colori/tratti > outfit > espressione/posa > movimento. Non accettare sprite che alterano significativamente l'identità di Luna.

## Stato attuale — v0.4.0
La v0.4 introduce la prima veste grafica orientata al prodotto e mantiene separati presentazione e laboratorio.

### Modalità Presentazione
- Luna è il fulcro dello schermo;
- top bar minimale con nome, presenza e stato;
- sfondo scuro viola con illuminazione ambientale discreta;
- speech bubble inferiore pulita;
- unico comando tecnico visibile: `TEST`;
- interfaccia progettata mobile-first.

### Modalità Test
Il pulsante `TEST` apre un pannello sovrapposto con:
- emozione;
- intensità con valore percentuale;
- fisica con valore percentuale;
- textarea `Fai parlare Luna`;
- `Parla` e `Stop`;
- gesture Annuisci, Inclina, Rimbalzo, Passo;
- speaking continuo;
- stato del rig.
Il pulsante × torna alla modalità Presentazione.

API aggiunta: `LunaAvatar.setUiMode('presentation'|'test')`.
Runtime: `window.LunaAvatar.version = '0.4.0'`.

Commit v0.4 UI: `0c75a1f4064e9dd36eca4a5a88918739c34b44a3`.
Commit v0.4 CSS: `d898d04ee1e19c0d7b79493bf450cee72a5a7b10`.
Commit v0.4 runtime: `d91691845201e22e0de5590da14695ad156a34a0`.

## Renderer e rig
Funzioni: idle, respirazione, spring/inertia/damping, puntatore/touch, gesture, emozioni, fisica secondaria testa/capelli/torace, API `window.LunaAvatar`, eventi Matrix e rilevamento automatico rig.

Pseudo-layer: usa copie ritagliate della PNG canonica; può creare seams/ghosting.

Layered reale richiede tutti gli asset in `assets/rig/`: `hair_back.png`, `body.png`, `chest.png`, `head.png`, `eyes_open.png`, `eyes_closed.png`, `mouth_closed.png`, `mouth_open.png`, `hair_front.png`. Tutti devono avere canvas e allineamento 1:1 identici.

Blink e lip-sync reali richiedono il rig layered. Nel pseudo-rig il flusso testo → speaking è testabile, ma non la vera apertura della bocca.

## Fisica
Movimento naturale basato su spring/inertia/damping. Capelli con ritardo/overshoot controllato; testa rapida e contenuta; torace secondario più piccolo; idle leggero; maggiore risposta ai movimenti rapidi con clamp.

## Android
Nessun test runtime Android reale ancora completato. Non definire la build Android-tested.
Da verificare nel Test Android #1: FPS/frame pacing, CPU/RAM, Chrome/WebView, touch, layout v0.4, pannello test, pseudo-rig, seams, speaking, fluidità e spring tuning.

Ottimizzazioni già fatte: rimosso `getComputedStyle()` per-frame, gaze in JS, pointer normalizzato nel tempo, reduced-motion JS, transform/opacity compositor-friendly.
Da fare: eliminare moltiplicazioni CSS con custom properties (`var(...)*px`), misurare costo GPU pseudo-layer.

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
```

## Prossimi passi
1. Valutazione visiva v0.4 su telefono.
2. Rifinitura grafica in base al primo screenshot/test.
3. Asset layered reali, soprattutto occhi e bocca.
4. Test Android #1 reale.
5. Diagnostica FPS/CPU/RAM e tuning fisica.
6. Solo dopo stabilizzazione, integrazione semantica con Matrix Engine.

## Regola di continuità
Aggiornare questo file dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API o architettura. Deve permettere di riprendere il lavoro senza rileggere la chat.
