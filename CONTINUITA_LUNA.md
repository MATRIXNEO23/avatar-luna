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

## SCALE LOCK — NUOVO STANDARD DEFINITIVO
Decisione utente: **ogni immagine deve essere normalizzata a una misura standard comune**.

Standard globale ora scritto nel GLOBAL LOCK e nel Prompt 01:
- full-body verticale = **1000 unità** dalla punta più alta dei capelli alla suola più bassa;
- suole sulla baseline `Y=0`;
- punta capelli a `Y=1000` nelle pose verticali;
- scaling esclusivamente uniforme; vietato stirare X/Y separatamente;
- stessa scala relativa di testa, volto, spalle, busto, vita, bacino, arti, mani, piedi, capelli e outfit;
- landmark anatomici coerenti con la METRIC MASTER;
- canvas/risoluzione possono cambiare, ma il soggetto deve essere normalizzato nello stesso sistema metrico;
- Tavola A, Tavola B e posteriore devono essere sovrapponibili per scala dopo normalizzazione;
- ogni nuovo file riparte da CLEAN MASTER v1 / METRIC MASTER, non dalla generazione precedente;
- pose supine/prone/inclinate mantengono le stesse lunghezze segmentali anatomiche: non si forza il bounding-box verticale a 1000;
- close-up/componenti usano scala derivata dalla corrispondente parte della METRIC MASTER;
- accessori Prompt 09 mantengono dimensioni/pivot/anchor nello stesso sistema metrico.

Validazione SCALE LOCK:
1. normalizzare;
2. allineare baseline/asse quando applicabile;
3. overlay con METRIC MASTER/reference corrispondente;
4. SCARTARE se serve deformazione non uniforme o compare drift evidente.

**Importante:** scrivere `1000 unità` nel prompt NON rende automaticamente un'immagine già generata matematicamente normalizzata. Le immagini devono essere realmente normalizzate/post-processate e poi ricontrollate prima dell'uso tecnico.

Commit GLOBAL SCALE LOCK: `b92a789b1492f3181bc233d84fed8227ef61103f`.
Commit Prompt 01 con SCALE LOCK: `4fe6f0908078205823d63e2ccbaf3c4a573c7ad0`.

## OUTFIT LOCK
Prompt base 01–07: stesso outfit statico CLEAN MASTER v1, senza reinterpretazioni:
- top nero;
- bottom nero;
- guanti neri lunghi;
- stivali neri con tacco.

`08_AltOutfits.md` resta FUTURO / NON USARE NELLA BASE.

## ACCESSORI DINAMICI
Gli accessori dinamici NON compaiono nelle pose/base 01–08.

Da produrre solo nel Prompt 09 come asset isolati:
- collane/choker;
- catene;
- pendenti;
- orecchini;
- charms;
- gemme sospese;
- accessori capelli/guanti/stivali con physics indipendente.

Ogni accessorio deve mantenere scala, lunghezza, forma/materiale, lato L/R, pivot e anchor rispetto alla METRIC MASTER. Possono cambiare solo prospettiva, curva, rotazione e deformazione fisica.

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

Regola corrente: **Tavola B non deve contenere un secondo frontale**. Il quinto slot che prima veniva erroneamente duplicato come frontale deve essere il posteriore 180°.

## Stato visuale Prompt 01
- Vecchi turnaround con identità/outfit errati o accessori: SCARTATI.
- CLEAN MASTER v1: APPROVATA come master operativa.
- Tavola A clean generata e accettata per proseguire, ma deve ancora essere sottoposta alla normalizzazione tecnica SCALE LOCK prima di diventare reference metrico definitivo.
- Tavola P separata: superata dalla soluzione attuale che reinserisce il posteriore 180° direttamente nella Tavola B.
- Ultima Tavola B con posteriore + lato destro: PENDING validazione/normalizzazione metrica.
- Nessuna tavola diventa METRIC MASTER finché la normalizzazione reale e il confronto overlay non sono completati.

## OUTPUT LOCK
Per gli asset tecnici:
- sfondo neutro semplice;
- niente pannelli/palette/loghi/diagrammi inutili salvo necessità esplicita;
- nessun crop;
- 12–15% di margine per full-body;
- testa, capelli, mani, gambe, piedi e scarpe interi;
- se lo spazio non basta, dividere in più tavole invece di comprimere.

## Prompt pack
Cartella `docs/live2d/prompts/`:
- `00_PROPORTION_LOCK.md` — GLOBAL LOCK incluso SCALE LOCK;
- `01_Turnaround.md` — turnaround A/B;
- `02_StandingPoses.md`;
- `03_FloorBedPoses.md`;
- `04_FaceExpressions.md`;
- `05_EyesMouth.md`;
- `06_HairPhysics.md`;
- `07_MainOutfit.md`;
- `08_AltOutfits.md` — FUTURO;
- `09_BodyParts_Accessories.md`;
- `10_LayerMap.md`.

Tutti devono ereditare il GLOBAL LOCK e quindi anche SCALE LOCK.

## Metodo operativo
Procedere una tavola/sub-tavola alla volta:
1. partire dalla CLEAN MASTER v1 / METRIC MASTER;
2. generare un solo asset;
3. normalizzare allo standard metrico;
4. controllare identità, proporzioni, scala, outfit, posa/angolo, assenza accessori dinamici e crop;
5. overlay dove applicabile;
6. APPROVATO / SCARTATO / PENDING;
7. aggiornare questo file di continuità;
8. solo dopo passare al successivo.

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
**Prima di Prompt 02:** normalizzare realmente CLEAN MASTER v1, Tavola A e Tavola B allo SCALE LOCK comune, quindi confrontarle per overlay. Solo dopo la validazione metrica il frontale può diventare METRIC MASTER definitiva.