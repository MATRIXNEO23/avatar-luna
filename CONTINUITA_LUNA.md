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

Master canonica storica approvata il 2026-09-01: character sheet 1536x1024 con Luna capelli nero/viola, occhi viola, outfit nero/viola, 8 pose full-body e componenti di riferimento.

Priorità identità: volto > capelli > colori/tratti > outfit > espressione/posa > movimento.

La master storica resta riferimento di identità, ma NON è più considerata automaticamente idonea come sorgente tecnica Live2D. Se la separazione dei layer richiede ritagli fragili o ricostruzioni imprecise, va creata una nuova master specificamente Live2D-ready preservando l'identità di Luna.

## Requisito prestazionale e di movimento — OBBLIGATORIO
Luna deve muoversi in modo **fluido, continuo e naturale**. Un renderer che funziona tecnicamente ma appare scattoso, oscilla come un cartonato, sfarfalla o cambia bruscamente pose NON è accettabile.

Criteri di accettazione sul telefono di test:
- obiettivo: ~60 FPS quando il dispositivo/runtime lo consente;
- frame time medio idealmente vicino o sotto 16.7 ms;
- p95 indicativamente <= 20 ms come target di qualità;
- jank >33 ms idealmente <5%;
- nessun cambio automatico di sprite full-body per blink/lip-sync;
- nessun dondolio periodico artificiale dell'intero corpo;
- movimenti con easing/spring coerenti e senza salti di posizione;
- idle quasi impercettibile: respirazione e micro-movimenti, non oscillazione laterale evidente;
- occhi, bocca, capelli e chest devono muoversi tramite layer/mesh dedicati, non tramite copie sfasate del full-body.

Le soglie numeriche sono target pratici, non una scusa per dichiarare riuscito un movimento visivamente brutto: la validazione finale resta visiva + diagnostica reale sul telefono.

## Checkpoint grafici storici
### CP0 — MASTER CANONICA — APPROVATO COME IDENTITÀ / RIFERIMENTO
La master 1536x1024 resta riferimento visivo di Luna, ma non è vincolante come asset tecnico per il nuovo Live2D.

### CP1 — POSE FULL-BODY — APPROVATO COME RIFERIMENTO
`Luna_Master_Extract_v1` SCARTATO: ritaglio manuale a colonne, con parti mancanti e contaminazioni da pose vicine.

`Luna_Poses_v2_corrected` APPROVATO come materiale di riferimento: 8 pose IDLE, TALK, BLINK, SMILE, SHY, ANGRY, SURPRISED, SEXY.

Le 8 pose CP1 restano valide come riferimento visivo. NON implicano che blink o lip-sync siano funzionanti.

### CP2 — VOLTO/TESTA/ESPRESSIONI — DA RIFARE NELLA NUOVA MASTER LIVE2D
Il tentativo di estrarre componenti dal foglio esistente non produce layer abbastanza puliti.

### CP3 — OCCHI + BLINK — NON IMPLEMENTATO / PENDING
Il blink NON ha mai funzionato correttamente in nessuna build finora.

### CP4 — BOCCA + LIP-SYNC — NON IMPLEMENTATO / PENDING
Il lip-sync NON ha mai funzionato correttamente in nessuna build finora. La voce audio/TTS è un sottosistema separato.

## Tentativo Live2D L1A — SCARTATO
Pacchetto `Luna_Live2D_L1A_face_candidates` SCARTATO dall'utente: i componenti occhi/bocca risultano ritagliati male e non sono adatti a un rig serio.

Errore metodologico: tentare di ricavare layer Live2D puliti da un character sheet composito già impaginato, invece di partire da una sorgente progettata per la separazione.

Regola nuova: **non continuare a ritagliare componenti dalla vecchia master se il risultato non è pulito. È preferibile rifare una master Live2D-ready apposita, mantenendo l'identità di Luna.**

## Componenti separati storici
`Luna_RigComponents_v3_validated` SCARTATO: zone nere residue estranee agli asset.

`Luna_Components_v4_transparent` SCARTATO come base del rig finale: la semplice rimozione del nero può lasciare frammenti vicini o bordi inaffidabili.

Regola permanente: checkerboard obbligatorio; nessun asset con fondo nero, aloni, parti estranee o amputazioni può entrare nel rig.

## Architettura custom sprite — ABBANDONATA COME SOLUZIONE FINALE
### v0.5.0 — SCARTATO
Duplicati ritagliati della posa full-body per simulare testa/capelli/chest indipendenti. Risultato: immagini sfasate, ghosting, parti duplicate.

