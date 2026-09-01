# Luna Live2D — Prompt 02: Standing Poses

## Scopo
Creare pose in piedi utili a gesture e deformazioni, senza cambiare identità, proporzioni, scala o outfit.

## Regole obbligatorie
Applica integralmente `00_PROPORTION_LOCK.md`, incluso lo **SCALE LOCK**.

## PRIORITÀ REFERENCE — OBBLIGATORIA
1. **CLEAN MASTER v1** = reference VISIVA PRIMARIA e assoluta per volto, capelli, corporatura, outfit, materiali, colori e proporzioni.
2. Turnaround/METRIC MASTER approvata = reference SECONDARIA soltanto per angoli, orientamento, baseline e scala metrica.
3. NON ricavare mai identità, volto, capelli o outfit da una tavola generata precedente se differisce dalla CLEAN MASTER v1.
4. Ogni nuova tavola deve ripartire direttamente dalla CLEAN MASTER v1.

Mantieni ESATTAMENTE:
- identità e volto della CLEAN MASTER v1;
- occhi viola;
- capelli lunghissimi, voluminosi e ondulati nero-viola;
- proporzioni corporee;
- stesso outfit statico CLEAN MASTER: top nero aderente, bottom nero aderente, guanti lunghi neri, stivali neri con tacco.

NON mostrare accessori dinamici: niente collane, choker, catene, pendenti, orecchini, charms, gemme sospese o accessori mobili.

## SCALE LOCK
Per ogni figura verticale:
- altezza normalizzata = **1000 unità** punta capelli → suola;
- suole sulla baseline `Y=0`;
- scaling solo uniforme;
- stessa scala relativa di testa, busto, bacino, arti, mani, piedi, capelli e outfit della METRIC MASTER;
- nessun allungamento/compressione per far entrare la posa;
- se una posa richiede più spazio laterale, aumentare il canvas, NON ridurre o deformare Luna.

## Output
Solo figure full-body su sfondo neutro semplice. Niente pannelli, palette, loghi, diagrammi o testi decorativi.

Dividere in due tavole da 4 alla stessa scala:

### Tavola A
1. neutra, braccia rilassate;
2. mano sul fianco;
3. una mano tra i capelli;
4. braccia incrociate senza coprire completamente il torso.

### Tavola B
5. leggero passo in avanti;
6. leggera inclinazione del torso;
7. sguardo indietro in 3/4;
8. gesto aperto con una mano.

Ogni figura deve essere completamente visibile con 12–15% di margine. La posa può cambiare; anatomia, volto, capelli, outfit, scala e proporzioni no.

## Qualità / budget mobile
Le tavole di reference devono essere nitide e abbastanza definite per il rig, ma non introdurre dettagli ornamentali inutili. Il runtime mobile userà texture atlas ottimizzate separatamente: priorità qualità a volto/capelli, corpo/outfit più leggero dove possibile.

## Criteri di accettazione
- stessa identità della CLEAN MASTER v1;
- stesso outfit della CLEAN MASTER v1;
- turnaround usato solo per scala/orientamento, non come nuova identità;
- SCALE LOCK rispettato;
- nessun accessorio dinamico visibile;
- zero crop;
- mani e piedi completi;
- nessun drift di busto, vita, fianchi o lunghezza arti;
- nessun arto duplicato/fuso/mancante;
- nessun elemento grafico estraneo.