# Luna Live2D — Prompt 01: Turnaround 360°

## Scopo
Creare il turnaround geometrico da cui approvare la METRIC MASTER.

## Regole obbligatorie
Applica integralmente `00_PROPORTION_LOCK.md`, incluso **SCALE LOCK — NORMALIZZAZIONE OBBLIGATORIA**.
Usa come reference primaria la **CLEAN MASTER v1 approvata il 2026-09-01** (immagine senza accessori dinamici), non la vecchia `LUNA master.png` accessoriata.

Luna deve mantenere ESATTAMENTE:
- identità e volto della CLEAN MASTER v1;
- proporzioni corporee;
- capelli lunghissimi, voluminosi e ondulati nero-viola;
- stesso outfit statico CLEAN MASTER in ogni vista: top nero aderente, bottom nero aderente, guanti lunghi neri, stivali neri con tacco.

## SCALE LOCK — QUESTO FILE
Per tutte le viste verticali:
- altezza normalizzata **1000 unità** punta capelli → suola;
- suole sulla stessa baseline `Y=0`;
- stessa scala uniforme in ogni pannello;
- niente stretching X/Y;
- stessi landmark anatomici relativi della CLEAN MASTER v1 / METRIC MASTER;
- Tavola A, Tavola B e posteriore devono essere normalizzabili allo stesso identico standard.

Il canvas può cambiare, la scala anatomica no.

## CLEAN BASE LOCK — OBBLIGATORIO
ZERO accessori dinamici visibili.

NON mostrare:
- orecchini;
- choker/collane;
- catene;
- pendenti;
- gemme sospese;
- charms;
- decorazioni pendenti su guanti o stivali;
- accessori capelli mobili;
- qualunque elemento con physics indipendente.

Non ricostruire gli accessori della vecchia master. La CLEAN MASTER v1 è già la base da copiare.

## Output
Genera SOLO figure full-body su sfondo neutro semplice. Niente titoli, pannelli, palette, loghi, diagrammi o dettagli aggiuntivi.

Per evitare compressione, dividere obbligatoriamente in due tavole coordinate alla stessa scala.

### Tavola A — lato sinistro + frontale
1. frontale 0°;
2. INTERMEDIO L 22.5°;
3. 3/4 L 45°;
4. profilo L 90°;
5. 3/4 posteriore L 135°.

### Tavola B — posteriore + lato destro
La Tavola B deve contenere ESATTAMENTE queste 5 viste e nessun'altra:
1. posteriore 180°;
2. 3/4 posteriore R 135°;
3. profilo R 90°;
4. 3/4 R 45°;
5. INTERMEDIO R 22.5°.

**NON inserire il frontale 0° nella Tavola B.** Il quinto slot della Tavola B è occupato dal posteriore 180°, non da una ripetizione del frontale.

Tavola A e Tavola B devono avere stessa scala, stessa altezza anatomica, stessi capelli e stesso outfit statico.

Ogni figura deve essere completamente visibile con 12–15% di margine: capelli, testa, mani, dita visibili, gambe, piedi e scarpe interi.

Per il frontale tecnico usa postura neutra: gambe parallele/non incrociate, peso distribuito in modo semplice, braccia rilassate e leggibili.

Non specchiare il lato sinistro per creare il destro. Disegnare realmente entrambe le metà del giro.

## Criteri di accettazione
- Tavola A = 0°, 22.5° L, 45° L, 90° L, 135° L;
- Tavola B = 180°, 135° R, 90° R, 45° R, 22.5° R;
- nessun frontale duplicato in Tavola B;
- INTERMEDIO L e R presenti;
- frontale idonea a METRIC MASTER;
- volto e capelli fedeli alla CLEAN MASTER v1;
- stesso outfit statico CLEAN MASTER in tutte le viste;
- tutte le viste normalizzate allo stesso SCALE LOCK 1000 unità;
- baseline coerente;
- ZERO accessori dinamici;
- zero crop;
- zero drift evidente;
- nessun arto duplicato, fuso o mancante;
- nessun elemento grafico estraneo alle figure.