### v0.5.1 — SCARTATO
Sprite full-body + alternanza pose TALK/BLINK. Report Android #3: 39.1 FPS medi, 25.56 ms frame medio, p95 33.8 ms, jank >33 ms 40%. Difetti: sfarfallio, movimento scattoso, blink/lip-sync falsi, loop JS costoso.

### v0.5.2 — SCARTATO COME SOLUZIONE FUNZIONALE
Ha soltanto nascosto/disabilitato parti difettose. Il movimento idle dell'intera figura produce un dondolio artificiale. Occhi, bocca, capelli e chest non sono risolti.

Regola acquisita: **disabilitare un difetto non equivale a risolverlo**.

## DECISIONE ARCHITETTURALE — LIVE2D
Decisione utente 2026-09-01: **abbandonare il custom sprite rig come soluzione finale e puntare a un vero modello Live2D/Cubism per Luna**, con pipeline riusabile per gli altri personaggi.

Motivo: l'obiettivo reale è movimento fluido, blink vero, lip-sync vero, occhi mobili, capelli e busto con fisica locale, senza scambio di sprite completi.

### Runtime mobile consigliato
Per Android il target preferito è **Cubism SDK for Native + OpenGL**, non il vecchio WebView renderer, per ridurre overhead e avere controllo diretto su memoria, frame pacing e caricamento risorse.

### Budget memoria mobile
Tetto assoluto avatar: **300 MB RAM**.
Target operativo: **150–220 MB** per un singolo personaggio attivo.

### Strategia texture mobile
Non usare 4096x4096 come default.

Profilo Luna Mobile iniziale:
- atlas principale volto/capelli frontali: massimo 2048x2048;
- atlas corpo/outfit: 1024x1024;
- atlas secondario capelli/accessori: 1024x1024 solo se necessario;
- preferire 1024 quando la qualità visiva sul telefono resta sufficiente;
- un solo modello Live2D attivo alla volta;
- scaricare risorse del personaggio non più attivo;
- minimizzare cambi texture, blend mode e clipping;
- evitare maschere inutili;
- misurare la memoria reale sul dispositivo, non dedurla solo dal peso dei PNG.

### FPS
Target: **60 FPS percepiti** quando Luna è in primo piano se il telefono lo consente; fallback controllato a 30 FPS solo se necessario per termiche/carico, senza movimento scattoso.

Nessun dondolio dell'intera figura come falso idle. L'idle deve derivare da respirazione, micro-movimenti di testa/occhi, capelli e deformazioni locali.

## Emozioni / espressioni obbligatorie
Il modello Live2D deve supportare almeno:
- neutral;
- happy / smile;
- shy;
- angry;
- surprised;
- focused;
- sad / tristezza;
- flirty / flirt;
- sensual / sensuale;
- provocative / sexy;
- erotic_explicit / erotica esplicita, esclusivamente per personaggi adulti e solo quando Matrix Engine seleziona questo registro in base a contesto e stato relazionale.

Questi stati NON devono essere semplici filtri o cambi di sprite: devono risultare da combinazioni fluide di occhi, palpebre, sopracciglia, bocca, sguardo, inclinazione testa/corpo, respirazione, postura e parametri locali del rig.

Matrix Engine continuerà a decidere quale emozione/registro/intensità applicare; il modello Live2D deve solo essere capace di rappresentarli in modo fluido e coerente.

## Nuova pipeline Live2D obbligatoria
### L0 — NUOVA MASTER LIVE2D-READY — PENDING
Creare una nuova master specificamente pensata per Live2D, mantenendo con massima fedeltà identità, volto, capelli, palette e outfit di Luna.

La nuova master NON deve essere un character sheet composito da ritagliare. Deve essere progettata per produrre layer puliti, sovrapponibili e con parti nascoste ricostruite.

Requisiti minimi della nuova master:
- posa frontale/neutra coerente;
- testa e corpo geometricamente centrati;
- capelli dietro e davanti separabili;
- volto completo sotto capelli/accessori;
- entrambi gli occhi completi sotto palpebre/ciglia;
- bocca completa con interno ricostruibile;
- collo e busto completi sotto testa/capelli/outfit;
- braccia/mani separabili dalle zone del torso che coprono;
- chest/bust deformabile senza buchi;
- accessori con geometria completa sotto sovrapposizioni;
- nessun fondo incorporato;
- nessun elemento adiacente che renda ambiguo il ritaglio.

La vecchia master viene usata come **reference di identità**, non come obbligo tecnico di pixel-identità durante la ricostruzione Live2D-ready.

### L1 — ART SEPARATION / PSD LIVE2D-READY
Solo dopo L0 approvata, produrre i layer reali: hair_back, ciocche fisiche, body/torso, neck, face base, eyebrows, eye whites, iris/pupils, eyelids/lashes, mouth parts, hair_front, arms/hands, chest region, accessori.

