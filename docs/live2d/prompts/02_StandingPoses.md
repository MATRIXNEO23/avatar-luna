# Luna Live2D — Prompt 02: Standing Poses

## Scopo
Creare riferimenti full-body per movimento, gesti, postura e deformazioni del rig mantenendo la METRIC MASTER.

## Prompt
Usa `LUNA master.png` e la frontale approvata del Turnaround come reference. Mantieni identici volto, occhi, capelli, proporzioni, carnagione e outfit base.

PROPORTION LOCK: la posa cambia; anatomia, scala relativa e proporzioni no.

Crea 8 pose full-body:
1. neutra, braccia rilassate;
2. mano sul fianco;
3. una mano tra i capelli;
4. braccia incrociate senza coprire completamente il torso;
5. leggero passo in avanti;
6. leggera inclinazione del torso;
7. sguardo indietro in 3/4;
8. gesto aperto con una mano.

Se 8 pose non entrano grandi e leggibili, dividere in due tavole da 4. Ogni posa deve mostrare capelli, testa, entrambe le braccia e mani, busto, bacino, entrambe le gambe e piedi/scarpe con 12–15% di margine.

### Accessori dinamici
Collana/choker, catene, pendenti, orecchini, charms, gemme sospese e altri elementi mobili NON devono essere fusi nell'outfit/base.

Per **ognuna delle 8 pose** deve esistere:
- **BASE CLEAN**: corpo+outfit senza accessori dinamici fusi;
- **ACCESSORY POSITION MAP**: posizione specifica degli accessori per quella stessa posa.

Gli accessori devono reagire correttamente a:
- inclinazione del torso;
- gravità;
- passo/movimento;
- orientamento 3/4;
- braccia che possono passare davanti/dietro;
- capelli che possono coprire o scoprire parti dell'accessorio.

Non copiare la stessa forma/posizione degli oggetti in tutte le pose. Mantieni però costanti lunghezza, dimensione, punti di ancoraggio e identità degli oggetti.

## Criteri di accettazione
- zero crop;
- proporzioni coerenti con METRIC MASTER;
- outfit base invariato;
- base sottostante completa;
- accessori dinamici separati;
- mappa accessori presente per ogni posa;
- mani e piedi interi;
- nessun arto duplicato/fuso/mancante;
- pose naturali e utili a BodyAngle/gesture/motion.