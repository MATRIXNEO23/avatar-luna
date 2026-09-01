# CONTINUITÀ PROGETTO LUNA

Ultimo aggiornamento: 2026-09-01
Repository: `MATRIXNEO23/avatar-luna`
Branch operativa: `rig-assets-working`
Branch stabile non toccata: `main`
Branch backup: `rig-recovery-backup-2026-09-01`

## Scopo
Laboratorio separato da Neon Tides / Matrix Engine per sviluppare avatar, grafica, rig e test Android senza regressioni sul progetto principale.

## Identità visiva
La vecchia `luna_08_no_cape.png` è soltanto fallback storico e NON è la sorgente canonica.

Master canonica approvata il 2026-09-01: character sheet 1536x1024 con Luna capelli nero/viola, occhi viola, outfit nero/viola, 8 pose full-body e componenti di riferimento.

Priorità identità: volto > capelli > colori/tratti > outfit > espressione/posa > movimento.

Regola: dopo approvazione della master, nessuna reinterpretazione o rigenerazione. Gli asset devono derivare dai pixel della master approvata.

## Checkpoint grafici
### CP0 — MASTER CANONICA — APPROVATO
Master 1536x1024 approvata dall'utente.

### CP1 — POSE FULL-BODY — APPROVATO
`Luna_Master_Extract_v1` SCARTATO: ritaglio manuale a colonne, con parti mancanti e contaminazioni da pose vicine.

`Luna_Poses_v2_corrected` APPROVATO: 8 pose ricavate dalla sagoma reale con bounding box per componente e margine di sicurezza:
- IDLE
- TALK
- BLINK
- SMILE
- SHY
- ANGRY
- SURPRISED
- SEXY

Le 8 pose CP1 sono la sorgente canonica del renderer attuale.

## Componenti separati
`Luna_RigComponents_v3_validated` SCARTATO: zone nere residue estranee agli asset.

`Luna_Components_v4_transparent` SCARTATO come base del rig finale: la semplice rimozione del nero può lasciare frammenti vicini o bordi inaffidabili.

Regola permanente: checkerboard obbligatorio; nessun asset con fondo nero, aloni, parti estranee o amputazioni può entrare nel rig.

## Architettura
Non si usa Live2D Cubism. Obiettivo attuale: custom 2D leggero per WebView/Android, senza dipendenze Live2D.

### v0.5.0 — SCARTATO
Tecnica: duplicati ritagliati della posa full-body per simulare testa/capelli/chest indipendenti.

Test reale: immagini sfasate, ghosting, parti duplicate. Tecnica definitivamente vietata anche per gli altri personaggi.

### v0.5.1 — SCARTATO DOPO ANDROID #3
Correzione: un solo sprite full-body visibile; niente duplicati regionali; 8 pose su canvas comune 240x500 WebP lossless; idle, gesture, mapping emozione->posa; TALK/BLINK come pose complete.

Report reale utente `Android #3 stable-rig`:
- runtime: 0.5.1
- durata: 15042 ms
- frames: 588
- FPS medio: 39.1
- frame medio: 25.56 ms
- p95: 33.8 ms
- jank >33 ms: 235 frame
- jank: 40%
- viewport: 443x984
- DPR: 2.4375
- rig: stable
- pose caricate: 8
- memoria JS: 9.5 MB usati / 9.5 MB totale
- WebView: Chrome 151 su Android 16 moto g56 5G
- `prefers-reduced-motion = true`

Difetti osservati:
1. da ferma Luna sfarfalla tra due immagini;
2. movimento percepito troppo scattoso;
3. `prefers-reduced-motion=true` disabilitava le animazioni CSS tramite la regola globale precedente;
4. il cambio automatico IDLE/BLINK/TALK usava sprite full-body completi e produceva flicker visibile;
5. il loop JavaScript continuo aggiornava trasformazioni ad ogni frame senza un beneficio sufficiente sul telefono.

Conclusione: v0.5.1 è SCARTATO come renderer finale. Il risultato e le metriche vanno conservati come benchmark negativo.

### v0.5.2 — PENDING TEST MOBILE
Preparata localmente dopo il report Android #3.

Obiettivo: eliminare flicker e ridurre jank prima di reintrodurre fisica locale.

