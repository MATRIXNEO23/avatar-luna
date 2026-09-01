# Luna Live2D — Prompt 02: Head / Upper-Body Pitch

## Scopo
Creare le reference verticali indispensabili per una deformazione fluida di testa, collo e parte alta del torso in Live2D/Cubism. Questo set NON sostituisce il turnaround A/B e NON deve rigenerarlo.

## Reference obbligatorie
1. **CLEAN MASTER v1** = unica reference visiva primaria per identità, volto, occhi, capelli, corporatura, outfit, materiali e colori.
2. Turnaround A/B approvato = reference secondaria SOLO per scala, baseline e coerenza geometrica.
3. Ogni vista di questo file deve ripartire direttamente dalla CLEAN MASTER v1, non da una generazione precedente.

## Lock obbligatori
Applicare integralmente `00_PROPORTION_LOCK.md`:
- IDENTITY LOCK;
- PROPORTION LOCK;
- SCALE LOCK;
- OUTFIT LOCK;
- DYNAMIC ACCESSORY LOCK;
- anti-drift.

ZERO accessori dinamici visibili.
Se l'outfit entra nell'inquadratura deve essere esattamente quello della CLEAN MASTER v1.

## Scala tecnica
Questo è un set **head-to-hips / upper-body**, non full-body.
La scala deriva dalla METRIC MASTER:
- stessa altezza e larghezza testa;
- stessa distanza occhi/naso/bocca;
- stesso collo;
- stessa larghezza spalle;
- stesso volume busto/torso;
- stessa attaccatura, volume e silhouette dei capelli;
- stessa linea di crop per tutte le viste;
- scaling solo uniforme;
- nessuna deformazione non uniforme per far combaciare le immagini.

## Tavola PITCH-A — 5 viste
Generare SOLO queste 5 viste, tutte frontali in yaw e senza roll:
1. **DOWN 30°** — testa/upper torso inclinati verso il basso;
2. **DOWN 15°** — intermedio verso il basso;
3. **NEUTRAL 0°** — frontale neutra;
4. **UP 15°** — intermedio verso l'alto;
5. **UP 30°** — testa/upper torso inclinati verso l'alto.

La variazione deve essere solo sul pitch verticale. NON introdurre rotazione sinistra/destra e NON inclinare lateralmente la testa.

## Output
- 5 pannelli tecnici coordinati;
- stessa scala e stesso crop head-to-hips;
- sfondo neutro semplice;
- nessun pannello decorativo, palette, logo o elemento extra;
- volto sufficientemente grande e definito per leggere occhi, naso, bocca, mandibola e deformazione del collo;
- capelli fedeli alla CLEAN MASTER v1 e coerenti con la gravità, senza cambiare taglio/stile;
- qualità reference alta, ma senza dettagli ornamentali inutili che aumentino il costo del futuro texture atlas mobile.

## Criteri di accettazione
- stessa Luna della CLEAN MASTER v1;
- stesse proporzioni e stesso outfit;
- ZERO accessori dinamici;
- tutte e 5 le inclinazioni corrette;
- nessun yaw/roll accidentale;
- nessun drift del volto, cranio, collo, spalle o busto;
- stessa scala/crop in tutte le viste;
- nessun arto o dettaglio anatomico duplicato/fuso;
- nessuna reinterpretazione di capelli o outfit.

## Uso nel rig
Queste reference servono per `ParamAngleY` / pitch verticale e per costruire keyform/interpolazione fluida. Dopo approvazione di PITCH-A verrà creato un set diagonale separato con combinazioni X+Y, senza rifare A/B.