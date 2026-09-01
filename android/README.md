# Luna Avatar Test — Android

Questa cartella contiene il wrapper Android minimale per il renderer web di Luna.

## Scopo
- test reale su Android/WebView;
- touch e gesture;
- fluidità e frame pacing;
- diagnostica v0.4.1;
- nessuna dipendenza da Matrix Engine / Neon Tides.

## Build
Il workflow GitHub Actions `Luna Avatar Android APK` esegue una build debug installabile e pubblica l'artifact:

`Luna-Avatar-Test-v0.4.1.apk`

Il modulo Android incorpora automaticamente dalla root del repository:
- `index.html`
- `styles.css`
- `app.js`
- `luna_08_no_cape.png`
- `assets/**`

La schermata iniziale carica `file:///android_asset/index.html?android=1` in una WebView hardware-accelerated.

Il tasto Indietro Android chiude prima il pannello TEST; un secondo Indietro esce dall'app.
