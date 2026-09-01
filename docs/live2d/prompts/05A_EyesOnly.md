# Luna Live2D — Prompt 05A: Eyes Only

## Scopo
Creare ESCLUSIVAMENTE gli occhi di Luna come componenti tecnici separati per blink e gaze. Nessun volto completo, nessun busto, nessun corpo, nessun outfit.

## Reference obbligatorie
1. CLEAN MASTER v1 = reference visiva primaria per forma, colore, stile e identità degli occhi.
2. METRIC MASTER = reference metrica definitiva per dimensione, posizione, distanza interpupillare e anchor.
3. `01A_FaceOverlayAnchors.md` = riferimento per anchor L/R e comportamento sulle rotazioni.

## COMPONENT-ONLY LOCK
Se il componente richiesto è l'occhio, l'output deve contenere SOLO componenti oculari.
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
- pannelli decorativi;
- rettangoli di pelle attorno all'occhio che creerebbero seam quando sovrapposti al FaceBase.

Per il rig finale separare quando tecnicamente utile:
- sclera/bianco dell'occhio;
- iride+pupilla;
- palpebra/eyeline superiore + ciglia;
- palpebra/eyeline inferiore;
- eventuali highlight.
La pelle circostante appartiene al `FaceBase`, non all'asset occhio.

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

## REGOLA DI PRODUZIONE METRICA — OBBLIGATORIA
Il generatore di immagini NON è considerato affidabile per imporre misure numeriche esatte.
Quindi:
1. generare solo il componente visivo, senza quote/testi/righelli numerici;
2. estrarre il componente su trasparenza;
3. misurare la METRIC MASTER;
4. normalizzare deterministicamente il componente alla dimensione/anchor misurati;
5. verificare per overlay;
6. solo dopo marcare APPROVATO.

Qualunque numero stampato dal generatore (`78x32`, `16`, ecc.) è da ignorare finché non coincide con una misura realmente ricavata dalla METRIC MASTER.

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
- sfondo trasparente preferito;
- componenti grandi e puliti;
- nessun volto o pelle circostante non necessaria;
- nessun valore numerico stampato nell'immagine;
- nessun elemento grafico estraneo;
- nessuna dichiarazione di scala valida prima del post-process metrico deterministico.

## Criteri di accettazione
- identità visiva degli occhi coerente con CLEAN MASTER v1;
- L/R distinti;
- scala metrica proporzionale realmente misurata e applicata in post-process;
- anchor compatibili con `01A_FaceOverlayAnchors.md`;
- nessun volto/corpo/pelle rettangolare aggiunta;
- nessun accessorio;
- nessun mirroring come sostituto;
- nessun drift di forma tra stati non dovuto a palpebra/gaze;
- overlay sulla METRIC MASTER senza stretching non uniforme.
