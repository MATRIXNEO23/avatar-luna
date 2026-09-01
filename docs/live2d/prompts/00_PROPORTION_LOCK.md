# Luna Live2D — GLOBAL LOCK

## Regola globale obbligatoria
Applicare queste regole a TUTTI i prompt del pack.

## Reference canonica corrente — CLEAN MASTER v1
La reference primaria è la **CLEAN MASTER v1 approvata il 2026-09-01**, ottenuta rimuovendo dalla vecchia Luna canonica tutti gli accessori dinamici.

Caratteristiche obbligatorie della CLEAN MASTER v1:
- stesso volto/identità di Luna;
- occhi viola;
- capelli lunghissimi, voluminosi, ondulati nero-viola;
- stessa corporatura e silhouette approvate;
- top nero semplice aderente;
- bottom nero semplice aderente;
- guanti lunghi neri;
- stivali neri con tacco;
- ZERO collane, choker, catene, pendenti, orecchini, charms, gemme sospese o altri accessori dinamici.

La precedente `LUNA master.png` con accessori è **DEPRECATA come master operativa** e non deve più essere usata per generare le tavole base 01–08. Rimane soltanto reference storica per ricostruire gli accessori nel Prompt 09.

Dopo approvazione di `01_Turnaround`, la frontale approvata diventa `METRIC MASTER`.
Nessuna generazione non approvata può sostituire queste reference.

## IDENTITY LOCK
Non reinterpretare Luna. Mantieni invariati volto, occhi viola, carnagione, capelli nero-viola, corporatura, silhouette, proporzioni e stile grafico della CLEAN MASTER v1.

## PROPORTION LOCK
Mantieni invariati tra file diversi: rapporto testa-corpo, larghezza spalle, collo, busto, vita, fianchi, bacino, lunghezza braccia, femore, tibia, mani, piedi e volume/lunghezza capelli. La posa cambia; l'anatomia no.

## SCALE LOCK — NORMALIZZAZIONE OBBLIGATORIA
TUTTE le immagini e tutti i componenti devono usare lo stesso sistema metrico derivato dalla CLEAN MASTER v1 / METRIC MASTER.

Standard globale:
- altezza full-body normalizzata = **1000 unità** dalla punta più alta dei capelli alla suola più bassa;
- suole sulla stessa baseline `Y=0`;
- punta capelli sulla stessa quota `Y=1000` per le pose verticali;
- ridimensionamento sempre uniforme, mai stirare X o Y separatamente;
- stessa scala relativa di testa, volto, spalle, busto, vita, bacino, arti, mani, piedi, capelli e outfit;
- i landmark anatomici devono restare alle stesse quote relative della METRIC MASTER, salvo deformazioni reali dovute alla posa/prospettiva;
- canvas e risoluzione possono cambiare, ma il soggetto deve essere normalizzato allo stesso sistema metrico prima dell'uso tecnico;
- Tavola A, Tavola B e posteriore devono risultare sovrapponibili per scala dopo la normalizzazione;
- le immagini generate NON diventano riferimento metrico per la successiva: ogni file riparte dalla CLEAN MASTER v1 / METRIC MASTER;
- per pose supine, prone o fortemente inclinate NON si forza il bounding-box verticale a 1000: si preservano invece le stesse lunghezze segmentali anatomiche della METRIC MASTER;
- close-up e componenti separati usano la scala derivata dalla rispettiva parte della METRIC MASTER;
- accessori Prompt 09 usano dimensioni, pivot e punti di aggancio misurati nello stesso sistema metrico.

### Validazione SCALE LOCK
Prima di approvare un asset:
1. normalizzare la figura/componente allo standard;
2. allineare baseline e asse centrale quando applicabile;
3. confrontare per overlay con METRIC MASTER o con il riferimento anatomico corrispondente;
4. scartare il file se richiede deformazione non uniforme per combaciare o se presenta drift evidente.

## OUTFIT LOCK
Per tutti i prompt della base canonica 01–07 usa ESATTAMENTE l'outfit statico della CLEAN MASTER v1:
- top nero aderente identico;
- bottom nero aderente identico;
- guanti lunghi neri identici;
- stivali neri con tacco identici.

NON semplificare ulteriormente, aggiungere, togliere o reinterpretare questi quattro elementi tra una tavola e l'altra.

Eccezione: `08_AltOutfits.md` è FUTURO / NON USARE NELLA BASE.

## DYNAMIC ACCESSORY LOCK
Collane, choker, catene, pendenti, orecchini, charms, gemme sospese e altri oggetti con physics indipendente NON devono comparire nelle pose/base dei Prompt 01–08. Devono essere prodotti separatamente SOLO nel Prompt 09, usando la vecchia master accessoriata come reference storica degli oggetti.

## ROTATION LOCK
Per le rotazioni orizzontali usare sempre, quando richiesto:
- 0° frontale;
- 22.5° L INTERMEDIO L;
- 45° L;
- 90° L;
- 135° L;
- 180° retro;
- 135° R;
- 90° R;
- 45° R;
- 22.5° R INTERMEDIO R.

Destra e sinistra devono essere realmente disegnate, non ottenute con mirroring automatico.

## OUTPUT LOCK
Ogni prompt deve produrre SOLO ciò che serve a quella funzione tecnica.
- niente pannelli informativi decorativi;
- niente palette, loghi, schemi o testi se non richiesti dal prompt specifico;
- niente elementi extra;
- sfondo neutro semplice;
- massimo spazio utile ai soggetti;
- nessun crop;
- margine 12–15% quando full-body;
- se troppe figure non entrano, dividere in più tavole coordinate mantenendo identica scala.

## Regola anti-drift
Se volto, proporzioni, outfit statico, capelli, scala o geometria di base cambiano in modo evidente rispetto alla CLEAN MASTER v1 / METRIC MASTER approvata, il file è SCARTATO.

## Validazione
Ogni tavola viene generata e controllata singolarmente. Non generare la successiva finché la precedente non è stata approvata.