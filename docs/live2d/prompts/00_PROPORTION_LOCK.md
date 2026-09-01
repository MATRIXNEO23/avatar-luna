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

## SCALE LOCK — SISTEMA METRICO PROPORZIONALE OBBLIGATORIO
TUTTI gli asset devono appartenere allo **stesso sistema metrico globale** derivato dalla METRIC MASTER. La metrica cambia estensione in base al tipo di immagine, ma NON cambia scala anatomica.

### Unità globale
- full-body verticale della METRIC MASTER = **1000 unità** dalla punta più alta dei capelli alla suola più bassa;
- suole = `Y=0`;
- punta capelli = `Y=1000`;
- `1 unità master` mantiene lo stesso significato proporzionale in tutti gli asset.

### Regola fondamentale per crop e componenti
Un asset parziale NON viene riscalato a 1000 unità.
Deve invece conservare **la porzione reale delle 1000 unità master** che occupa nel corpo completo.

Esempi concettuali:
- head-to-hips: usa il numero di unità realmente misurato tra punta capelli e landmark del bacino nella METRIC MASTER;
- testa/volto: usa l'intervallo di unità realmente occupato dalla testa nella METRIC MASTER;
- occhi, bocca, mani, piedi, capelli, outfit e accessori: usano dimensioni e distanze derivate dai rispettivi landmark della METRIC MASTER;
- nessun sotto-asset può dichiararsi arbitrariamente `1000 unità` se non rappresenta l'intero full-body.

I valori locali esatti vengono **misurati dalla METRIC MASTER**, non inventati nel prompt. Finché non sono misurati, il prompt deve indicare il segmento anatomico e richiedere la derivazione dalla master.

### Coerenza tra immagini
- scaling sempre uniforme; vietato stirare X/Y separatamente;
- stessi landmark anatomici, stessa proporzione e stessa distanza relativa tra parti;
- canvas e risoluzione possono cambiare per ottenere più dettaglio, ma devono conservare una trasformazione nota verso le unità master;
- un close-up può essere visualizzato più grande in pixel, ma la sua **scala tecnica** resta quella derivata dalla master e deve poter essere ricondotta senza deformazioni alla posizione/dimensione originale;
- asset dello stesso set devono usare identico crop metrico, identici landmark di riferimento e identico rapporto di scala;
- le immagini generate NON diventano riferimento metrico per la successiva: ogni file riparte dalla CLEAN MASTER v1 / METRIC MASTER;
- pose supine, prone o fortemente inclinate conservano lunghezze segmentali e distanze tra landmark; non si forza il bounding-box a 1000;
- accessori Prompt 09 usano dimensioni, pivot e punti di aggancio nello stesso sistema master.

### Validazione SCALE LOCK
Prima di approvare un asset:
1. identificare i landmark master che delimitano il tipo di immagine;
2. ricavare dalla METRIC MASTER il relativo intervallo/dimensione in unità;
3. normalizzare l'asset a quell'intervallo, non automaticamente a 1000;
4. allineare asse, pivot e landmark pertinenti;
5. confrontare per overlay con la METRIC MASTER o con il riferimento anatomico corrispondente;
6. SCARTARE se serve deformazione non uniforme per combaciare o se compare drift evidente.

## IMAGE QUALITY / RAM LOCK — DEFINIZIONE ALTA, COSTO MOBILE CONTROLLATO
La qualità del source art e il peso runtime sono due problemi separati: mantenere il source abbastanza definito da permettere un buon rig, ma NON usare texture runtime più grandi del necessario.

Regole globali:
- evitare 4K per default e non aumentare la risoluzione solo per compensare un disegno poco pulito;
- reference/turnaround: usare immagini nitide e leggibili, con dettaglio sufficiente per occhi, capelli, mani e bordi outfit, senza supercampionamento inutile;
- la CLEAN MASTER corrente è 1024×1536 RGBA e resta una base di dettaglio adeguata per le reference tecniche;
- per il modello Live2D finale, usare **2048² solo per volto/capelli principali quando il guadagno visivo è reale**;
- corpo/outfit: target iniziale **1024²**;
- capelli secondari, accessori e parti minori: **512–1024²** quando sufficiente;
- niente atlas 4096² come default;
- non duplicare la stessa grafica ad alta risoluzione in più texture se può essere condivisa o impacchettata senza perdita visibile;
- un solo personaggio attivo di default e scaricare texture/modelli inattivi;
- preservare alpha e bordi puliti nel source; ottimizzare/comprimere solo nella fase runtime/export, non distruggere il master;
- priorità qualità mobile: volto/occhi/capelli > silhouette/outfit > dettagli secondari/accessori;
- ogni aumento di texture deve essere giustificato da un miglioramento visivo osservabile sul telefono.

Budget avatar già approvato:
- tetto assoluto: **<300 MB RAM**;
- target operativo: **150–220 MB RAM** per un personaggio attivo.

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
- nessun crop accidentale;
- margine 12–15% quando full-body;
- crop tecnico consentito per asset parziali solo se definito dal prompt e identico tra viste coordinate;
- se troppe figure non entrano, dividere in più tavole coordinate mantenendo identica scala tecnica.

## Regola anti-drift
Se volto, proporzioni, outfit statico, capelli, scala o geometria di base cambiano in modo evidente rispetto alla CLEAN MASTER v1 / METRIC MASTER approvata, il file è SCARTATO.

## Validazione
Ogni tavola viene generata e controllata singolarmente. Non generare la successiva finché la precedente non è stata approvata.