# Luna Live2D — GLOBAL LOCK

## Regola globale obbligatoria
Applicare queste regole a TUTTI i prompt del pack.

## Reference
- identità canonica: `LUNA master.png`;
- dopo approvazione di `01_Turnaround`, la frontale approvata diventa `METRIC MASTER`;
- nessuna generazione non approvata può sostituire queste reference.

## IDENTITY LOCK
Non reinterpretare Luna. Mantieni invariati volto, occhi viola, carnagione, capelli nero-viola, corporatura, silhouette, proporzioni e stile grafico.

## PROPORTION LOCK
Mantieni invariati tra file diversi: rapporto testa-corpo, larghezza spalle, collo, busto, vita, fianchi, bacino, lunghezza braccia, femore, tibia, mani, piedi e volume/lunghezza capelli. La posa cambia; l'anatomia no.

## OUTFIT LOCK
Per tutti i prompt che usano l'outfit canonico, usa ESATTAMENTE lo stesso outfit statico/deformabile di `LUNA master.png`: stessa forma, copertura, tagli, materiali, colore, guanti/armwear, calzature e punti di attacco. NON semplificare, aggiungere, togliere o reinterpretare elementi dell'outfit statico.

Eccezione: `08_AltOutfits.md` può introdurre un outfit alternativo, ma UNA SOLA variante per tavola e la stessa identica variante in tutte le viste di quella tavola.

## DYNAMIC ACCESSORY LOCK
Collane, catene, pendenti, orecchini, charms, gemme sospese e altri oggetti con physics indipendente NON devono comparire nelle pose/base dei Prompt 01–08. Devono essere prodotti separatamente SOLO nel Prompt 09.

Le zone del corpo/outfit normalmente coperte dagli accessori devono essere completamente disegnate.

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
Se volto, proporzioni, outfit statico, capelli o geometria di base cambiano in modo evidente rispetto alle reference approvate, il file è SCARTATO.

## Validazione
Ogni tavola viene generata e controllata singolarmente. Non generare la successiva finché la precedente non è stata approvata.