# CONTINUITÀ PROGETTO LUNA

Ultimo aggiornamento: 2026-09-01
Repository: `MATRIXNEO23/avatar-luna`
Branch operativa: `rig-assets-working`
Branch stabile non toccata: `main`
Branch backup: `rig-recovery-backup-2026-09-01`

## Scopo
Laboratorio separato da Neon Tides / Matrix Engine per sviluppare avatar, grafica, rig, Cubism e test Android senza regressioni sul progetto principale.

## Identità canonica
- `LUNA master.png` nella root di `rig-assets-working` è la reference identitaria corrente.
- Priorità: volto > capelli > colori/tratti > proporzioni > outfit > espressione/posa > movimento.
- `luna_08_no_cape.png` è solo fallback storico e NON va usata come base finale.
- Le vecchie pose/character sheet restano reference visive, non sorgenti tecniche automatiche.
- Nessuna nuova immagine generata diventa reference della successiva finché non viene approvata esplicitamente.

## Storico custom rig — SCARTATO COME SOLUZIONE FINALE
### v0.5.0 — SCARTATO
Duplicati/ritagli regionali del full-body: ghosting, duplicazioni e disallineamenti.

### v0.5.1 — SCARTATO
Switch full-body TALK/BLINK e idle automatico: 39.1 FPS medi, p95 33.8 ms, jank 40%, flicker e movimento scattoso.

### v0.5.2 — SCARTATO
Ha nascosto/disabilitato funzioni difettose senza risolverle. Regola permanente: disabilitare un difetto non equivale a correggerlo.

## Decisione finale architetturale — LIVE2D / CUBISM
La soluzione finale deve essere un vero modello Live2D/Cubism, con pipeline riutilizzabile per tutti i personaggi.

Runtime Android preferito: Cubism SDK for Native + OpenGL.

### Target movimento
- movimento fluido e naturale;
- ~60 FPS quando il dispositivo lo consente;
- frame medio idealmente <=16.7 ms;
- p95 indicativamente <=20 ms;
- jank >33 ms idealmente <5%;
- nessun cambio full-body per blink/lip-sync;
- nessun dondolio artificiale dell'intero corpo;
- occhi, bocca, capelli, chest e accessori tramite layer/mesh/physics dedicati.

### Budget mobile
- tetto assoluto avatar: <300 MB RAM;
- target operativo: 150–220 MB per un personaggio attivo;
- volto/capelli fino a 2048x2048 quando necessario;
- corpo/outfit 1024x1024 come target iniziale;
- secondari/accessori 1024x1024 solo se necessario;
- un solo modello attivo alla volta di default.

## Capacità Live2D obbligatorie
- rotazione testa/corpo fluida a sinistra e destra;
- blink vero;
- gaze indipendente;
- lip-sync vero;
- hair physics;
- chest/bust physics leggera;
- accessori dinamici indipendenti;
- espressioni/emozioni tramite deformazioni/parametri, non sprite completi.

## Emozioni / registri richiesti
neutral, happy/smile, shy, angry, surprised, focused, sad/tristezza, flirty/flirt, sensual/sensuale, provocative/sexy, `erotic_explicit` come stato tecnico per adulti selezionato da Matrix Engine secondo contesto.

## File globale lock
`docs/live2d/prompts/00_PROPORTION_LOCK.md`

Il file è stato aggiornato e ora contiene quattro lock permanenti:
1. IDENTITY LOCK;
2. PROPORTION LOCK;
3. OUTFIT LOCK;
4. OUTPUT LOCK;
oltre a ROTATION LOCK e DYNAMIC ACCESSORY LOCK.

## IDENTITY LOCK
Usare sempre `LUNA master.png` come identità primaria. Dopo approvazione del Prompt 01, la frontale approvata diventa `METRIC MASTER`.

Non reinterpretare Luna: volto, occhi viola, carnagione, capelli nero-viola, corporatura, silhouette e stile devono restare coerenti.

## PROPORTION LOCK — TRA FILE DIVERSI
Tutte le tavole devono mantenere:
- rapporto testa/corpo;
- testa/mascella/mento;
- distanza e dimensione occhi;
- collo/spalle;
- busto/vita/fianchi/bacino;
- lunghezza braccia;
- femore/tibia/ginocchia;
- mani/piedi;
- lunghezza totale gambe;
- lunghezza/volume/attaccatura capelli;
- geometria dell'outfit statico.

