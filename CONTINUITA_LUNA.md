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

## Tentativi componenti separati — SCARTATI/PENDING
`Luna_RigComponents_v3_validated` è SCARTATO: l'utente ha rilevato zone nere residue estranee all'asset. La precedente validazione automatica era insufficiente.

`Luna_Components_v4_transparent` non viene promosso a rig: il controllo successivo ha mostrato che una semplice rimozione del nero su ritagli rettangolari può lasciare frammenti di elementi vicini o produrre bordi non affidabili. Stato: SCARTATO come base del rig finale.

Regola permanente: un ritaglio con sfondo nero o con parti estranee, anche minime, NON è un asset rig valido. Checkerboard obbligatorio per il QC.

## Decisione architetturale rig
Non si sta usando Live2D Cubism. Per Luna si completa un **custom master-sprite rig 2D** leggero, adatto a WebView/Android e senza dipendenze Live2D.

Motivazione: usare direttamente le pose CP1 già approvate evita di ricostruire Luna da componenti separati difettosi e preserva meglio identità e qualità grafica. Le deformazioni secondarie vengono applicate a regioni duplicate/ritagliate della stessa posa approvata.

### Custom rig v0.5.0 — PENDING VALIDAZIONE VISIVA/MOBILE
Preparato localmente il pacchetto `Luna_CustomRig_v0.5.0`.

Sorgente: esclusivamente `Luna_Poses_v2_corrected` già approvato.

Asset preparati:
- 8 pose su canvas comune trasparente 240x500;
- formato WebP lossless RGBA;
- nessun ridimensionamento delle pose;
- allineamento center/bottom su canvas comune;
- verifica automatica: i pixel visibili originali risultano lossless dopo codifica/decodifica WebP;
- nessun pixel non trasparente tocca il bordo del canvas.

Pose: `idle`, `talk`, `blink`, `smile`, `shy`, `angry`, `surprised`, `sexy`.

Runtime v0.5.0 preparato localmente:
- rimosso concettualmente il vecchio fallback `luna_08_no_cape.png` dal nuovo rig;
- mapping emozione -> posa;
- selezione manuale posa nel laboratorio;
- head motion con regione duplicata della posa attiva;
- hair inertia sinistra/destra con regioni duplicate della posa attiva;
- chest physics con regione torso/chest della stessa posa, spring-damping e respirazione;
- blink sperimentale usando la posa BLINK approvata come patch facciale;
- mouth/speaking sperimentale usando la posa TALK approvata come patch facciale;
- gesture, touch/pointer, spring/inertia e API Matrix mantenute;
- diagnostica aggiornata a `Android #2 master-rig` e runtime `0.5.0`.

Importante: questo checkpoint NON è ancora APPROVATO. Prima di promuoverlo occorre controllare visivamente sul telefono soprattutto:
- eventuali seam/ghosting delle regioni testa, capelli e chest;
- allineamento patch blink/talk;
- naturalezza chest physics;
- cambi posa;
- FPS/jank.

Il pacchetto locale non è ancora stato caricato integralmente nel repository perché gli asset binari della master rig non sono ancora stati trasferiti sulla branch. Non lasciare la branch in uno stato che referenzia asset mancanti.

## Busto / chest physics
Nel custom rig il busto non viene ricostruito da un ritaglio separato contaminato. La zona chest viene derivata dalla stessa posa full-body approvata e resta geometricamente allineata alla base.

Principio:
- base full-body sempre presente;
- overlay regionale chest con bordi sfumati;
- trasformazione minima locale;
- spring-damping e ritardo rispetto all'accelerazione del corpo;
- movimento quasi nullo in quiete, respirazione leggera, maggiore inerzia solo durante movimenti/gesture.

Se questa soluzione mostra seam visibili sul telefono, CP6 verrà riaperto e si passerà a un busto/mesh dedicato pulito. Non mascherare il difetto.

## Metodo obbligatorio riutilizzabile per TUTTI i personaggi
Questa pipeline non è specifica di Luna. Deve diventare il metodo standard per tutti i personaggi preparati successivamente.

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
12. ogni errore rilevato invalida il relativo checkpoint e va annotato qui, senza nasconderlo o propagare il difetto;
13. quando un custom master-sprite rig è sufficiente, preferire deformazioni regionali della posa canonica a componenti separati di qualità inferiore;
14. passare a layer/mesh dedicati solo quando il vantaggio visivo è verificato e gli asset sono realmente puliti.

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
- applicationId `com.matrixneo.lunaavatartest`;
- minSdk 26, target/compileSdk 35;
- WebView hardware-accelerated;
- JavaScript e DOM storage abilitati;
- carica localmente `file:///android_asset/index.html?android=1`;
- nessuna dipendenza da Matrix Engine / Neon Tides.

Gli asset web vengono sincronizzati automaticamente dalla root durante la build.

## Build APK precedente
Workflow: `.github/workflows/luna-android-apk.yml`.
La precedente build v0.4.1 compilava correttamente, ma mostrava il fallback statico perché mancavano gli asset reali. Non usarla come validazione del rig.

## Prossimo checkpoint operativo
1. trasferire sulla branch di lavoro gli 8 asset binari del custom master rig senza alterarne i pixel visibili;
2. sostituire nel runtime branch il vecchio fallback con v0.5.0 soltanto quando gli asset sono presenti;
3. verificare `detectRig()` -> `master` con 8/8 pose;
4. aggiornare workflow/nome APK a v0.5.0;
5. build APK dalla branch di lavoro o branch test dedicata;
6. test Android #2 reale;
7. registrare risultati CP3-CP6/CP10-CP12 e correggere eventuali seam prima del merge in `main`.

## Regola di continuità
Aggiornare questo file dopo ogni checkpoint validato e dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API, build Android o architettura. Registrare anche checkpoint scartati e motivo. Non modificare `main` finché il rig non è verificato visivamente sul telefono.