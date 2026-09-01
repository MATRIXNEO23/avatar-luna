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

## Master grafica approvata
La master grafica ad alta definizione approvata dall'utente il 2026-09-01 è la sheet 1536x1024 con Luna capelli nero/viola, occhi viola e outfit nero/viola, contenente 8 pose full-body e i componenti di rig.

Regola fondamentale: non reinterpretare o rigenerare Luna durante l'estrazione degli asset. Dopo l'approvazione della master, ogni asset deve derivare direttamente dai suoi pixel.

Pipeline concordata:
1. master approvata;
2. estrazione lossless/trasparente;
3. controllo visivo di completezza e bordi;
4. validazione esplicita;
5. solo dopo, asset considerato utilizzabile dal rig.

## Pose full-body — checkpoint validato
Il primo ritaglio manuale a colonne `Luna_Master_Extract_v1` è stato SCARTATO perché alcune pose perdevano parti del corpo e altre includevano pezzi della posa vicina.

Il passaggio successivo `Luna_Poses_v2_corrected` ha ricavato le 8 pose dalla sagoma reale rilevata nella master, con bounding box per componente e margine di sicurezza:
- IDLE;
- TALK;
- BLINK;
- SMILE;
- SHY;
- ANGRY;
- SURPRISED;
- SEXY.

L'utente ha dato OK a questo checkpoint. Questa è quindi la prima fase grafica considerata validata.

## Componenti rig — stato attuale
Un primo pacchetto di componenti era stato estratto in gruppi capelli/occhi/bocche/torso/braccia/gambe.

Il pacchetto `Luna_RigComponents_v3_validated` NON è più da considerare validato: l'utente ha rilevato correttamente zone nere residue che non appartengono al corpo/asset. La precedente validazione automatica era insufficiente.

Correzione in corso: `Luna_Components_v4_transparent`, che rimuove il nero della master trasformandolo in trasparenza e usa feathering solo sui pixel quasi neri per ridurre aloni. Questo passaggio è PENDING: non deve essere promosso a rig finché non viene controllato e approvato visivamente dall'utente.

Regola: un ritaglio rettangolare con sfondo nero, anche se contiene correttamente il componente, NON è un asset rig valido. Lo spazio esterno al componente deve essere alpha trasparente.

## Busto / chest physics
Per la fisica secondaria del torace serve un busto completo e pulito, non soltanto parti isolate. Asset minimo richiesto:
- busto frontale completo con collo, spalle, torace e addome alto;
- zona chest deformabile perfettamente allineata allo stesso busto;
- punti di ancoraggio coerenti con testa, braccia e bacino;
- eventuali varianti solo per pose realmente incompatibili con la base.

Il movimento del torace deve essere ottenuto con deformazione locale/mesh e fisica spring-damping, non spostando due immagini indipendenti.

## Metodo obbligatorio riutilizzabile per TUTTI i personaggi
Questa pipeline non è specifica di Luna. Deve diventare il metodo standard per tutti i personaggi che verranno preparati successivamente.

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
12. ogni errore rilevato invalida il relativo checkpoint e va annotato qui, senza nasconderlo o propagare il difetto.

### Checkpoint standard per personaggio
Usare sempre questa sequenza:
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
- CP10: allineamento layered rig;
- CP11: animazioni/fisica;
- CP12: test mobile/APK.

Dopo OGNI checkpoint approvato bisogna aggiornare questo file (o, quando il sistema verrà generalizzato, il file di continuità del personaggio) indicando: sorgente, metodo, asset prodotti, problemi trovati, correzioni, stato APPROVATO/SCARTATO/PENDING e prossimo passo.

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
1. completare e validare gli asset trasparenti dalla master approvata;
2. verificare allineamento e identità visiva;
3. popolare `assets/rig/` con almeno `hair_back.png`, `body.png`, `chest.png`, `head.png`, `eyes_open.png`, `eyes_closed.png`, `mouth_closed.png`, `mouth_open.png`, `hair_front.png`;
4. verificare che `detectRig()` riporti `layered` e non `pseudo`;
5. solo allora produrre una nuova APK di test.

## Regola di continuità
Aggiornare questo file dopo ogni checkpoint validato e dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API, build Android o architettura. Registrare anche i checkpoint scartati e il motivo, per evitare di ripetere gli stessi errori sugli altri personaggi. Non modificare `main` finché il rig ricostruito non è stato verificato visivamente.