Per pose supine/prone/laterali si mantengono le lunghezze anatomiche reali senza forzare lo stesso bounding box.

Una tavola con drift evidente viene SCARTATA.

## OUTFIT LOCK — NUOVA REGOLA DEFINITIVA
Per tutti i prompt della base canonica usare ESATTAMENTE lo stesso outfit statico/deformabile di `LUNA master.png` e del Turnaround approvato:
- stessa forma;
- stessa copertura;
- stessi tagli;
- stessi materiali;
- stessa palette;
- stessi guanti/armwear;
- stesse calzature;
- stessi punti di attacco.

Vietato semplificare, aggiungere, togliere o reinterpretare l'outfit statico tra una tavola e l'altra.

`08_AltOutfits.md` è l'unica eccezione concettuale, ma è stato marcato **FUTURO / NON USARE NELLA BASE**. Quando verrà usato, un solo outfit alternativo per ciclo e identico in tutte le sue viste.

## ROTATION LOCK — L/R + FRAME INTERMEDI
Set completo di riferimento:
1. 0° frontale;
2. 22.5° L — INTERMEDIO L;
3. 45° L;
4. 90° L;
5. 135° L;
6. 180° retro;
7. 135° R;
8. 90° R;
9. 45° R;
10. 22.5° R — INTERMEDIO R.

INTERMEDIO L e INTERMEDIO R si aggiungono alle viste principali. Destra e sinistra devono essere realmente disegnate; niente mirroring automatico come sostituto.

## ACCESSORI DINAMICI — REGOLA DEFINITIVA
Se un oggetto deve muoversi indipendentemente dal corpo, NON deve comparire nelle pose/base dei Prompt 01–08.

Quindi 01–08 devono essere BASE CLEAN e privi di:
- collane/choker dinamici;
- catene;
- pendenti;
- gemme sospese;
- orecchini;
- charms;
- accessori capelli mobili;
- bracciali/pendenti mobili;
- accessori stivali mobili;
- qualunque oggetto con physics indipendente.

La pelle, i capelli e l'outfit sotto tali oggetti devono essere completamente disegnati.

Gli accessori dinamici vengono prodotti SOLO nel Prompt 09 come asset isolati.

### Accessory scale lock
Ogni accessorio deve mantenere tra tutte le varianti:
- stessa dimensione relativa alla METRIC MASTER;
- stessa lunghezza;
- stessa forma/materiale;
- stesso punto di ancoraggio/pivot;
- stesso lato L/R.

Possono cambiare solo prospettiva, curva, rotazione e deformazione fisica dovute a posa/movimento/gravità.

### Varianti obbligatorie Prompt 09
Per ogni accessorio rilevante:
- tutte le 10 varianti angolari del turnaround, inclusi INTERMEDIO L/R;
- varianti supina, prona, laterale L/R, semi-sdraiata per oggetti sensibili alla gravità;
- ulteriori pose solo quando necessarie;
- componenti L/R separati quando asimmetrici.

Gli accessori devono essere mostrati isolati, NON montati sopra Luna.

## OUTPUT LOCK — NUOVA REGOLA DEFINITIVA
I prompt devono produrre SOLO ciò che serve alla funzione tecnica richiesta.

Vietati salvo richiesta specifica:
- pannelli informativi decorativi;
- palette colori;
- loghi;
- layout da concept sheet;
- diagrammi extra;
- testi e label artistiche;
- elementi inventati per riempire spazio.

Usare sfondo neutro semplice e dedicare massimo spazio alle figure/componenti.

Per full-body:
- nessun crop;
- 12–15% di margine;
- testa, capelli, mani, gambe, piedi e scarpe completamente visibili;
- se troppe figure non entrano, dividere in più tavole coordinate alla stessa scala.

## Prompt pack corrente
Cartella: `docs/live2d/prompts/`

- `00_PROPORTION_LOCK.md` — global lock aggiornato;
- `01_Turnaround.md` — turnaround 360° pulito;
- `02_StandingPoses.md` — standing poses;
- `03_FloorBedPoses.md` — floor/bed poses;
- `04_FaceExpressions.md` — espressioni facciali;
- `05_EyesMouth.md` — occhi/bocca/sopracciglia + rotazione testa;
- `06_HairPhysics.md` — capelli/physics;
- `07_MainOutfit.md` — outfit canonico;
- `08_AltOutfits.md` — FUTURO / NON USARE NELLA BASE;
- `09_BodyParts_Accessories.md` — body parts + accessori dinamici isolati;
- `10_LayerMap.md` — mappa tecnica finale.

