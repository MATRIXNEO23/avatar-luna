# CONTINUITÀ PROGETTO LUNA

Ultimo aggiornamento: 2026-09-01
Repository: `MATRIXNEO23/avatar-luna`
Branch operativa: `rig-assets-working`
Branch stabile non toccata: `main`
Branch backup: `rig-recovery-backup-2026-09-01`

## Scopo
Laboratorio separato da Neon Tides / Matrix Engine per sviluppare avatar, grafica, rig Live2D/Cubism e test Android senza regressioni sul progetto principale. La pipeline deve essere riutilizzabile per tutti i personaggi futuri.

## Stato architetturale
Soluzione finale: vero **Live2D/Cubism**, non custom sprite rig.
Runtime Android preferito: **Cubism SDK for Native + OpenGL**.

Target mobile:
- ~60 FPS quando possibile;
- frame medio idealmente <=16.7 ms;
- p95 indicativamente <=20 ms;
- jank >33 ms idealmente <5%;
- tetto avatar <300 MB RAM;
- target operativo 150–220 MB per un personaggio attivo;
- volto/capelli fino a 2048² quando necessario;
- corpo/outfit 1024² come target iniziale;
- un solo modello attivo alla volta di default.

Capacità obbligatorie:
- rotazione testa/corpo fluida L/R;
- blink vero;
- gaze indipendente;
- lip-sync vero;
- hair physics;
- chest/bust physics leggera;
- accessori dinamici indipendenti;
- espressioni/emozioni tramite parametri/deformazioni, non cambio sprite completo.

## Storico custom rig — SCARTATO
- v0.5.0: ritagli/duplicati regionali → ghosting, duplicazioni, disallineamenti.
- v0.5.1: switch full-body TALK/BLINK → 39.1 FPS, p95 33.8 ms, jank 40%, flicker.
- v0.5.2: difetti nascosti/disabilitati, non risolti.

Regola permanente: disabilitare una funzione difettosa NON equivale a correggerla.

## Master canonica corrente — CLEAN MASTER v1
La master operativa è la **CLEAN MASTER v1 approvata il 2026-09-01**, ottenuta rimuovendo gli accessori dinamici dalla vecchia Luna canonica.

Caratteristiche da mantenere:
- identità/volto di Luna;
- occhi viola;
- capelli lunghissimi, voluminosi, ondulati nero-viola;
- corporatura e silhouette approvate;
- top nero semplice aderente;
- bottom nero semplice aderente;
- guanti lunghi neri;
- stivali neri con tacco;
- ZERO collane, choker, catene, pendenti, orecchini, charms, gemme sospese o altri accessori dinamici.

La precedente `LUNA master.png` accessoriata è **DEPRECATA come master operativa** per i Prompt 01–08. Resta solo reference storica per ricostruire gli accessori nel Prompt 09.

## GLOBAL LOCK
File: `docs/live2d/prompts/00_PROPORTION_LOCK.md`.

Lock obbligatori per tutti i prompt:
1. IDENTITY LOCK;
2. PROPORTION LOCK;
3. **SCALE LOCK / NORMALIZZAZIONE**;
4. OUTFIT LOCK;
5. DYNAMIC ACCESSORY LOCK;
6. ROTATION LOCK;
7. OUTPUT LOCK;
8. anti-drift + validazione.

### IDENTITY LOCK
Non reinterpretare Luna. Volto, occhi, carnagione, capelli, corporatura, silhouette e stile devono derivare dalla CLEAN MASTER v1.

### PROPORTION LOCK
Mantenere tra file diversi: rapporto testa-corpo, spalle, collo, busto, vita, fianchi, bacino, braccia, femore, tibia, mani, piedi, volume/lunghezza capelli e geometria outfit.

## SCALE LOCK — SISTEMA METRICO PROPORZIONALE DEFINITIVO
Ogni asset appartiene allo stesso sistema metrico globale derivato dalla METRIC MASTER.
- full-body = **1000 unità** punta capelli → suola;
- un asset parziale usa solo l'intervallo reale di unità che occupa nella master;
- nessun close-up/occhio/bocca/mano viene arbitrariamente riscalato a 1000;
- valori locali esatti devono essere misurati dalla METRIC MASTER, non inventati;
- canvas e risoluzione possono cambiare, la scala anatomica no;
- scaling solo uniforme;
- overlay/landmark devono combaciare senza stretching X/Y.

## OUTFIT LOCK
Prompt base 01–07: stesso outfit statico CLEAN MASTER v1, senza reinterpretazioni:
- top nero;
- bottom nero;
- guanti neri lunghi;
- stivali neri con tacco.

`08_AltOutfits.md` resta FUTURO / NON USARE NELLA BASE.

## ACCESSORI DINAMICI
Gli accessori dinamici NON compaiono nelle pose/base 01–08.
Da produrre solo nel Prompt 09 come asset isolati, con scala/pivot/anchor derivati dalla METRIC MASTER.

## ROTATION LOCK / TURNAROUND
Set di riferimento:
- 0° frontale;
- 22.5° L;
- 45° L;
- 90° L;
- 135° L;
- 180° posteriore;
- 135° R;
- 90° R;
- 45° R;
- 22.5° R.

Destra e sinistra devono essere realmente disegnate; niente mirroring automatico come sostituto.

### Prompt 01 corrente
Tavola A:
- 0°;
- 22.5° L;
- 45° L;
- 90° L;
- 135° L.

Tavola B:
- 180° POSTERIORE;
- 135° R;
- 90° R;
- 45° R;
- 22.5° R.

