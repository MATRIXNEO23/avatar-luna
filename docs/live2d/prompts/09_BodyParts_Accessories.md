# Luna Live2D — Prompt 09: Body Parts / Dynamic Accessories

## Scopo
Creare componenti anatomici e, soprattutto, TUTTI gli accessori dinamici come asset separati. Gli accessori non devono comparire nelle tavole di pose 01–08.

## Prompt
Usa `LUNA master.png` e la METRIC MASTER approvata. Mantieni carnagione, proporzioni, stile delle mani, lunghezza degli arti, guanti, stivali, gioielli e palette coerenti.

Questa tavola deve contenere SOLO componenti tecnici grandi e separati, non scene complete e non accessori disegnati sopra Luna.

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

## ACCESSORI DINAMICI — UNICA TAVOLA AUTORIZZATA
Crea separatamente e in grande, senza parti di pelle/capelli/outfit fuse:
- earring_L;
- earring_R;
- choker/necklace_dynamic;
- center_chain;
- pendant_center;
- torso_chain_L/R o gruppi necessari;
- waist_chain_L/R;
- side_pendant_L/R;
- wrist_charm_L/R;
- hair_accessory_L/R se mobile;
- boot_charm_L/R se mobile;
- altri charms, pendenti o gemme sospese realmente presenti nella reference canonica.

Ogni oggetto deve mantenere SEMPRE la stessa scala relativa, lunghezza, forma, materiale e punto di ancoraggio rispetto alla METRIC MASTER. Possono cambiare solo prospettiva, curva, rotazione e deformazione dovute a movimento/gravità.

### Varianti per ROTAZIONE — obbligatorie per ogni accessorio
Per ogni accessorio dinamico crea una variante separata ed etichettata per:
1. frontale 0°;
2. INTERMEDIO L ~22.5°;
3. 3/4 L ~45°;
4. profilo L ~90°;
5. 3/4 posteriore L ~135°;
6. retro 180°;
7. 3/4 posteriore R ~135°;
8. profilo R ~90°;
9. 3/4 R ~45°;
10. INTERMEDIO R ~22.5°.

Non specchiare automaticamente L/R. Ogni variante deve rispettare lato, prospettiva e occlusione previsti.

### Varianti per STANDING POSES — obbligatorie per gli oggetti sensibili al movimento
Per gli accessori che oscillano con torso, braccia o passo crea varianti dedicate corrispondenti alle 8 pose del Prompt 02:
- neutral standing;
- hand on hip;
- hand in hair;
- arms crossed;
- step forward;
- torso lean;
- looking back 3/4;
- open hand gesture.

### Varianti per FLOOR / BED POSES — obbligatorie per gli oggetti sensibili alla gravità
Crea varianti dedicate corrispondenti alle pose del Prompt 03:
- supina rilassata;
- supina ginocchia piegate;
- supina una gamba piegata;
- laterale L;
- laterale R;
- semi-sdraiata;
- prona rilassata;
- prona testa verso camera.

### Regola di presentazione
Gli accessori devono essere mostrati come **asset isolati**, non indossati dal personaggio. Ogni variante deve avere etichetta chiara dell'angolo/posa di destinazione, pivot/anchor indicato e freccia di gravità o direzione di movimento quando utile.

Se una singola tavola diventa troppo affollata, dividere Prompt 09 in più fogli coordinati, per esempio `09A_Earrings`, `09B_NecklaceChains`, `09C_WaistCharms`, mantenendo identica scala relativa tra tutti i fogli. NON rimpicciolire gli oggetti fino a perdere dettaglio.

## Criteri di accettazione
- L/R separati per arti e accessori asimmetrici;
- INTERMEDIO L/R presenti;
- tutte le 10 varianti angolari disponibili per ogni accessorio rilevante;
- varianti standing disponibili quando il movimento le richiede;
- varianti supine/prone/laterali disponibili quando la gravità le richiede;
- niente componenti tagliati;
- niente elementi inventati;
- accessori dinamici puri, senza pezzi della base;
- scala/lunghezza/pivot coerenti con METRIC MASTER;
- dimensioni sufficienti per ArtMesh e physics;
- nessun accessorio deve essere recuperato dalle pose 01–08.
