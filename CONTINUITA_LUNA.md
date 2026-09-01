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
### CP0 — MASTER CANONICA — APPROVATO
Master 1536x1024 approvata dall'utente.

### CP1 — POSE FULL-BODY — APPROVATO COME RIFERIMENTO
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

Le 8 pose CP1 restano valide come riferimento visivo e materiale sorgente. NON implicano che blink o lip-sync siano funzionanti.

### CP2 — VOLTO/TESTA/ESPRESSIONI — PENDING
Non esiste ancora un set di layer facciali puliti e perfettamente allineati alla IDLE canonica.

### CP3 — OCCHI + BLINK — NON IMPLEMENTATO / PENDING
Il blink NON ha mai funzionato correttamente in nessuna build finora.

Tentativi precedenti:
- v0.4.x: mancavano veri layer occhi;
- v0.5.0: copie/sovrapposizioni della figura -> sfasamento/ghosting;
- v0.5.1: alternanza full-body IDLE/BLINK -> sfarfallio;
- v0.5.2: alternanza rimossa -> difetto nascosto, non risolto; occhi fermi.

### CP4 — BOCCA + LIP-SYNC — NON IMPLEMENTATO / PENDING
Il lip-sync NON ha mai funzionato correttamente in nessuna build finora.

Tentativi precedenti:
- v0.4.x: mancavano veri layer bocca;
- v0.5.0: patch/copie sovrapposte -> sfasamento;
- v0.5.1: alternanza full-body IDLE/TALK -> sfarfallio;
- v0.5.2: alternanza rimossa -> difetto nascosto, non risolto; bocca ferma.

La voce audio/TTS è un sottosistema separato e non è ancora implementato nel laboratorio avatar.

## Componenti separati storici
`Luna_RigComponents_v3_validated` SCARTATO: zone nere residue estranee agli asset.

`Luna_Components_v4_transparent` SCARTATO come base del rig finale: la semplice rimozione del nero può lasciare frammenti vicini o bordi inaffidabili.

Regola permanente: checkerboard obbligatorio; nessun asset con fondo nero, aloni, parti estranee o amputazioni può entrare nel rig.

## Architettura custom sprite — ABBANDONATA COME SOLUZIONE FINALE
### v0.5.0 — SCARTATO
Duplicati ritagliati della posa full-body per simulare testa/capelli/chest indipendenti. Risultato: immagini sfasate, ghosting, parti duplicate.

### v0.5.1 — SCARTATO
Sprite full-body + alternanza pose TALK/BLINK.
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

Difetti: sfarfallio, movimento scattoso, blink/lip-sync falsi, loop JS costoso.

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

Budget indicativo da validare sul telefono:
- Core/Framework/native app + strutture modello: 20–50 MB;
- texture decode/GPU: 40–90 MB;
- render target/mask/buffer: 20–50 MB;
- motion/physics/JSON/espressioni: 10–25 MB;
- margine runtime/driver: 40–70 MB.

Il budget è un obiettivo tecnico, NON una misura ancora validata.

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
- **sad / tristezza**;
- **flirty / flirt**;
- **sensual / sensuale**;
- **provocative / sexy**;
- **erotic_explicit / erotica esplicita**, esclusivamente per personaggi adulti e solo quando Matrix Engine seleziona questo registro in base a contesto e stato relazionale.

Questi stati NON devono essere semplici filtri o cambi di sprite: devono risultare da combinazioni fluide di occhi, palpebre, sopracciglia, bocca, sguardo, inclinazione testa/corpo, respirazione, postura e parametri locali del rig.

La tristezza è un'emozione obbligatoria, non opzionale. Gli stati sensuale ed erotico esplicito sono registri espressivi separati e non devono essere attivati automaticamente.

Matrix Engine continuerà a decidere quale emozione/registro/intensità applicare; il modello Live2D deve solo essere capace di rappresentarli in modo fluido e coerente.

## Nuova pipeline Live2D obbligatoria
### L0 — SORGENTE CANONICA
Usare la master Luna approvata. Nessuna reinterpretazione.

