# CONTINUITÀ PROGETTO LUNA

Ultimo aggiornamento: 2026-09-01
Repository: `MATRIXNEO23/avatar-luna`
Branch operativa: `rig-assets-working`
Branch stabile non toccata: `main`
Branch backup: `rig-recovery-backup-2026-09-01`

## Scopo
Laboratorio separato da Neon Tides / Matrix Engine per sviluppare avatar, grafica, rig e test Android senza regressioni sul progetto principale.

## Identità visiva canonica
- `LUNA master.png` è presente nella root della branch `rig-assets-working` ed è la reference identitaria corrente da usare per tutte le nuove tavole.
- Priorità identità: volto > capelli > colori/tratti > proporzioni > outfit > espressione/posa > movimento.
- La vecchia `luna_08_no_cape.png` è solo fallback storico e NON va usata come base finale.
- Le vecchie character sheet/pose restano materiale di riferimento, ma NON sono automaticamente idonee come sorgente tecnica Live2D.
- Nessuna nuova immagine generata può diventare reference della successiva finché non viene approvata esplicitamente.

## Requisito prestazionale e movimento
Luna deve muoversi in modo fluido, continuo e naturale.

Target mobile:
- circa 60 FPS quando dispositivo/runtime lo consentono;
- frame medio idealmente vicino o sotto 16.7 ms;
- p95 indicativamente <=20 ms;
- jank >33 ms idealmente <5%;
- nessun cambio full-body per blink/lip-sync;
- nessun dondolio periodico artificiale dell'intero corpo;
- occhi, bocca, capelli, busto e accessori dinamici tramite layer/mesh/physics dedicati;
- qualità visiva reale sul telefono prevale sui soli numeri diagnostici.

## Storico rig custom — SCARTATO COME SOLUZIONE FINALE
### v0.5.0 — SCARTATO
Duplicati/ritagli regionali del full-body: ghosting, duplicazioni e disallineamenti.

### v0.5.1 — SCARTATO
Switch full-body TALK/BLINK e idle automatico: 39.1 FPS medi, p95 33.8 ms, jank 40%, flicker e movimento scattoso.

### v0.5.2 — SCARTATO
Ha nascosto/disabilitato funzioni difettose senza risolverle. Regola permanente: disabilitare un difetto non equivale a correggerlo.

## Decisione architetturale — LIVE2D / CUBISM
La soluzione finale deve essere un vero modello Live2D/Cubism con pipeline riutilizzabile per tutti i personaggi.

Runtime Android preferito: Cubism SDK for Native + OpenGL.

Budget avatar:
- tetto assoluto: <300 MB RAM;
- target operativo: 150–220 MB per un personaggio attivo;
- volto/capelli: fino a 2048x2048 quando necessario;
- corpo/outfit: 1024x1024 come target iniziale;
- secondari/accessori: 1024x1024 solo se necessario;
- un solo modello attivo alla volta di default.

## Capacità Live2D obbligatorie
- rotazione testa/corpo fluida destra e sinistra;
- blink vero;
- gaze indipendente;
- lip-sync vero;
- hair physics;
- chest/bust physics leggera;
- accessori dinamici indipendenti;
- espressioni ed emozioni tramite parametri/deformazioni, non tramite cambio sprite completo.

## Emozioni / registri richiesti
Almeno:
- neutral;
- happy/smile;
- shy;
- angry;
- surprised;
- focused;
- sad/tristezza;
- flirty/flirt;
- sensual/sensuale;
- provocative/sexy;
- `erotic_explicit` come stato tecnico per personaggi adulti, rappresentato nel rig attraverso parametri/espressioni e selezionato da Matrix Engine in base al contesto.

## PROPORTION LOCK — OBBLIGATORIO TRA FILE DIVERSI
File globale: `docs/live2d/prompts/00_PROPORTION_LOCK.md`.

Dopo approvazione di `01_Turnaround.md`, il frontale neutro approvato diventa la **METRIC MASTER**.

Da quel momento tutte le tavole successive devono mantenere:
- rapporto testa/corpo;
- testa, mascella, mento;
- distanza/dimensione occhi;
- collo e spalle;
- busto, vita, fianchi;
- lunghezza braccia;
- femore, tibia, ginocchia;
- dimensione mani/piedi;
- lunghezza totale gambe;
- lunghezza/volume/attaccatura capelli;
- geometria dell'outfit statico.

