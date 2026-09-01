# CONTINUITÀ PROGETTO LUNA

Ultimo aggiornamento: 2026-09-01
Repository: `MATRIXNEO23/avatar-luna`
Branch operativa: `main`

## Scopo
`avatar-luna` è il laboratorio separato da Neon Tides / Matrix Engine per sviluppare avatar, grafica, rig e test mobile senza regressioni sul progetto principale.

## Identità visiva canonica
Reference: `luna_08_no_cape.png`.
Priorità: volto > capelli > colori/tratti > outfit > espressione/posa > movimento.

## Stato attuale — web v0.4.1 + Android Test APK
La web UI v0.4.1 include Presentazione, Laboratorio TEST, frase manuale, gesture, fisica e benchmark Android #1 da 15 s.

È stato aggiunto un wrapper Android reale in `android/`:
- applicationId `com.matrixneo.lunaavatartest`;
- nome app `Luna Avatar Test`;
- minSdk 26, target/compileSdk 35;
- WebView hardware-accelerated;
- JavaScript e DOM storage abilitati;
- carica localmente `file:///android_asset/index.html?android=1`;
- nessuna dipendenza da Matrix Engine / Neon Tides;
- il tasto Indietro chiude prima il pannello TEST e poi l'app.

Gli asset web vengono sincronizzati automaticamente dalla root durante la build, quindi non vengono mantenute copie manuali divergenti.

## Build APK
Workflow: `.github/workflows/luna-android-apk.yml`.
Build con Java 17, Gradle 8.7, Android Gradle Plugin 8.5.2.

Prima build GitHub Actions completata con successo il 2026-09-01:
- run `33492524785`;
- step `Build debug APK`: SUCCESS;
- upload artifact: SUCCESS;
- artifact `Luna-Avatar-Test-v0.4.1`;
- artifact id `9794364804`;
- dimensione artifact circa 1.41 MB;
- APK debug firmato/installabile: `Luna-Avatar-Test-v0.4.1.apk`.

Il wrapper Android è stato aggiunto con i commit principali:
- settings: `3a02c232c433f6529dd4dd7f1edb5e0687a85c43`;
- root Gradle: `5b59c946d6d774c638109e3c622b927f7e1c86c8`;
- app Gradle: `aa781eec443884e7b4ec2fa085653887db468838`;
- manifest: `675fac56c33ad65010091112109f1dced3afb2ab`;
- MainActivity: `7021a252a0e5ade4cb24780b6510877e78fd7964`;
- theme: `475d3e289d420bf08510961487b5354403807de6`;
- workflow APK: `8f32c0223bc44f5f16f6fe0b6f6821a0a4fac58a`.

## Renderer e diagnostica
Runtime web: `window.LunaAvatar.version = '0.4.1'`.
Supportati: idle, respirazione, spring/inertia/damping, touch/pointer, gesture, emozioni, fisica testa/capelli/torace, speaking, pseudo-rig/layered rig, API Matrix e diagnostica.

Benchmark `Test Android #1` misura:
- FPS medio;
- frame time medio;
- p95 frame time;
- jank >33 ms;
- viewport e DPR;
- rig e reduced-motion;
- user-agent;
- memoria JS se disponibile.

Pseudo-layer: usa copie ritagliate della PNG canonica e può produrre seams/ghosting. Blink e lip-sync reali richiedono il rig layered completo con gli asset in `assets/rig/`.

## Compatibilità Android/WebView
Completato:
- rimozione `getComputedStyle()` per-frame;
- gaze in JS;
- pointer normalizzato nel tempo;
- reduced-motion JS;
- eliminazione aritmetica CSS problematica `var(...) * px`;
- fallback `MediaQueryList.addListener`;
- reset pointer su `pointerup`, `pointercancel`, `pointerleave`;
- trasformazioni compositor-friendly.

Da misurare sul device reale: costo GPU pseudo-layer, FPS, frame pacing, touch, seams, layout, spring tuning e consumo RAM/CPU del processo Android.

## Test Android reale
L'APK è stato compilato e verificato come pacchetto Android firmato debug, ma NON è ancora stato eseguito fisicamente sul telefono. Non definirlo ancora `Android-tested`.

Procedura:
1. installare `Luna-Avatar-Test-v0.4.1.apk`;
2. aprire `Luna Avatar Test`;
3. verificare che Luna e la UI compaiano senza schermo bianco;
4. aprire `TEST`;
5. eseguire `Test Android #1` per 15 s;
6. copiare il report JSON;
7. fornire anche screenshot e descrizione di eventuali artefatti/scatti.

## Prossimi passi
1. Installazione e Test Android #1 sul device reale.
2. Correzione immediata di eventuali crash/schermo bianco/layout.
3. Analisi FPS/jank e tuning grafico/fisico.
4. Asset layered reali per occhi e bocca.
5. Solo dopo stabilizzazione, integrazione semantica con Matrix Engine.

## Regola di continuità
Aggiornare questo file dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API, build Android o architettura.
