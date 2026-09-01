# Luna Live2D — Prompt 05A: Eyes Only

## Scopo
Creare ESCLUSIVAMENTE gli occhi di Luna come componenti tecnici separati per blink e gaze. Nessun volto completo, nessun busto, nessun corpo, nessun outfit.

## Reference obbligatorie
1. CLEAN MASTER v1 = reference visiva primaria per forma, colore, stile e identità degli occhi.
2. METRIC MASTER = reference metrica per dimensione, posizione, distanza interpupillare e anchor.
3. `01A_FaceOverlayAnchors.md` = riferimento per anchor L/R e comportamento sulle rotazioni.

## COMPONENT-ONLY LOCK
Se il componente richiesto è l'occhio, l'output deve contenere SOLO occhi.
È vietato aggiungere:
- volto completo;
- capelli;
- sopracciglia;
- naso;
- bocca;
- collo;
- busto;
- outfit;
- accessori;
- pannelli decorativi.

## SCALE LOCK PROPORZIONALE
Gli occhi NON sono 1000 unità.
Devono mantenere la scala reale derivata dalla METRIC MASTER full-body da 1000 unità.

Misurare dalla METRIC MASTER, senza inventare valori:
- larghezza occhio L;
- altezza occhio L;
- larghezza occhio R;
- altezza occhio R;
- distanza tra i centri oculari;
- posizione relativa rispetto all'asse volto;
- pivot palpebra superiore/inferiore;
- centro iride/pupilla;
- anchor interno/esterno.

Il canvas può ingrandire i componenti per leggibilità, ma la trasformazione verso le unità master deve essere uniforme e tracciabile.
Nessuno stretching X/Y.

## L/R SEPARATI
Generare occhio sinistro e destro come asset distinti. NON usare un solo occhio specchiato per sostituire l'altro.

## Tavola EYES-A — apertura / blink
Per L e R creare separatamente:
- open 100%;
- open 75%;
- open 50%;
- open 25%;
- closed 0%.

## Tavola EYES-B — gaze
Per L e R creare separatamente:
- center;
- left;
- right;
- up;
- down;
- up-left;
- up-right;
- down-left;
- down-right.

## Output
- solo componenti occhi;
- sfondo neutro o trasparente;
- componenti grandi e puliti;
- stessa scala locale derivata dalla METRIC MASTER;
- nessun valore numerico inventato stampato nell'immagine;
- nessun elemento grafico estraneo.

## Criteri di accettazione
- identità visiva degli occhi coerente con CLEAN MASTER v1;
- L/R distinti;
- scala metrica proporzionale reale;
- anchor compatibili con `01A_FaceOverlayAnchors.md`;
- nessun volto/corpo aggiunto;
- nessun accessorio;
- nessun mirroring come sostituto;
- nessun drift di forma tra stati non dovuto a palpebra/gaze.