Per pose supine/prone/laterali non si forza la stessa altezza nel bounding box: si mantengono le stesse lunghezze anatomiche reali evitando scorci estremi.

Una tavola con drift evidente viene SCARTATA e non può diventare reference per la successiva.

## ROTATION LOCK — INTERMEDI SINISTRA E DESTRA
Per tutte le tavole che richiedono rotazione orizzontale usare il set completo:
1. 0° frontale;
2. 22.5° sinistra — INTERMEDIO L;
3. 45° sinistra — 3/4 L;
4. 90° sinistra — profilo L;
5. 135° sinistra — 3/4 posteriore L;
6. 180° retro;
7. 135° destra — 3/4 posteriore R;
8. 90° destra — profilo R;
9. 45° destra — 3/4 R;
10. 22.5° destra — INTERMEDIO R.

INTERMEDIO L e INTERMEDIO R si aggiungono alle viste principali e devono esistere entrambi.
Non ottenere automaticamente il lato destro specchiando il sinistro.
I deformatori Cubism interpolano tra keyform, ma non devono inventare prospettive mancanti.

## ACCESSORI DINAMICI — NUOVA REGOLA DEFINITIVA
Decisione utente: se un oggetto deve essere dinamico, **NON deve comparire nelle immagini/pose base di Luna**.

Quindi le tavole 01–08 devono essere BASE CLEAN e prive di:
- collane/choker mobili;
- catene;
- pendenti;
- gemme sospese;
- orecchini;
- charms;
- accessori capelli mobili;
- bracciali/pendenti mobili;
- accessori stivali mobili;
- qualunque oggetto con physics indipendente.

La pelle, i capelli e l'outfit sotto tali oggetti devono essere disegnati completi e senza buchi/residui.

Gli accessori dinamici vengono creati **solo nel Prompt 09** come asset isolati.

### Accessory scale lock
Ogni accessorio deve mantenere tra tutte le varianti:
- stessa dimensione relativa alla METRIC MASTER;
- stessa lunghezza reale;
- stessa forma/materiale;
- stesso punto di ancoraggio/pivot;
- stesso lato L/R.

Possono cambiare soltanto prospettiva, curva, rotazione e deformazione fisica dovute a posa, movimento e gravità.

### Varianti accessori obbligatorie
Prompt 09 deve creare per ogni accessorio rilevante:
- tutte le 10 varianti di rotazione del turnaround, inclusi INTERMEDIO L/R;
- varianti per le 8 Standing Poses quando il movimento modifica l'oggetto;
- varianti per le 8 Floor/Bed Poses quando gravità/posa modificano l'oggetto;
- L/R separati per componenti asimmetrici.

Gli accessori devono essere mostrati isolati, etichettati per angolo/posa, con pivot/anchor e direzione di gravità quando utile. NON vanno disegnati sopra Luna nelle pose base.

## Prompt pack Live2D
Cartella: `docs/live2d/prompts/`

File:
- `00_PROPORTION_LOCK.md`
- `01_Turnaround.md`
- `02_StandingPoses.md`
- `03_FloorBedPoses.md`
- `04_FaceExpressions.md`
- `05_EyesMouth.md`
- `06_HairPhysics.md`
- `07_MainOutfit.md`
- `08_AltOutfits.md`
- `09_BodyParts_Accessories.md`
- `10_LayerMap.md`

Stato: **PENDING VALIDAZIONE GRAFICA**.

## Contenuto attuale dei prompt
### 01 — Turnaround
- 10 viste complete a 360°;
- INTERMEDIO L + INTERMEDIO R;
- zero crop;
- BASE CLEAN senza accessori dinamici;
- frontale approvato diventa METRIC MASTER.

### 02 — Standing Poses
- 8 pose full-body;
- se troppo affollato dividere 4+4;
- zero crop;
- BASE CLEAN senza accessori dinamici.

### 03 — Floor / Bed Poses
- supina rilassata;
- supina ginocchia piegate;
- supina una gamba piegata;
- laterale L;
- laterale R;
- semi-sdraiata;
- prona rilassata;
- prona testa verso camera;
- corpo intero sempre nel frame;
- BASE CLEAN senza accessori dinamici.

