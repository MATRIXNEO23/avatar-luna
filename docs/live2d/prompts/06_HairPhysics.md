# Luna Live2D — Prompt 06: Hair / Physics

## Scopo
Creare riferimenti puliti per separare i capelli di Luna in layer fisici Live2D e mantenere la loro coerenza durante rotazioni L/R.

## Prompt
Usa `LUNA master.png` e la METRIC MASTER approvata. Mantieni ESATTAMENTE colore nero-viola, lunghezza, volume, attaccatura, frangia, ciocche frontali e stile ondulato. NON accorciare, lisciare o reinterpretare la pettinatura.

Crea una tavola tecnica dedicata SOLO ai capelli e ai loro layer.

Mostra reference testa/spalle per:
1. frontale 0°;
2. INTERMEDIO L ~22.5°;
3. 3/4 L ~45°;
4. profilo L ~90°;
5. retro;
6. profilo R ~90°;
7. 3/4 R ~45°;
8. INTERMEDIO R ~22.5°.

Gli intermedi devono essere presenti su entrambi i lati e non ottenuti da semplice mirroring.

Mostra inoltre componenti separati grandi:
- hair_back completo;
- hair_front completo;
- frangia/front bangs;
- ciocca laterale L principale;
- ciocca laterale R principale;
- 3–5 gruppi di ciocche lunghe posteriori per physics;
- ciocche secondarie di volume;
- piccoli gruppi vicino al viso solo se utili al movimento.

Ogni componente deve essere completo, con margine, senza sovrapposizioni o contaminazioni. Le parti devono avere radice stabile, zona deformabile e estremità libera per spring/physics.

### Accessori capelli
Qualunque fermaglio, charm, pendente, catena o gioiello applicato ai capelli deve essere un **layer dinamico separato**. NON fonderlo con hair_front, hair_back o ciocche.

Per ogni angolo sopra elencato, inclusi INTERMEDIO L/R, deve esistere un riferimento della posizione dell'accessorio capelli con:
- punto di ancoraggio costante;
- prospettiva corretta;
- lato L/R corretto;
- occlusione corretta rispetto alle ciocche;
- risposta alla gravità coerente.

La base capelli deve essere completa sotto l'accessorio.

## Criteri di accettazione
- pettinatura identica alla Luna canonica;
- front/back/L/R/intermedi coerenti;
- hair_back e hair_front separabili;
- ciocche fisiche complete;
- accessori capelli non fusi;
- position map degli accessori per ogni angolo;
- nessuna ciocca tagliata;
- numero di layer controllato per il target mobile sotto 300 MB.