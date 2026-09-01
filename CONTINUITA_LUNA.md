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

Questa sheet è la reference per ricostruire gli asset reali. Gli asset dedicati `assets/rig/*.png` non risultavano mai caricati nel repository: la cartella conteneva soltanto il README. Non risultano cancellazioni di PNG layered dalla cronologia Git.

Priorità identità: volto > capelli > colori/tratti > outfit > espressione/posa > movimento.

## Master grafica approvata — CP0 APPROVATO
La master grafica approvata dall'utente il 2026-09-01 è la sheet 1536x1024 con Luna capelli nero/viola, occhi viola e outfit nero/viola, contenente 8 pose full-body e componenti di riferimento.

Regola fondamentale: non reinterpretare o rigenerare Luna durante l'estrazione degli asset. Dopo l'approvazione della master, ogni asset deve derivare direttamente dai suoi pixel.

Pipeline concordata:
1. master approvata;
2. estrazione lossless/trasparente;
3. controllo visivo di completezza e bordi;
4. validazione esplicita;
5. solo dopo, asset considerato utilizzabile dal rig.

## Pose full-body — CP1 APPROVATO
Il primo ritaglio manuale a colonne `Luna_Master_Extract_v1` è stato SCARTATO perché alcune pose perdevano parti del corpo e altre includevano pezzi della posa vicina.

Il passaggio `Luna_Poses_v2_corrected` ha ricavato le 8 pose dalla sagoma reale rilevata nella master, con bounding box per componente e margine di sicurezza:
- IDLE;
- TALK;
- BLINK;
- SMILE;
- SHY;
- ANGRY;
- SURPRISED;
- SEXY.

L'utente ha dato OK a questo checkpoint. Questa è la prima fase grafica considerata validata.

## Tentativi componenti separati — SCARTATI
`Luna_RigComponents_v3_validated` è SCARTATO: l'utente ha rilevato zone nere residue estranee all'asset. La precedente validazione automatica era insufficiente.

`Luna_Components_v4_transparent` è SCARTATO come base del rig finale: una semplice rimozione del nero da ritagli rettangolari può lasciare frammenti di elementi vicini o produrre bordi non affidabili.

Regola permanente: un ritaglio con sfondo nero o con parti estranee, anche minime, NON è un asset rig valido. Checkerboard obbligatorio per il QC.

## Decisione architetturale rig
Non si sta usando Live2D Cubism. Per Luna si completa un custom 2D leggero per WebView/Android e senza dipendenze Live2D.

Le 8 pose CP1 approvate sono la sorgente canonica del renderer. Non usare componenti separati contaminati per ricostruire la figura.

### Custom rig v0.5.0 — SCARTATO DOPO TEST MOBILE
Il pacchetto `Luna_CustomRig_v0.5.0` usava duplicati della posa full-body ritagliati via CSS per simulare movimento indipendente di testa, capelli e chest.

Risultato del test reale dell'utente sul telefono:
- immagini/layer visibilmente sfasati;
- parti duplicate percepite come ghosting;
- movimento complessivo non percepito correttamente.

Conclusione: la tecnica di spostare copie ritagliate dell'intera posa NON è accettabile. v0.5.0 è SCARTATO e non deve essere riproposto sugli altri personaggi.

### Custom rig v0.5.1 — PENDING TEST MOBILE
Correzione preparata dopo il test v0.5.0:
- un solo sprite full-body approvato visibile alla volta;
- rimozione completa dei duplicati regionali di testa/capelli/chest;
- tutte le 8 pose restano su canvas comune 240x500 e WebP lossless;
- movimento idle continuo applicato all'intera figura;
- respirazione applicata all'intera figura;
- risposta touch/pointer con spring/inertia;
- gesture `nod`, `tilt`, `bounce`, `step` rese più visibili;
- mapping emozione -> posa;
- TALK e BLINK usati come stati full-body approvati, non come patch sovrapposte;
- diagnostica aggiornata ad `Android #3 stable-rig`;
- runtime `0.5.1`.

APK locale di test preparato: `Luna-Avatar-Test-v0.5.1.apk`.
Per consentire aggiornamento diretto dalla build compat v0.5.0 mantiene package `com.matrixneo.lunaavatarv050`, usa `versionCode 3` ed è firmato con la stessa chiave test della v0.5.0 compat.

Stato: PENDING test reale utente. Non promuovere a APPROVATO prima della verifica su telefono.

## Busto / chest physics
Il test v0.5.0 ha dimostrato che simulare un busto indipendente duplicando e muovendo una porzione della posa produce disallineamenti/ghosting.

Quindi in v0.5.1 la finta chest physics separata è DISABILITATA. È consentita solo respirazione/deformazione globale molto leggera sull'intera figura.

Per una vera fisica secondaria indipendente del torace servirà uno di questi due percorsi, da affrontare dopo che il renderer base è stabile:
- busto/chest realmente separato e perfettamente allineato alla base, con alpha pulito;
- mesh/deformer dedicato costruito su asset adatto.

