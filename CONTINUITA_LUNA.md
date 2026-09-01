# CONTINUITÀ PROGETTO LUNA

Ultimo aggiornamento: 2026-09-01
Repository: `MATRIXNEO23/avatar-luna`
Branch operativa di lavoro: `rig-assets-working`
Branch stabile non toccata: `main`
Branch backup: `rig-recovery-backup-2026-09-01`

## Scopo
`avatar-luna` è il laboratorio separato da Neon Tides / Matrix Engine per sviluppare avatar, grafica, rig e test mobile senza regressioni sul progetto principale.

## Identità visiva e recupero rig
La vecchia `luna_08_no_cape.png` NON va considerata il rig definitivo: è soltanto il fallback storico del prototipo.

Il 2026-09-01 è stata recuperata dall'utente la character sheet corretta di Luna con:
- pose full-body;
- espressioni;
- occhi;
- bocche;
- capelli;
- torso;
- braccia e guanti;
- gambe;
- accessori;
- riferimenti lip-sync/blink.

Questa sheet è la reference per ricostruire gli asset layered reali. Non deve essere usata come singola immagine statica nell'APK. Gli asset dedicati `assets/rig/*.png` non risultavano mai caricati nel repository: la cartella conteneva soltanto il README. Non risultano cancellazioni di PNG layered dalla cronologia Git.

Priorità identità: volto > capelli > colori/tratti > outfit > espressione/posa > movimento.

## Stato attuale — web v0.4.2 in branch di lavoro
La UI v0.4.2 corregge il problema del pannello TEST che copriva Luna sul telefono.

Modifiche:
- pannello TEST ridotto a massimo circa 40-42% dell'altezza su mobile;
- avatar viene ridimensionato/riposizionato automaticamente sopra il pannello aperto;
- conversazione spostata sopra il pannello;
- nuovo pulsante per minimizzare il laboratorio a una sola barra;
- quando il pannello è minimizzato Luna torna quasi a piena altezza;
- il test diagnostico da 15 s minimizza automaticamente il pannello per lasciare Luna visibile durante le gesture;
- layout desktop mantiene pannello laterale senza coprire il personaggio;
- runtime aggiornato a `window.LunaAvatar.version = '0.4.2'`.

Commit della correzione UI sulla branch `rig-assets-working`:
- index: `6414be31c5a56678f16286099466a62e472bb79b`;
- CSS: `1f238394863320890a0cf5775f78022e55b3ddb9`;
- JS: `ee439a3ec209f6f7afe514dd1739ebd7007e7ea7`.

## Android wrapper esistente
È presente un wrapper Android in `android/`:
- applicationId `com.matrixneo.lunaavatartest`;
- minSdk 26, target/compileSdk 35;
- WebView hardware-accelerated;
- JavaScript e DOM storage abilitati;
- carica localmente `file:///android_asset/index.html?android=1`;
- nessuna dipendenza da Matrix Engine / Neon Tides.

Gli asset web vengono sincronizzati automaticamente dalla root durante la build.

## Build APK precedente
Workflow: `.github/workflows/luna-android-apk.yml`.
La precedente build v0.4.1 compilava correttamente, ma sul telefono mostrava il fallback statico perché gli asset layered veri non esistevano nel repository. Non usare quella build come validazione del rig.

## Renderer e diagnostica
Runtime branch di lavoro: `0.4.2`.
Supportati dal codice: idle, respirazione, spring/inertia/damping, touch/pointer, gesture, emozioni, fisica testa/capelli/torace, speaking, pseudo-rig/layered rig, API Matrix e diagnostica.

Benchmark `Test Android #1` misura FPS medio, frame time medio, p95, jank >33 ms, viewport/DPR, rig, reduced-motion, user-agent e memoria JS se disponibile.

## Stato rig reale
DA FARE prima di una nuova build APK di validazione:
1. ricavare dalla character sheet gli asset layered reali e trasparenti;
2. verificare allineamento e identità visiva;
3. popolare `assets/rig/` con almeno `hair_back.png`, `body.png`, `chest.png`, `head.png`, `eyes_open.png`, `eyes_closed.png`, `mouth_closed.png`, `mouth_open.png`, `hair_front.png`;
4. verificare che `detectRig()` riporti `layered` e non `pseudo`;
5. solo allora produrre una nuova APK di test.

## Regola di continuità
Aggiornare questo file dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API, build Android o architettura. Non modificare `main` finché il rig ricostruito non è stato verificato visivamente.