Tutti i layer devono essere trasparenti, puliti e ricostruire Luna senza buchi/contaminazioni.

### L2 — MODELING CUBISM
Creare ArtMesh e deformers con densità controllata. Priorità qualità: volto/capelli > busto > mani/accessori > parti inferiori.

### L3 — PARAMETRI MINIMI
ParamAngleX/Y/Z; BodyAngleX/Y/Z dove necessario; EyeBallX/Y; EyeLOpen/EyeROpen; MouthOpenY; MouthForm; Breath; brow parameters; parametri chest/hair/accessori.

### L4 — BLINK / GAZE / LIP-SYNC
Blink indipendente, sguardo indipendente, bocca deformata localmente. Vietato cambiare full-body per queste funzioni.

### L5 — PHYSICS
Physics leggere per capelli, accessori e chest/bust. Spring/damping naturali, niente oscillazione globale artificiale.

### L6 — MOTION / EXPRESSIONS
Idle, talk e set emozioni completo, inclusi sad/tristezza, sensual/sensuale ed erotic_explicit/erotica esplicita per adulti, come motion/espressioni del modello, non sprite completi.

### L7 — ANDROID NATIVE INTEGRATION
Integrare Cubism SDK for Native/OpenGL nel laboratorio Android separato. Mantenere API Matrix ad alto livello: emotion, register, intensity, speaking, gaze, gesture, motion.

### L8 — BENCHMARK MOBILE
Misurare sul telefono reale PSS/RSS, memoria nativa/GPU se ottenibile, FPS, p95, jank, temperatura, tempo caricamento e stabilità.

### L9 — VALIDAZIONE
Il modello non entra in `main` finché non supera identità visiva, fluidità, blink/gaze/lip-sync, emozioni/registri richiesti, physics capelli/chest, RAM <300 MB per avatar, assenza seam/ghosting e test mobile prolungato.

## Prompt pack Live2D — CREATO / PENDING USO E VALIDAZIONE
Il 2026-09-01 sono stati aggiunti nella branch `rig-assets-working` dieci prompt tecnici separati in `docs/live2d/prompts/` per evitare mega-sheet sovraccariche e ridurre errori di crop, incoerenza anatomica e perdita di dettaglio.

File creati:
1. `01_Turnaround.md`
2. `02_StandingPoses.md`
3. `03_FloorBedPoses.md`
4. `04_FaceExpressions.md`
5. `05_EyesMouth.md`
6. `06_HairPhysics.md`
7. `07_MainOutfit.md`
8. `08_AltOutfits.md`
9. `09_BodyParts_Accessories.md`
10. `10_LayerMap.md`

Regole comuni fissate nei prompt:
- usare sempre la reference canonica di Luna;
- nessuna reinterpretazione di volto, capelli o proporzioni;
- nessun crop di testa/capelli/mani/gambe/piedi/accessori;
- margine 12–15% attorno alle figure full-body;
- se lo spazio non basta, dividere in più tavole invece di comprimere;
- outfit standard per le pose principali; outfit alternativi in tavole separate;
- occhi sinistro e destro generati separatamente, non un solo occhio specchiato;
- componenti tecnici grandi e separati;
- risoluzione master alta, con target mobile indicativo 2048 per volto/capelli e 1024 per corpo/secondari quando sufficiente.

Stato: **PENDING**. I prompt sono il nuovo standard operativo, ma le immagini generate con essi vanno validate una per una prima di dichiarare L0 APPROVATO.

## Regole per tutti i personaggi futuri
- stessa pipeline Live2D-ready;
- stesso naming standard;
- budget texture per profilo mobile;
- un solo personaggio attivo salvo scene che dimostrino di reggere più modelli;
- asset grafici e rig separati dalla bio/persona Matrix;
- nessuna funzione dichiarata risolta se è solo disabilitata;
- ogni checkpoint deve avere stato APPROVATO/SCARTATO/PENDING;
- se una master non nasce già pensando alla separazione Live2D, rifarla prima di perdere tempo in ritagli fragili.

## Prossimo passo operativo
1. usare i 10 prompt separati, iniziando da `01_Turnaround.md`;
2. validare ogni tavola singolarmente prima di generare la successiva;
3. validare la nuova master L0 prima di estrarre qualunque layer;
4. solo dopo L0 approvata fare L1 art separation;
5. volto/occhi/blink/gaze;
6. bocca/lip-sync;
7. espressioni/emozioni/registri;
8. capelli/chest physics;
9. Cubism Native Android + benchmark memoria/FPS.

## Regola di continuità
Aggiornare questo file dopo ogni checkpoint validato e dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API, build Android o architettura. Registrare anche checkpoint scartati e motivo.