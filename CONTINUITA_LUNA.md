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

## Requisito prestazionale e di movimento — OBBLIGATORIO
Luna deve muoversi in modo **fluido, continuo e naturale**. Un renderer che funziona tecnicamente ma appare scattoso, oscilla come un cartonato, sfarfalla o cambia bruscamente pose NON è accettabile.

Criteri di accettazione sul telefono di test:
- obiettivo: ~60 FPS quando il dispositivo/WebView lo consente;
- frame time medio idealmente vicino o sotto 16.7 ms;
- p95 indicativamente <= 20 ms come target di qualità;
- jank >33 ms idealmente <5%;
- nessun cambio automatico di sprite full-body per blink/lip-sync;
- nessun dondolio periodico artificiale dell'intero corpo;
- movimenti con easing/spring coerenti e senza salti di posizione;
- idle quasi impercettibile: respirazione e micro-movimenti, non oscillazione laterale evidente;
- occhi, bocca, capelli e chest devono muoversi tramite layer/mesh dedicati quando implementati, non tramite copie sfasate del full-body.

Le soglie numeriche sono target pratici, non una scusa per dichiarare riuscito un movimento visivamente brutto: la validazione finale resta visiva + diagnostica reale sul telefono.

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

Le 8 pose CP1 sono valide come pose complete. NON implicano che blink o lip-sync siano funzionanti.

### CP2 — VOLTO/TESTA/ESPRESSIONI — PENDING
Non esiste ancora un set di layer facciali puliti e perfettamente allineati alla IDLE canonica.

### CP3 — OCCHI + BLINK — NON IMPLEMENTATO / PENDING
Il blink NON ha mai funzionato correttamente in nessuna build finora.

Tentativi precedenti:
- v0.4.x: mancavano veri layer occhi;
- v0.5.0: copie/sovrapposizioni della figura -> sfasamento/ghosting;
- v0.5.1: alternanza full-body IDLE/BLINK -> sfarfallio;
- v0.5.2: alternanza rimossa -> difetto nascosto, non risolto; occhi fermi.

Per considerare CP3 APPROVATO servono veri asset occhi aperti/chiusi, trasparenti, ritagliati e allineati sullo stesso volto base, senza cambiare l'intero sprite.

### CP4 — BOCCA + LIP-SYNC — NON IMPLEMENTATO / PENDING
Il lip-sync NON ha mai funzionato correttamente in nessuna build finora.

Tentativi precedenti:
- v0.4.x: mancavano veri layer bocca;
- v0.5.0: patch/copie sovrapposte -> sfasamento;
- v0.5.1: alternanza full-body IDLE/TALK -> sfarfallio;
- v0.5.2: alternanza rimossa -> difetto nascosto, non risolto; bocca ferma.

Per considerare CP4 APPROVATO servono almeno bocca chiusa + 2/3 aperture realmente separate e allineate al volto base. La voce audio/TTS è un sottosistema separato e non è ancora implementato nel laboratorio avatar.

## Componenti separati
`Luna_RigComponents_v3_validated` SCARTATO: zone nere residue estranee agli asset.

`Luna_Components_v4_transparent` SCARTATO come base del rig finale: la semplice rimozione del nero può lasciare frammenti vicini o bordi inaffidabili.

Regola permanente: checkerboard obbligatorio; nessun asset con fondo nero, aloni, parti estranee o amputazioni può entrare nel rig.

## Architettura
Non si usa Live2D Cubism. Obiettivo: custom 2D leggero per WebView/Android, senza dipendenze Live2D.

### v0.5.0 — SCARTATO
Tecnica: duplicati ritagliati della posa full-body per simulare testa/capelli/chest indipendenti.

Test reale: immagini sfasate, ghosting, parti duplicate. Tecnica definitivamente vietata anche per gli altri personaggi.

### v0.5.1 — SCARTATO
Tecnica: un solo sprite full-body visibile, 8 pose su canvas comune, TALK/BLINK come pose complete alternate automaticamente.

Report Android #3 reale:
- FPS medio: 39.1
- frame medio: 25.56 ms
- p95: 33.8 ms
- jank >33 ms: 40%
- viewport: 443x984
- DPR: 2.4375
- memoria JS: 9.5 MB
- Android 16 / moto g56 5G / WebView Chrome 151
- `prefers-reduced-motion = true`