Modifiche:
- nessun cambio automatico IDLE/BLINK/TALK quando Luna è ferma o parla;
- una sola posa completa visibile alla volta;
- TALK e BLINK restano disponibili come pose manuali/stati, ma non vengono alternati automaticamente;
- rimosso il loop JavaScript continuo di fisica/idle;
- idle e gesture spostati su trasformazioni CSS compositor-friendly;
- movimento non viene più silenziosamente disabilitato dal `prefers-reduced-motion` del sistema durante questo test; il valore viene solo registrato nella diagnostica;
- ridotti su mobile `backdrop-filter`, grandi blur ambientali e shadow costose;
- gesture `nod`, `tilt`, `bounce`, `step` restano disponibili;
- diagnostica: `Android #4 compositor`;
- runtime: `0.5.2`;
- package test: `com.matrixneo.lunaavatarv050`;
- versionCode: 4;
- stessa chiave test di v0.5.0 compat/v0.5.1 per aggiornamento diretto.

APK locale: `Luna-Avatar-Test-v0.5.2.apk`.

Stato: PENDING test reale. Non promuovere finché non vengono verificati assenza flicker, fluidità e metriche Android #4.

## Busto / capelli / testa indipendenti
La fisica locale indipendente resta DISABILITATA finché non esistono veri layer puliti e geometricamente allineati o una mesh/deformer adatta.

Non simulare mai capelli, testa o busto muovendo copie ritagliate dell'intera posa.

Per una vera chest physics futura serve:
- busto/chest realmente separato e allineato, oppure mesh dedicata;
- spring-damping leggero;
- movimento quasi nullo in quiete;
- nessun seam/ghosting visibile.

## Pipeline obbligatoria per TUTTI i personaggi
1. CP0 master canonica approvata;
2. CP1 pose full-body complete/trasparenti;
3. CP2 volto/testa/espressioni;
4. CP3 occhi + blink;
5. CP4 bocche + lip-sync;
6. CP5 capelli fisici;
7. CP6 busto/chest;
8. CP7 braccia/mani/guanti;
9. CP8 gambe/piedi;
10. CP9 accessori/outfit;
11. CP10 allineamento rig;
12. CP11 animazioni/fisica;
13. CP12 test mobile/APK.

Regole:
- validare ogni checkpoint prima del successivo;
- salvare sorgente, metodo, coordinate/dimensioni, asset, problemi, correzioni e stato APPROVATO/SCARTATO/PENDING;
- verificare sempre volto/capelli, entrambe le mani, entrambe le gambe/piedi, outfit e accessori;
- non propagare asset difettosi;
- non usare copie full-body come falsi layer indipendenti;
- se un test reale fallisce, invalidare il checkpoint e registrare metriche e motivo;
- `main` resta intatta finché il rig non supera test visivo e prestazionale sul telefono.

## UI laboratorio
v0.4.2 aveva già corretto il pannello TEST che copriva Luna:
- pannello mobile massimo ~40-42% altezza;
- avatar riposizionato sopra il pannello;
- pannello minimizzabile;
- diagnostica minimizza automaticamente il pannello;
- desktop con pannello laterale.

Commit storici UI v0.4.2:
- index `6414be31c5a56678f16286099466a62e472bb79b`
- CSS `1f238394863320890a0cf5775f78022e55b3ddb9`
- JS `ee439a3ec209f6f7afe514dd1739ebd7007e7ea7`

## Android wrapper
Wrapper WebView in `android/`, minSdk 26, progetto Gradle target/compileSdk 35, hardware acceleration, JavaScript/DOM storage, caricamento locale `file:///android_asset/index.html?android=1`.

Le build compat v0.5.x usano temporaneamente package separato `com.matrixneo.lunaavatarv050`. Configurazione di test, non definitiva.

## Prossimo checkpoint
1. installare v0.5.2 sopra v0.5.1;
2. verificare che da ferma non alterni più due sprite;
3. verificare idle continuo e gesture senza scatti evidenti;
4. eseguire `Android #4 compositor` per 15 s;
5. confrontare FPS, p95 e jank con v0.5.1 (39.1 FPS / p95 33.8 ms / 40% jank);
6. se il renderer base è fluido, affrontare CP5/CP6 con veri layer/mesh;
7. solo dopo test positivo trasferire runtime + binari nella branch e produrre build Gradle con firma Android v2/v3.

## Regola di continuità
Aggiornare questo file dopo ogni checkpoint validato e dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API, build Android o architettura. Registrare anche checkpoint scartati e motivo.