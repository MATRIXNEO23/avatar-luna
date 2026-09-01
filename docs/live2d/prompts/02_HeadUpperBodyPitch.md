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
- SCALE LOCK proporzionale;
- OUTFIT LOCK;
- DYNAMIC ACCESSORY LOCK;
- anti-drift.

ZERO accessori dinamici visibili.
Se l'outfit entra nell'inquadratura deve essere esattamente quello della CLEAN MASTER v1.

## Scala tecnica proporzionale
Questo è un set **head-to-hips / upper-body**, non full-body.

Regola fondamentale:
- NON assegnare 1000 unità a questo crop;
- la METRIC MASTER full-body resta 1000 unità punta capelli → suola;
- questo asset deve occupare **esattamente il numero di unità master corrispondente alla porzione punta capelli → landmark bacino**;
- quel valore deve essere misurato dalla METRIC MASTER, non inventato;
- tutte le 5 viste usano lo stesso intervallo metrico, stesso crop tecnico e stessi landmark;
- scaling solo uniforme;
- nessuna deformazione X/Y separata per far combaciare le viste.

Devono restare invariati rispetto alla METRIC MASTER:
- altezza e larghezza testa;
- distanza occhi/naso/bocca;
- collo;
- larghezza spalle;
- volume busto/torso;
- posizione relativa di clavicole, seno, vita e bacino;
- attaccatura, volume e silhouette dei capelli.

Il canvas può essere più grande per mostrare meglio il volto, ma la trasformazione verso le unità master deve restare nota e uniforme.

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
- stesso crop metrico head-to-hips;
- stessa scala tecnica derivata dalla METRIC MASTER;
- sfondo neutro semplice;
- nessun pannello decorativo, palette, logo o elemento extra;
- volto sufficientemente grande e definito per leggere occhi, naso, bocca, mandibola e deformazione del collo;
- capelli fedeli alla CLEAN MASTER v1 e coerenti con la gravità, senza cambiare taglio/stile;
- qualità reference alta, ma senza dettagli ornamentali inutili che aumentino il costo del futuro texture atlas mobile;
- NON scrivere `1000 units` sulla tavola: mostrare invece `MASTER SCALE DERIVED — HEAD TO HIPS` finché il valore locale non è stato misurato.

## Criteri di accettazione
- stessa Luna della CLEAN MASTER v1;
- stesse proporzioni e stesso outfit;
- ZERO accessori dinamici;
- tutte e 5 le inclinazioni corrette;
- nessun yaw/roll accidentale;
- nessun drift del volto, cranio, collo, spalle o busto;
- stesso crop metrico e stessi landmark in tutte le viste;
- nessun arto o dettaglio anatomico duplicato/fuso;
- nessuna reinterpretazione di capelli o outfit;
- nessun falso `1000 units` su un asset parziale.

## Uso nel rig
Queste reference servono per `ParamAngleY` / pitch verticale e per costruire keyform/interpolazione fluida. Dopo approvazione di PITCH-A verrà creato un set diagonale separato con combinazioni X+Y, senza rifare A/B.