Difetti:
1. sfarfallio da ferma tra sprite completi;
2. movimento troppo scattoso;
3. blink/lip-sync non reali: erano cambi di full-body;
4. loop JS continuo troppo costoso rispetto al risultato.

### v0.5.2 — SCARTATO COME SOLUZIONE FUNZIONALE
La v0.5.2 NON ha corretto blink/lip-sync/head/hair/chest. Ha soltanto disattivato o nascosto i meccanismi difettosi per stabilizzare il renderer.

Correzione concettuale importante richiesta dall'utente: **disabilitare un difetto non equivale a risolverlo**.

Cosa faceva v0.5.2:
- niente alternanza automatica IDLE/BLINK/TALK -> elimina lo sfarfallio, ma lascia occhi e bocca fermi;
- niente loop JS continuo -> riduce carico, ma elimina la fisica locale;
- una sola posa full-body -> evita ghosting, ma non crea un vero rig;
- movimento idle dell'intera figura -> produce un dondolio artificiale e non è considerato valido.

Stato: v0.5.2 è utile solo come diagnosi/isolamento dei problemi. NON è un checkpoint approvato del rig.

## CP5 — CAPELLI FISICI — PENDING
Nessun vero layer capelli allineato è ancora approvato. Vietato simulare capelli indipendenti con copie dell'intera figura.

## CP6 — BUSTO/CHEST — PENDING
Nessun vero busto/chest layer o mesh allineata è ancora approvato. Il movimento del seno/torace non è stato risolto; è stato solo disabilitato dopo i problemi di ghosting.

Per una vera chest physics servono:
- busto/chest realmente separato e allineato, oppure mesh/deformer dedicata;
- spring-damping leggero;
- movimento quasi nullo in quiete;
- nessun seam/ghosting.

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
- non dichiarare risolto un problema solo perché il comportamento difettoso è stato disattivato;
- se una funzione richiesta (blink, lip-sync, hair/chest physics) non è realmente attiva e verificata, deve risultare PENDING/NON IMPLEMENTATA;
- se un test reale fallisce, invalidare il checkpoint e registrare metriche e motivo;
- fluidità percepita e stabilità visiva sono requisiti bloccanti, non miglioramenti opzionali;
- `main` resta intatta finché il rig non supera test visivo e prestazionale sul telefono.

## UI laboratorio
v0.4.2 ha corretto il pannello TEST che copriva Luna:
- pannello mobile massimo ~40-42% altezza;
- avatar riposizionato sopra il pannello;
- pannello minimizzabile;
- diagnostica minimizza automaticamente il pannello;
- desktop con pannello laterale.

## Android wrapper
Wrapper WebView in `android/`, minSdk 26, progetto Gradle target/compileSdk 35, hardware acceleration, JavaScript/DOM storage, caricamento locale `file:///android_asset/index.html?android=1`.

Le build compat v0.5.x usano temporaneamente package separato `com.matrixneo.lunaavatarv050`. Configurazione di test, non definitiva.

## Prossimo passo corretto
NON produrre un'altra build basata su trucchi full-body.

Sequenza:
1. partire dalla IDLE CP1 approvata come base geometrica;
2. ricavare e allineare sullo stesso canvas il volto/base necessario;
3. costruire CP3 con occhi aperti/chiusi reali e testare blink isolato;
4. solo dopo CP3 approvato, costruire CP4 con bocca chiusa + aperture e testare lip-sync isolato;
5. eliminare il dondolio dell'intero corpo;
6. implementare il movimento con trasformazioni leggere/compositor e interpolazione continua, non con salti di sprite;
7. solo dopo occhi/bocca stabili affrontare capelli e busto con veri layer/mesh;
8. ogni funzione va testata singolarmente sul telefono prima di aggiungere la successiva;
9. non considerare CP11/CP12 approvati finché il movimento non è visivamente fluido e la diagnostica non mostra un netto miglioramento rispetto al benchmark negativo v0.5.1.

## Regola di continuità
Aggiornare questo file dopo ogni checkpoint validato e dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API, build Android o architettura. Registrare anche checkpoint scartati e motivo.