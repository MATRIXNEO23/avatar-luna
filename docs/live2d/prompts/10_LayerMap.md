# Luna Live2D — Prompt 10: Technical Layer Map

## Scopo
Creare una tavola tecnica/schematica finale che definisca tutti i layer da produrre nel PSD e nel modello Cubism.

## Prompt
Usa la Luna canonica allegata solo come riferimento visivo. Questa NON è una tavola artistica di pose: è una mappa tecnica chiara del modello Live2D.

Mostra una figura frontale neutra completa di Luna, non tagliata e con margine, affiancata da un diagramma ordinato dei layer. Nessun outfit alternativo e nessuna posa aggiuntiva.

Organizza il layer map in gruppi:

### BASE / BODY
- base_head;
- face_base;
- neck;
- torso/body_base;
- chest/bust base/deformable region;
- shoulder L/R;
- arm L/R;
- hand L/R;
- hip/pelvis base;
- leg L/R;
- foot L/R.

### FACE
- brow L/R;
- eye_white L/R;
- iris L/R;
- pupil L/R;
- upper_eyelid L/R;
- lower_eyelid L/R;
- lash/eyeline L/R;
- mouth_base;
- upper_lip;
- lower_lip;
- mouth_interior;
- teeth;
- tongue optional;
- blush/cheek overlay optional.

### HAIR
- hair_back;
- hair_back_left/right;
- rear strands groups;
- hair_side L/R;
- hair_front;
- bangs/front strands;
- face-lock strands;
- hair highlights optional.

### OUTFIT
- top/chest piece;
- bottom/waist piece;
- glove/armwear L/R;
- boot L/R;
- front chains;
- waist chains;
- back chains;
- outfit detail/gems;
- modular outfit slots.

### ACCESSORIES
- earrings L/R;
- necklace/choker;
- pendant/gem center;
- wrist/arm accessories;
- boot accessories;
- loose pendants/chains.

### EFFECTS / PHYSICS
- breath/chest deform region;
- hair physics groups;
- accessory physics groups;
- glow/highlight layers only if realmente necessari.

Aggiungi una legenda con i parametri minimi Cubism:
ParamAngleX/Y/Z, BodyAngleX/Y/Z, EyeBallX/Y, EyeLOpen, EyeROpen, MouthOpenY, MouthForm, brow parameters, Breath, hair physics parameters, chest/bust physics parameters, accessory physics parameters.

La tavola deve essere leggibile e funzionale, non decorativa. Nessun testo deve coprire Luna. Usa naming coerente L/R e struttura pensata per un singolo modello mobile attivo.

## Criteri di accettazione
- figura frontale completa e non tagliata;
- tutti i gruppi layer necessari presenti;
- L/R esplicito dove serve;
- occhi, palpebre, iridi e pupille separati per entrambi i lati;
- bocca scomposta per lip-sync;
- capelli divisi in gruppi fisici sensati;
- outfit modulare separato dal body base;
- struttura compatibile con target mobile: atlas volto/capelli fino a 2048, corpo 1024, secondari 1024 solo se necessari;
- niente layer ridondanti che aumentino inutilmente memoria e draw calls.