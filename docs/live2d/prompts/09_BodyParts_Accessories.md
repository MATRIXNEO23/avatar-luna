# Luna Live2D — Prompt 09: Body Parts / Dynamic Accessories

## Scopo
Creare separatamente componenti anatomici tecnici e TUTTI gli accessori dinamici che non devono comparire nelle pose/base dei Prompt 01–08.

## Regole obbligatorie
Applica `00_PROPORTION_LOCK.md`.
Usa `LUNA master.png` + METRIC MASTER approvata.

## Parti anatomiche
Creare componenti tecnici L/R separati per:
- mani;
- braccia;
- gambe;
- piedi;
- varianti realmente necessarie al rig.

Mai usare mirroring automatico come sostituto del lato opposto.

## Accessori dinamici canonici
Creare separatamente, uno per volta o in piccoli gruppi leggibili:
- earring_L;
- earring_R;
- necklace/choker dinamico;
- center_chain;
- pendant/gem center;
- torso chains;
- waist/hip chains L/R;
- side pendant L/R;
- wrist/arm charms L/R;
- hair charms/accessories mobili;
- boot charms/accessories mobili;
- altri oggetti sospesi presenti realmente in `LUNA master.png`.

Gli accessori devono essere oggetti puliti, senza pelle, capelli o outfit fusi nel raster.

## Varianti di posizione obbligatorie per ogni accessorio
Produrre la stessa geometria/scala dell'oggetto nelle posizioni:
- 0° frontale;
- 22.5° L;
- 45° L;
- 90° L;
- 135° L;
- 180° retro;
- 135° R;
- 90° R;
- 45° R;
- 22.5° R.

Per gli oggetti sensibili alla gravità aggiungere inoltre varianti per:
- supina;
- prona;
- laterale L;
- laterale R;
- semi-sdraiata.

Le varianti devono mantenere IDENTICI dimensione, lunghezza, materiale, forma base e punto di ancoraggio. Possono cambiare solo prospettiva, curva e orientamento coerente con gravità/posa.

## Output
Gli accessori devono essere mostrati SEPARATI, non montati sulle pose complete di Luna. Usare sfondo neutro semplice e molto spazio attorno ai componenti. Niente pannelli decorativi, loghi o palette.

## Criteri di accettazione
- L/R separati;
- tutti gli accessori dinamici assenti dai Prompt 01–08 e presenti qui;
- stessa scala dell'oggetto tra tutte le varianti;
- nessun pezzo della base fuso negli accessori;
- nessun oggetto inventato;
- nessun crop;
- componenti abbastanza grandi per ArtMesh/physics.