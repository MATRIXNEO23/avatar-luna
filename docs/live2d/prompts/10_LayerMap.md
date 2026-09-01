# Luna Live2D — Prompt 10: Technical Layer Map

## Scopo
Creare una tavola tecnica/schematica finale che definisca tutti i layer da produrre nel PSD e nel modello Cubism, separando rigidamente base, parti deformabili e accessori dinamici.

## Prompt
Usa `LUNA master.png` e la METRIC MASTER approvata come riferimento visivo. Questa NON è una tavola artistica di pose: è una mappa tecnica del modello Live2D.

Mostra una figura frontale neutra completa di Luna come **BASE CLEAN**, quindi senza collane, catene, pendenti, orecchini, charms o altri oggetti dinamici visibili sul personaggio.

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
- rear strand groups;
- hair_side L/R;
- hair_front;
- bangs/front strands;
- face-lock strands;
- hair highlights optional.

### OUTFIT STATIC / DEFORMABLE
- top/chest piece;
- bottom/waist piece;
- glove/armwear L/R;
- boot L/R;
- fabric/panel deform groups;
- modular outfit slots.

Gli elementi dinamici NON devono stare in questo gruppo.

### DYNAMIC ACCESSORIES — SOURCE: PROMPT 09 ONLY
Tutti i layer dinamici devono provenire esclusivamente dagli asset separati del Prompt 09, mai dalle pose 01–08.

Prevedi almeno:
- earring_L;
- earring_R;
- choker_base se rigido;
- necklace_dynamic;
- center_chain;
- pendant_center;
- torso_chain_L/R o gruppi necessari;
- waist_chain_L/R;
- side_pendant_L/R;
- wrist_charm_L/R;
- hair_accessory_L/R se mobile;
- boot_charm_L/R se mobile;
- altri charms/pendenti realmente presenti.

Ogni accessorio deve avere:
- anchor/pivot documentato;
- parent deformer documentato;
- physics group dedicato se necessario;
- ordine di draw davanti/dietro documentato;
- base sottostante completamente ricostruita;
- scale lock rispetto alla METRIC MASTER.

### ACCESSORY VARIANT MAPS
Documenta che il Prompt 09 contiene le varianti isolate per tutto il set di rotazione:
- 0° frontale;
- INTERMEDIO L ~22.5°;
- 3/4 L ~45°;
- profilo L ~90°;
- 3/4 posteriore L ~135°;
- retro 180°;
- 3/4 posteriore R ~135°;
- profilo R ~90°;
- 3/4 R ~45°;
- INTERMEDIO R ~22.5°.

Documenta inoltre le varianti accessorio necessarie per le 8 Standing Poses del Prompt 02 e per le 8 Floor/Bed Poses del Prompt 03 quando movimento o gravità richiedono una forma diversa.

Gli accessori restano asset separati: la mappa tecnica può indicare dove vengono ancorati, ma NON deve ridisegnarli fusi sopra la BASE CLEAN.

### EFFECTS / PHYSICS
- breath/chest deform region;
- hair physics groups;
- earring physics L/R;
- necklace/pendant physics;
- chain physics groups;
- accessory physics groups;
- glow/highlight solo se realmente necessario.

### ROTATION / KEYFORM REFERENCE
Per ParamAngleX usa riferimenti bilaterali. INTERMEDIO L e INTERMEDIO R sono obbligatori oltre alle viste principali. I deformatori interpolano tra keyform, ma non devono inventare prospettive mancanti.

Aggiungi una legenda con i parametri minimi Cubism:
ParamAngleX/Y/Z, BodyAngleX/Y/Z, EyeBallX/Y, EyeLOpen, EyeROpen, MouthOpenY, MouthForm, brow parameters, Breath, hair physics parameters, chest/bust physics parameters, accessory physics parameters.

## Criteri di accettazione
- figura BASE CLEAN completa e non tagliata;
- tutti i gruppi layer necessari presenti;
- L/R esplicito dove serve;
- INTERMEDIO L/R documentati;
- occhi, palpebre, iridi e pupille separati per entrambi i lati;
- bocca scomposta per lip-sync;
- capelli divisi in gruppi fisici sensati;
- outfit statico/deformabile separato dal body;
- accessori dinamici provenienti esclusivamente dal Prompt 09;
- nessun accessorio dinamico fuso nelle pose/base;
- anchor, draw order, physics e scale lock documentati;
- struttura compatibile con target mobile: atlas volto/capelli fino a 2048, corpo 1024, secondari 1024 solo se necessari;
- niente layer ridondanti che aumentino inutilmente memoria e draw calls.