### 04 — Face Expressions
- close-up grandi e coerenti;
- espressioni principali + sad + flirt/sensual/provocative;
- nessun accessorio dinamico visibile;
- volto strutturalmente invariato.

### 05 — Eyes / Mouth / Brows
- occhio L e R separati;
- blink/gaze L/R;
- sopracciglia L/R;
- fonemi e aperture bocca;
- rotation references con INTERMEDIO L/R;
- nessun accessorio dinamico.

### 06 — Hair Physics
- hair_back/front;
- ciocche principali L/R;
- gruppi posteriori per physics;
- riferimenti rotazione L/R + intermedi;
- nessun accessorio dinamico sui capelli.

### 07 — Main Outfit
- outfit statico/deformabile;
- 10 viste coerenti con turnaround;
- zero accessori dinamici visibili;
- base completa sotto i futuri accessori.

### 08 — Alternate Outfits
- un solo outfit per tavola;
- stesso body rig e METRIC MASTER;
- viste L/R + intermedi;
- eventuale supina se necessaria;
- zero accessori dinamici visibili.

### 09 — Body Parts / Dynamic Accessories
- componenti anatomici L/R;
- unica tavola autorizzata a produrre gli accessori dinamici;
- accessori isolati, non indossati;
- varianti per tutti gli angoli/pose richiesti;
- scala, lunghezza e pivot bloccati.

### 10 — Layer Map
- mappa tecnica finale;
- BASE CLEAN;
- body/face/hair/outfit separati;
- accessori dinamici provenienti esclusivamente da Prompt 09;
- anchor, draw order, physics e scale lock documentati.

## Regola immagini / crop
Per tutte le figure full-body:
- testa, capelli, mani, dita visibili, gambe, piedi e scarpe devono essere completamente nel frame;
- almeno 12–15% di margine attorno alla sagoma;
- se lo spazio non basta, dividere la tavola invece di comprimere;
- nessuna posa può essere approvata se una parte del corpo è tagliata.

## Stato delle generazioni recenti
Le generazioni di turnaround effettuate durante la preparazione dei prompt **NON sono approvate come METRIC MASTER**. Sono state prodotte prima di chiudere tutte le regole definitive e non vanno usate come riferimento finale.

Il prossimo `01_Turnaround` deve quindi essere rigenerato usando:
- `LUNA master.png`;
- `00_PROPORTION_LOCK.md` aggiornato;
- `01_Turnaround.md` aggiornato;
- BASE CLEAN senza accessori dinamici;
- 10 viste incluse INTERMEDIO L/R;
- nessun crop.

## Metodo operativo da ora — UNA TAVOLA ALLA VOLTA
Decisione utente: **non generare più una sequenza automatica di tavole senza controllo intermedio**.

Procedura:
1. generare SOLO il Prompt 01;
2. mostrare il risultato;
3. controllare identità, proporzioni, 10 angoli, L/R, intermedi, outfit, assenza accessori dinamici e zero crop;
4. l'utente APPROVA o SCARTA;
5. solo dopo approvazione passare al Prompt 02;
6. ripetere lo stesso processo fino al Prompt 10.

Nessuna tavola successiva viene generata automaticamente senza approvazione della precedente.

## Pipeline Live2D successiva
Dopo approvazione delle tavole:
- L0 master/reference set approvato;
- L1 art separation / PSD Live2D-ready;
- L2 modeling Cubism / ArtMesh / deformers;
- L3 parameters;
- L4 blink/gaze/lip-sync;
- L5 physics capelli/chest/accessori;
- L6 motions/expressions;
- L7 Cubism Native Android;
- L8 benchmark mobile;
- L9 validazione finale.

## Regole per tutti i personaggi futuri
- stessa pipeline Live2D-ready;
- stesso naming standard;
- PROPORTION LOCK tra file;
- intermedi L/R per rotazioni;
- accessori dinamici separati dalle pose/base;
- nessuna funzione dichiarata risolta se è solo disabilitata;
- checkpoint APPROVATO / SCARTATO / PENDING;
- aggiornamento continuità dopo ogni checkpoint rilevante.

## Prossimo passo operativo
**Fermo qui.** Prima di generare altro, il file di continuità è stato aggiornato. Quando si riparte, si ricomincia dal `01_Turnaround.md` aggiornato e si procede **una tavola alla volta**, con approvazione prima della successiva.
