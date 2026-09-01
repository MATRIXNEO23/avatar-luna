# Luna Live2D — Prompt 05: Eyes / Mouth / Brows

## Scopo
Creare componenti facciali tecnici grandi e separati per blink, gaze, sopracciglia, lip-sync e rotazione testa bilaterale.

## Prompt
Usa `LUNA master.png` e la METRIC MASTER approvata. Mantieni stile, colore viola delle iridi, eyeliner/ciglia, forma delle labbra, sopracciglia e carnagione identici alla reference.

Questa NON è una tavola di espressioni complete: è una tavola tecnica di componenti separati, grandi, puliti e chiaramente distanziati.

### Occhi
Mostra SEMPRE sia l’occhio sinistro sia l’occhio destro come coppia separata. NON generare un solo occhio da specchiare.

Per ogni lato L/R crea:
- open neutral;
- look left;
- look right;
- look up;
- look down;
- half-open;
- blink short;
- eyes closed;
- happy closed;
- sad/soft eyelid.

Ogni variante deve mantenere la stessa geometria di base e la stessa scala. Nessun occhio deve essere tagliato.

### Sopracciglia
Per L/R crea almeno: neutral, happy, angry, sad, surprised, worried, flirt/sensual.

### Bocca / fonemi
Crea componenti grandi e separati per:
- rest / closed;
- A;
- E;
- I;
- O;
- U;
- M/B/P;
- F/V;
- small open;
- medium open;
- wide open;
- smile;
- frown;
- soft/sensual smile.

### Rotazione testa
Per supportare ParamAngleX e ridurre il drift del volto, aggiungi reference facciali pulite per:
- frontale 0°;
- INTERMEDIO L ~22.5°;
- 3/4 L ~45°;
- profilo L ~90°;
- INTERMEDIO R ~22.5°;
- 3/4 R ~45°;
- profilo R ~90°.

Gli intermedi devono esistere su entrambi i lati. Non specchiare automaticamente un lato per ottenere l’altro.

### CLEAN FACE LOCK
Niente orecchini, collane, pendenti, charms, catene o accessori dinamici nelle reference facciali o nei componenti. Le orecchie, la pelle e le zone dei capelli visibili devono essere complete sotto i futuri accessori.

Gli accessori testa/orecchie vengono prodotti esclusivamente nel Prompt 09 con varianti dedicate per ogni angolo L/R.

Niente corpo o outfit. Solo componenti facciali tecnici e reference di rotazione testa, ad alta risoluzione e senza contaminazioni.

## Criteri di accettazione
- occhi L/R entrambi presenti per tutte le direzioni principali;
- blink L/R completo;
- sopracciglia L/R separate;
- bocche grandi abbastanza per ArtMesh puliti;
- INTERMEDIO L e INTERMEDIO R presenti nelle reference di rotazione;
- nessun accessorio dinamico visibile;
- nessun componente tocca il bordo;
- nessun testo sovrapposto ai componenti.