### L1 — ART SEPARATION / PSD LIVE2D-READY
Creare un PSD/layer set pulito e coerente. Minimo:
- hair_back;
- ciocche posteriori separate dove serve fisica;
- torso/body base;
- neck;
- head/face base;
- ears se visibili;
- eyebrows L/R;
- eye white L/R;
- iris/pupil L/R;
- upper/lower eyelid L/R;
- lash/eye-line L/R;
- mouth base;
- mouth interior;
- upper/lower lip;
- eventuale tongue/teeth se realmente necessari;
- hair_front;
- ciocche frontali fisiche;
- arms/hands dove devono muoversi;
- chest/bust deformable region;
- accessori con movimento indipendente.

Tutti i layer devono essere trasparenti, puliti e ricostruire Luna senza buchi/contaminazioni.

### L2 — MODELING CUBISM
Creare ArtMesh e deformers con densità controllata. Priorità qualità: volto/capelli > busto > mani/accessori > parti inferiori.

### L3 — PARAMETRI MINIMI
- ParamAngleX/Y/Z;
- BodyAngleX/Y/Z dove necessario;
- EyeBallX/Y;
- EyeLOpen / EyeROpen;
- MouthOpenY;
- MouthForm;
- Breath;
- brow parameters;
- eventuali parametri chest/hair/accessori.

### L4 — BLINK / GAZE / LIP-SYNC
Blink indipendente, sguardo indipendente, bocca deformata localmente. Vietato cambiare full-body per queste funzioni.

### L5 — PHYSICS
Physics leggere per capelli, accessori e chest/bust. Spring/damping naturali, niente oscillazione globale artificiale.

### L6 — MOTION / EXPRESSIONS
Idle, talk e set emozioni completo, inclusi **sad/tristezza, sensual/sensuale ed erotic_explicit/erotica esplicita per adulti**, come motion/espressioni del modello, non sprite completi.

### L7 — ANDROID NATIVE INTEGRATION
Integrare Cubism SDK for Native/OpenGL nel laboratorio Android separato. Mantenere API Matrix ad alto livello: emotion, register, intensity, speaking, gaze, gesture, motion.

### L8 — BENCHMARK MOBILE
Misurare sul telefono reale:
- PSS/RSS app;
- memoria nativa;
- memoria GPU se ottenibile;
- FPS medio;
- p95 frame time;
- jank;
- temperatura/carico prolungato;
- tempo caricamento modello;
- stabilità dopo cambio personaggio.

### L9 — VALIDAZIONE
Il modello non entra in `main` finché non supera:
- identità visiva;
- fluidità;
- blink/gaze/lip-sync;
- emozioni/registri completi inclusi tristezza, sensuale ed erotico esplicito per adulti;
- physics capelli/chest;
- RAM <300 MB per avatar;
- assenza di seam/ghosting;
- test mobile prolungato.

## Regole per tutti i personaggi futuri
- stessa pipeline Live2D-ready;
- stesso naming standard;
- budget texture per profilo mobile;
- un solo personaggio attivo salvo scene che dimostrino di reggere più modelli;
- asset grafici e rig separati dalla bio/persona Matrix;
- nessuna funzione dichiarata risolta se è solo disabilitata;
- ogni checkpoint deve avere stato APPROVATO/SCARTATO/PENDING;
- il set emozioni deve includere tristezza quando il personaggio la può esprimere;
- per personaggi esclusivamente adulti il rig deve poter rappresentare anche registri sensuale ed erotico esplicito, mantenendoli separati dagli stati emotivi di base e sotto controllo di Matrix Engine.

## Prossimo passo operativo
1. non produrre altre build del custom sprite rig come percorso finale;
2. preparare la separazione grafica Live2D-ready di Luna dalla master approvata;
3. validare prima il volto completo e la ricostruzione neutrale;
4. poi occhi/blink/gaze;
5. poi bocca/lip-sync;
6. poi espressioni/emozioni e registri incluso sad/tristezza, sensuale ed erotico esplicito;
7. poi capelli/chest physics;
8. solo dopo creare il modello Cubism e il runtime Android Native;
9. benchmark memoria/FPS prima dell'integrazione con Matrix.

## Regola di continuità
Aggiornare questo file dopo ogni checkpoint validato e dopo ogni modifica rilevante a versione, grafica, asset, test, rig, API, build Android o architettura. Registrare anche checkpoint scartati e motivo.
