# Luna Live2D — Prompt 07: Main Outfit

## Scopo
Creare il foglio tecnico completo dell’outfit canonico di Luna per separazione in layer statici, deformabili e dinamici.

## Prompt
Usa `LUNA master.png` e la METRIC MASTER approvata. Mantieni lo stesso corpo e le stesse proporzioni. L'outfit canonico nero/viola deve conservare forma, materiali, copertura e punti di ancoraggio.

PROPORTION LOCK: l'abbigliamento deve aderire alla stessa anatomia in ogni vista.

Per coerenza con il turnaround, crea reference dell'outfit su:
1. frontale 0°;
2. INTERMEDIO L ~22.5°;
3. 3/4 L ~45°;
4. profilo L ~90°;
5. 3/4 posteriore L ~135°;
6. retro 180°;
7. 3/4 posteriore R ~135°;
8. profilo R ~90°;
9. 3/4 R ~45°;
10. INTERMEDIO R ~22.5°.

Se 10 viste non entrano grandi, dividere in 5+5. Nessun crop.

### Outfit statico/deformabile
Mostra come componenti separati, grandi e puliti:
- top/chest piece;
- bottom/waist piece;
- guanto/armwear L;
- guanto/armwear R;
- stivale L;
- stivale R;
- eventuali pannelli o parti tessili deformabili realmente presenti.

### Accessori dinamici — NON fusi
Collana/choker, catena centrale, catene torso, catene vita/fianchi, pendenti, gemme sospese, charms, orecchini, piccoli elementi oscillanti e decorazioni mobili NON devono essere dipinti dentro l'outfit statico.

La base dell'outfit deve essere completa sotto ciascun accessorio.

Per **ognuna delle 10 viste**, inclusi INTERMEDIO L/R, crea una **ACCESSORY POSITION MAP** con:
- posizione e punto di ancoraggio di ogni oggetto;
- prospettiva corretta;
- lato L/R corretto;
- occlusione davanti/dietro all'outfit e al corpo;
- lunghezza e dimensioni costanti;
- orientamento coerente con gravità.

Non riutilizzare una catena frontale come se fosse identica in profilo o retro.

## Criteri di accettazione
- outfit base identico in tutte le viste;
- INTERMEDIO L/R presenti;
- nessun crop;
- dettagli statici/deformabili separati;
- tutti gli oggetti dinamici separati dall'outfit base;
- geometria sottostante ricostruita;
- ACCESSORY POSITION MAP per ogni vista;
- nessun elemento inventato;
- compatibilità con il body rig canonico e target mobile.