Non fingere mai fisica locale tramite copie sfasate della posa full-body.

## Metodo obbligatorio riutilizzabile per TUTTI i personaggi
Questa pipeline deve diventare il metodo standard per tutti i personaggi preparati successivamente.

Per ogni personaggio:
1. scegliere e approvare una master canonica;
2. non alterare identità, volto, capelli, proporzioni, colori o outfit durante l'estrazione;
3. se serve più definizione, migliorare/upscalare la master prima del ritaglio e validare la nuova master;
4. ritagliare le pose dalla sagoma reale, mai da colonne stimate;
5. verificare sempre testa/capelli, entrambe le mani, entrambe le gambe e piedi, outfit e accessori;
6. rimuovere completamente lo sfondo con alpha trasparente senza cancellare capelli/vestiti scuri;
7. verificare su checkerboard chiaro/scuro per individuare zone nere e aloni;
8. validare ogni gruppo prima di procedere al successivo;
9. non costruire layer successivi sopra asset non validati;
10. conservare coordinate, dimensioni, sorgente e stato di validazione in un manifest;
11. solo gli asset validati possono entrare nel rig e nella build Android;
12. ogni errore rilevato invalida il relativo checkpoint e va annotato qui;
13. non usare copie ritagliate della posa full-body come falsi layer indipendenti: il test Luna v0.5.0 ha mostrato ghosting e sfasamento;
14. finché mancano layer realmente puliti, preferire un singolo sprite canonico con movimento globale e stati/pose;
15. introdurre mesh/layer indipendenti solo quando gli asset sono realmente separati, allineati e verificati.

### Checkpoint standard per personaggio
- CP0: master canonica approvata;
- CP1: pose full-body complete e trasparenti;
- CP2: volto/testa/espressioni;
- CP3: occhi + blink;
- CP4: bocche + lip-sync;
- CP5: capelli fisici;
- CP6: busto/chest;
- CP7: braccia/mani/guanti;
- CP8: gambe/piedi;
- CP9: accessori/outfit;
- CP10: allineamento rig;
- CP11: animazioni/fisica;
- CP12: test mobile/APK.

Dopo OGNI checkpoint approvato bisogna aggiornare questo file indicando: sorgente, metodo, asset prodotti, problemi trovati, correzioni, stato APPROVATO/SCARTATO/PENDING e prossimo passo.

## Stato web precedente — v0.4.2
La UI v0.4.2 corregge il pannello TEST che copriva Luna sul telefono:
- pannello TEST massimo circa 40-42% altezza su mobile;
- avatar ridimensionato/riposizionato sopra il pannello;
- possibilità di minimizzare il laboratorio;
- test diagnostico minimizza automaticamente il pannello;
- desktop con pannello laterale.

Commit v0.4.2 sulla branch `rig-assets-working`:
- index: `6414be31c5a56678f16286099466a62e472bb79b`;
- CSS: `1f238394863320890a0cf5775f78022e55b3ddb9`;
- JS: `ee439a3ec209f6f7afe514dd1739ebd7007e7ea7`.

## Android wrapper esistente
È presente un wrapper Android in `android/`:
- applicationId storico `com.matrixneo.lunaavatartest`;
- minSdk 26, target/compileSdk 35 nel progetto Gradle;
- WebView hardware-accelerated;
- JavaScript e DOM storage abilitati;
- carica localmente `file:///android_asset/index.html?android=1`;
- nessuna dipendenza da Matrix Engine / Neon Tides.

La build compat locale v0.5.x usa temporaneamente package separato `com.matrixneo.lunaavatarv050` per evitare conflitti con la vecchia installazione. È una soluzione di test, non la configurazione Android definitiva.

## Build APK
Workflow repository: `.github/workflows/luna-android-apk.yml`.
La vecchia build v0.4.1 compilava correttamente ma mostrava il fallback statico. Non usarla come validazione del rig.

La prima APK v0.5.0 ricostruita manualmente era non installabile ed è SCARTATA. La build compat successiva ha corretto il packaging per il test locale.

## Prossimo checkpoint operativo
1. testare `Luna-Avatar-Test-v0.5.1.apk` sul telefono;
2. verificare che non esista più sfasamento/ghosting;
3. verificare movimento idle, touch e 4 gesture;
4. verificare cambi posa e stati TALK/BLINK;
5. eseguire `Android #3 stable-rig` e salvare FPS/jank;
6. se il renderer base è stabile, decidere CP5/CP6: veri layer capelli/chest o mesh dedicata;
7. solo dopo un test positivo, trasferire runtime e binari nella branch e produrre build Gradle con firma Android v2/v3;
8. non modificare `main` prima della validazione mobile.

## Regola di continuità
Aggiornare questo file dopo ogni checkpoint validato e dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API, build Android o architettura. Registrare anche checkpoint scartati e motivo. Non modificare `main` finché il rig non è verificato visivamente sul telefono.