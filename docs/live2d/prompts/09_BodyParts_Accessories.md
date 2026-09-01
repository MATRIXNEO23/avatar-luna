# Luna Live2D — Prompt 09: Body Parts / Accessories

## Scopo
Creare componenti anatomici e accessori tecnici separati per completare il rig senza ricostruzioni da pose compresse.

## Prompt
Usa `LUNA master.png` e la METRIC MASTER approvata. Mantieni carnagione, proporzioni, stile delle mani, lunghezza degli arti, guanti, stivali, gioielli e palette coerenti.

Questa tavola deve contenere SOLO componenti tecnici grandi e separati, non scene complete.

### Mani
Crea mano sinistra e destra separate, mai una sola mano specchiata, nelle varianti:
- rilassata;
- aperta;
- pugno morbido;
- indice esteso;
- presa leggera;
- mano sul fianco;
- mano tra i capelli.

Cinque dita corrette quando visibili, nessuna fusione o dito extra.

### Braccia
Crea braccio sinistro e destro completi, con e senza guanto dove tecnicamente utile, in posizione neutra e piegata. Nessun taglio a spalla, gomito o mano.

### Gambe / piedi
Crea gamba sinistra e destra complete come riferimento anatomico, più piede sinistro e destro separati: frontale, laterale e pianta quando utile. Aggiungi stivale L/R separato come componente outfit senza cambiare la forma del piede base.

### Accessori dinamici — componenti canonici separati
Crea separatamente e in grande:
- orecchino L;
- orecchino R;
- collana/choker;
- catena centrale;
- gemma/pendente centrale;
- catene torso;
- catene vita/fianchi;
- pendente laterale L;
- pendente laterale R;
- accessori polso/braccio L/R;
- accessori stivali L/R se mobili;
- charms/gemme/accessori capelli mobili;
- altri elementi realmente presenti nella reference canonica.

Nessun accessorio dinamico deve contenere pezzi di pelle, capelli o outfit attaccati al raster.

### Varianti di posizione obbligatorie
Per ogni accessorio dinamico crea reference di posizione coerenti almeno per il set di rotazione approvato:
- frontale 0°;
- INTERMEDIO L ~22.5°;
- 3/4 L ~45°;
- profilo L ~90°;
- 3/4 posteriore L ~135°;
- retro 180°;
- 3/4 posteriore R ~135°;
- profilo R ~90°;
- 3/4 R ~45°;
- INTERMEDIO R ~22.5°.

Per gli accessori sensibili alla gravità aggiungi inoltre position reference per le pose speciali già approvate in `03_FloorBedPoses.md`: supina, prona, laterale L, laterale R e semi-sdraiata.

Queste non sono copie deformate casualmente: devono mantenere stessa geometria di base, lunghezza, scala e punto di ancoraggio, cambiando prospettiva, curva e orientamento in modo coerente.

### Regola base pulita
Il corpo/outfit sotto ogni oggetto deve essere completo. Gli accessori sono overlay indipendenti e non devono lasciare doppioni quando si muovono.

Ogni componente deve avere margine pulito, non toccare il bordo e non sovrapporsi ad altri elementi.

## Criteri di accettazione
- L/R separati per arti e accessori asimmetrici;
- INTERMEDIO L/R presenti;
- niente componenti tagliati;
- anatomia corretta;
- niente elementi inventati;
- accessori dinamici puri, senza pezzi della base;
- position variants per tutti gli angoli del turnaround e per le pose speciali rilevanti;
- dimensioni sufficienti per ArtMesh e physics;
- coerenza perfetta con METRIC MASTER e outfit canonico.