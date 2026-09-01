# Luna Live2D — Prompt 10: Technical Layer Map

## Scopo
Creare una tavola tecnica/schematica finale che definisca tutti i layer da produrre nel PSD e nel modello Cubism, separando rigidamente base, parti deformabili e accessori dinamici.

## Prompt
Usa `LUNA master.png` e la METRIC MASTER approvata come riferimento visivo. Questa NON è una tavola artistica di pose: è una mappa tecnica del modello Live2D.

Mostra una figura frontale neutra completa di Luna, non tagliata, affiancata da un diagramma ordinato dei layer. La figura tecnica principale deve rappresentare una **BASE CLEAN**, cioè senza collane, catene, pendenti, orecchini o altri oggetti dinamici fusi nel corpo/outfit.

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

### DYNAMIC ACCESSORIES
Crea layer indipendenti almeno per:
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
- base sottostante completamente ricostruita.

### ACCESSORY POSITION MAPS
Documenta reference di posizione per ogni accessorio dinamico su tutto il set di rotazione:
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

Aggiungi mappe speciali per accessori sensibili alla gravità nelle pose supina, prona, laterale L/R e semi-sdraiata.

### EFFECTS / PHYSICS
- breath/chest deform region;
- hair physics groups;
- earring physics L/R;
- necklace/pendant physics;
- chain physics groups;
- accessory physics groups;
- glow/highlight solo se realmente necessario.

### ROTATION / KEYFORM REFERENCE
Per ParamAngleX usa riferimenti bilaterali e simmetrici. Oltre alle viste principali sono obbligatori INTERMEDIO L e INTERMEDIO R. I deformatori interpolano tra keyform, ma non devono inventare prospettive mancanti.

Aggiungi una legenda con i parametri minimi Cubism:
ParamAngleX/Y/Z, BodyAngleX/Y/Z, EyeBallX/Y, EyeLOpen, EyeROpen, MouthOpenY, MouthForm, brow parameters, Breath, hair physics parameters, chest/bust physics parameters, accessory physics parameters.

La tavola deve essere leggibile e funzionale, non decorativa. Usa naming coerente L/R e struttura pensata per un singolo modello mobile attivo.

## Criteri di accettazione
- figura BASE CLEAN completa e non tagliata;
- tutti i gruppi layer necessari presenti;
- L/R esplicito dove serve;
- INTERMEDIO L/R documentati;
- occhi, palpebre, iridi e pupille separati per entrambi i lati;
- bocca scomposta per lip-sync;
- capelli divisi in gruppi fisici sensati;
- outfit statico/deformabile separato dal body;
- accessori dinamici separati sia dal body sia dall'outfit;
- anchor, draw order e physics degli accessori documentati;
- position map per ogni angolo e posa speciale rilevante;
- struttura compatibile con target mobile: atlas volto/capelli fino a 2048, corpo 1024, secondari 1024 solo se necessari;
- niente layer ridondanti che aumentino inutilmente memoria e draw calls.