## Aggiornamento prompt dopo errore Turnaround
Tutti i prompt sono stati corretti per evitare gli errori osservati nella generazione precedente:
- identità più rigida;
- proporzioni bloccate tra file;
- stesso outfit canonico statico tra tutte le tavole della base;
- nessun accessorio dinamico nelle pose/base;
- output privo di pannelli/palette/loghi inutili;
- divisione in più tavole quando troppe figure ridurrebbero leggibilità;
- L/R e intermedi espliciti.

### Prompt 01 aggiornato
Il Turnaround viene ora diviso obbligatoriamente in due tavole coordinate alla stessa scala:

Tavola A:
- 0°;
- 22.5° L;
- 45° L;
- 90° L;
- 135° L.

Tavola B:
- 180°;
- 135° R;
- 90° R;
- 45° R;
- 22.5° R.

Solo figure, stesso outfit canonico, nessun accessorio dinamico, nessun pannello extra.

### Prompt 02 aggiornato
8 standing poses divise in 4+4, stesso outfit canonico, nessun accessorio dinamico.

### Prompt 03 aggiornato
8 floor/bed poses divise in 4+4, stesso outfit canonico, nessun accessorio dinamico.

### Prompt 04 aggiornato
Close-up facciali; se l'outfit entra nell'inquadratura deve essere esattamente quello canonico; nessun accessorio dinamico.

### Prompt 05 aggiornato
Componenti facciali L/R + rotazione testa; se l'outfit è visibile deve restare quello canonico; nessun accessorio dinamico.

### Prompt 06 aggiornato
Capelli e reference angolari; stesso outfit canonico se visibile; nessun accessorio capelli dinamico.

### Prompt 07 aggiornato
Outfit canonico bloccato esattamente alla reference; accessori dinamici esclusi.

### Prompt 08 aggiornato
Marcato FUTURO / NON USARE NELLA BASE. Non deve interrompere la coerenza dell'outfit canonico durante la costruzione base.

### Prompt 09 aggiornato
Unico prompt che produce accessori dinamici; oggetti isolati con scale/forme/pivot bloccati e varianti angolari/gravità.

### Prompt 10 aggiornato
Layer map basata su BASE CLEAN con stesso outfit canonico e accessori provenienti esclusivamente dal Prompt 09.

## Stato generazioni Prompt 01
### Tentativi precedenti — NON APPROVATI
Le generazioni precedenti non sono METRIC MASTER.

### Ultimo Turnaround generato — SCARTATO
Motivi:
- solo 7 viste invece delle 10 richieste;
- sequenza angolare L/R incompleta/errata;
- INTERMEDIO L/R non corretti;
- reinterpretazione di Luna rispetto a `LUNA master.png`;
- drift di proporzioni tra viste;
- outfit reinterpretato;
- presenza di elementi pendenti/decorativi incompatibili con BASE CLEAN;
- troppo spazio sprecato in pannelli, palette, diagrammi e testo invece delle figure.

Questo risultato NON deve essere usato come METRIC MASTER o reference successiva.

## Metodo operativo — UNA TAVOLA ALLA VOLTA
Decisione utente definitiva:
1. generare una sola tavola/sub-tavola;
2. mostrarla;
3. controllare identità, proporzioni, outfit, angolo/posa, assenza accessori dinamici, zero crop e assenza elementi extra;
4. utente APPROVA o SCARTA;
5. solo dopo approvazione procedere alla tavola successiva.

Per Prompt 01 si parte quindi dalla **Tavola A** soltanto. La Tavola B viene generata solo dopo approvazione della Tavola A.

## Pipeline Live2D successiva
Dopo approvazione del reference set:
- L0 master/reference set;
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
- stesso naming;
- identity/proportion/outfit lock;
- intermedi L/R per rotazioni;
- accessori dinamici separati dalle pose/base;
- output tecnico minimale senza mega-sheet decorate;
- checkpoint APPROVATO / SCARTATO / PENDING;
- aggiornamento continuità dopo ogni checkpoint rilevante.

## Prossimo passo operativo
Generare SOLO `01_Turnaround` — **Tavola A** con 5 viste: 0°, 22.5° L, 45° L, 90° L, 135° L. Usare `LUNA master.png`, stesso outfit canonico statico, nessun accessorio dinamico, nessun pannello extra, zero crop. Attendere validazione prima della Tavola B.