## Stato visuale Prompt 01
- Vecchi turnaround con identità/outfit errati o accessori: SCARTATI.
- CLEAN MASTER v1: APPROVATA come master operativa.
- Tavola A clean corrente: ACCETTATA per proseguire, da normalizzare/verificare metricamente prima dell'uso tecnico definitivo.
- Tavola B clean corrente: ACCETTATA per proseguire, da normalizzare/verificare metricamente prima dell'uso tecnico definitivo.
- Tavole C/D/E generate dopo A/B: **SCARTATE / NON USARE**.
- **NON rifare A/B** a ogni nuovo passaggio; restano reference di rotazione orizzontale.

## FACE OVERLAY / ANCHOR LOCK — NUOVO
Creato `docs/live2d/prompts/01A_FaceOverlayAnchors.md`.
Commit: `0abe9d0ed46539e7e640ac0b470ca79b8425c009`.

Decisione tecnica:
- A/B sono reference geometriche, NON sprite finali runtime;
- nel PSD/rig finale `FaceBase`, `EyeL`, `EyeR`, `BrowL`, `BrowR` e componenti della bocca sono layer/ArtMesh separati;
- occhi e bocca vengono **sovrapposti tramite anchor metrici derivati dalla METRIC MASTER**;
- gli anchor seguono il `Head Deformer`, quindi non restano fissi sul canvas;
- su 22.5°/45°/90° L/R posizione, compressione prospettica e occlusione vengono gestite con keyform/deformers/mask/opacity;
- a 90° l'occhio lontano può essere quasi o totalmente occultato; a 135°/180° gli elementi frontali possono scomparire;
- L/R restano asset distinti, niente mirroring come sostituto;
- **A/B non devono essere rigenerate** per aggiungere questa funzione: si estraggono landmark/anchor dalle reference accettate.

Landmark minimi da registrare sulla frontale e rendere tracciabili sulle rotazioni:
- centro/angoli occhi L/R;
- centro iride/pupilla L/R;
- pivot palpebre L/R;
- centro sopracciglia L/R;
- angoli e centro bocca;
- linee labbro superiore/inferiore;
- punta naso;
- mento;
- asse verticale volto.

## Asset necessari per massima fluidità — ORDINE TECNICO
1. Turnaround orizzontale A/B — FATTO come reference; non rigenerare.
2. Head / Upper-Body Pitch — PENDING validazione tecnica.
3. Diagonali X+Y testa/upper-body.
4. Occhi + sopracciglia separati con scala/anchor metrici.
5. Bocca / lip-sync separata con scala/anchor metrici.
6. Espressioni facciali.
7. Hair separation + physics.
8. Torso / breath / chest secondary motion.
9. Standing gestures/body deformation.
10. Floor/bed/reclined references se necessarie alle scene.
11. Main outfit separation/deformation.
12. Hands/body parts tecnici.
13. Dynamic accessories separati.
14. Layer map / PSD Live2D-ready.
15. Cubism modeling + ArtMesh/deformers/parameters.
16. Physics + motions + expressions.
17. Android Cubism Native + benchmark RAM/FPS/jank.
18. Validazione finale visuale e prestazionale.

## Stato asset facciali correnti
- Pitch generato: **PENDING**, non approvare automaticamente; le misure locali devono essere realmente ricavate dalla METRIC MASTER.
- Tavola occhi generata: **PENDING/DA VERIFICARE**; valori numerici mostrati dall'immagine non sono validi finché non misurati sulla METRIC MASTER.
- Regola utente: se serve solo un componente, generare solo quel componente alla sua scala metrica proporzionale; niente corpo/volto completo inutile.

## OUTPUT LOCK
- sfondo neutro semplice;
- niente pannelli/palette/loghi/diagrammi inutili salvo necessità tecnica;
- nessun crop per full-body;
- crop tecnico ammesso per parti/close-up se coerente e metrico;
- se lo spazio non basta, dividere in più tavole invece di comprimere.

## Prompt pack
Cartella `docs/live2d/prompts/`:
- `00_PROPORTION_LOCK.md` — GLOBAL LOCK;
- `01_Turnaround.md` — turnaround A/B;
- `01A_FaceOverlayAnchors.md` — anchor per occhi/bocca/sopracciglia sulle rotazioni;
- `02_HeadUpperBodyPitch.md` — pitch verticale rig-critical;
- `02_StandingPoses.md` — standing poses, più avanti;
- `03_FloorBedPoses.md`;
- `04_FaceExpressions.md`;
- `05_EyesMouth.md`;
- `06_HairPhysics.md`;
- `07_MainOutfit.md`;
- `08_AltOutfits.md` — FUTURO;
- `09_BodyParts_Accessories.md`;
- `10_LayerMap.md`.

## Metodo operativo
Procedere una tavola/sub-tavola alla volta:
1. partire dalla CLEAN MASTER v1 / METRIC MASTER;
2. NON rifare asset già accettati se non richiesto;
3. generare un solo nuovo asset/componente;
4. normalizzare allo standard metrico pertinente;
5. controllare identità, proporzioni, scala, anchor, outfit, posa/angolo, assenza accessori dinamici e crop;
6. overlay dove applicabile;
7. APPROVATO / SCARTATO / PENDING;
8. aggiornare questo file di continuità;
9. solo dopo passare al successivo.

## Pipeline Live2D successiva
Dopo reference set approvato e normalizzato:
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

## Prossimo passo operativo
Prima di generare altri occhi/bocca, fissare/estrarre gli **anchor metrici facciali** dalla METRIC MASTER/A-B; poi generare i componenti separati alla scala reale corrispondente, senza rigenerare A/B.
