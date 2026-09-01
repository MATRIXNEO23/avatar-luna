# Luna Live2D — Prompt 03: Eyes only

## Scopo
Creare SOLO gli occhi tecnici separati L/R necessari a Live2D/Cubism per gaze, blink e deformazione palpebre. Non generare volto intero, testa, torso o corpo.

## Reference primaria
- CLEAN MASTER v1 = unica sorgente visiva per forma occhi, colore viola, eyeliner/ciglia, proporzioni e distanza L/R.
- METRIC MASTER = sorgente metrica per posizione e dimensione.
- NON derivare gli occhi da tavole generate precedenti se differiscono dalla CLEAN MASTER.

## Lock
Applicare `00_PROPORTION_LOCK.md`, in particolare IDENTITY LOCK, PROPORTION LOCK e SCALE LOCK proporzionale.

## METRICA LOCALE OBBLIGATORIA
Il full-body della METRIC MASTER resta 1000 unità capelli→suola.
Gli occhi NON sono 1000 unità.

Per ogni occhio mantenere esattamente, rispetto alla METRIC MASTER:
- larghezza reale dell'apertura palpebrale;
- altezza reale dell'apertura;
- dimensione iride e pupilla;
- spessore/forma eyeliner e ciglia;
- distanza tra occhio sinistro e destro;
- altezza comune sul volto;
- posizione del centro iride in neutro;
- rapporto L/R non specchiato automaticamente.

I valori numerici locali devono essere misurati dalla METRIC MASTER prima dell'uso tecnico. Se non misurati, indicare `MASTER-DERIVED LOCAL SCALE` senza inventare numeri.

## Tavola EYES-A — struttura e blink
Generare SOLO componenti oculari isolati, grandi e nitidi, su sfondo neutro/trasparente se possibile.

Occhio sinistro e destro separati, entrambi realmente disegnati:
1. OPEN neutral;
2. 75% open;
3. 50% open;
4. 25% open;
5. CLOSED/blink.

Ogni stato deve mantenere la stessa larghezza metrica dell'occhio e cambiare solo la geometria necessaria delle palpebre/ciglia.

## Tavola EYES-B — gaze
Dopo approvazione di EYES-A, creare separatamente per L e R:
- center;
- left;
- right;
- up;
- down;
- up-left;
- up-right;
- down-left;
- down-right.

Nel gaze, la forma base dell'occhio resta coerente; si spostano iride/pupilla e solo le micro-deformazioni necessarie.

## Layer utili per il rig
Quando si passa alla separazione PSD/Cubism, prevedere per L e R:
- sclera;
- iris;
- pupil;
- highlight;
- upper lid/eyeline;
- lower lid;
- lashes;
- optional shadow/wetline se utile.

## Criteri di accettazione
- occhi riconoscibilmente identici alla CLEAN MASTER;
- L/R separati e non ottenuti con semplice mirroring;
- scala locale derivata dalla METRIC MASTER;
- nessun numero metrico inventato;
- nessun volto/corpo generato inutilmente;
- nessun accessorio;
- nessun drift di colore, forma, distanza o proporzioni;
- componenti abbastanza definiti per il rig ma senza sovradimensionare inutilmente le future texture mobile.
