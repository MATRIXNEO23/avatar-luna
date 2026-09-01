# Luna Live2D — PROPORTION LOCK GLOBALE

## Regola obbligatoria
Questo blocco va applicato a **TUTTE** le generazioni Live2D di Luna, indipendentemente dalla tavola. La coerenza non va controllata solo all'interno della singola immagine: deve essere mantenuta **tra una tavola e l'altra**.

## Reference primaria
Usa sempre la stessa immagine canonica approvata di Luna come reference principale. Dopo approvazione della prima tavola `01_Turnaround`, la vista **frontale neutra** diventa anche la `METRIC MASTER` per tutte le tavole successive.

Non usare una nuova generazione come unica reference se non è stata approvata. Ogni tavola successiva deve essere confrontata con la METRIC MASTER.

## Proporzioni da bloccare
Mantieni invariati tra tutte le immagini:
- rapporto altezza testa / altezza corpo;
- larghezza testa e mascella;
- distanza e dimensione relativa degli occhi;
- lunghezza collo;
- larghezza spalle;
- posizione e volume relativo del busto;
- distanza spalle-vita;
- larghezza vita;
- larghezza bacino/fianchi;
- posizione inguine;
- lunghezza femore;
- posizione ginocchia;
- lunghezza tibia;
- dimensione relativa di mani e piedi;
- lunghezza totale delle gambe;
- lunghezza e volume dei capelli;
- posizione dei gioielli e dei punti principali dell'outfit canonico.

Non rendere Luna più alta, più bassa, più magra, più larga, più muscolosa o con proporzioni diverse tra una tavola e l'altra.

## Scala tecnica
Per tutte le pose **in piedi**:
- stessa altezza apparente del corpo rispetto alla METRIC MASTER;
- stessa scala testa-corpo;
- linea occhi, spalle, busto, vita, bacino, ginocchia e caviglie devono risultare coerenti quando la figura viene riportata alla stessa altezza;
- mantenere 12–15% di margine attorno alla sagoma senza deformare il corpo per farlo entrare.

Per pose sedute, supine, prone o laterali:
- NON forzare la stessa altezza del bounding box;
- mantenere invece le **stesse lunghezze anatomiche reali** della METRIC MASTER;
- la prospettiva può cambiare, le proporzioni corporee no;
- evitare accorciamenti prospettici estremi che rendano difficile verificare le misure.

## Volto
Per tutte le tavole facciali:
- stessa larghezza e altezza del volto;
- stessa distanza interpupillare;
- stessa posizione relativa di sopracciglia, occhi, naso e bocca;
- stessa forma mascella/mento;
- le emozioni devono deformare l'espressione, NON cambiare la struttura del volto.

## Outfit
L'outfit canonico deve aderire allo stesso corpo. Un outfit alternativo non può modificare anatomia o silhouette corporea di base. Le varianti di abbigliamento vanno costruite sopra la stessa METRIC MASTER.

## Occhi L/R e parti separate
Gli elementi tecnici separati devono conservare le dimensioni relative della METRIC MASTER. Occhio sinistro e destro NON devono essere generati come copie casuali di dimensione diversa. Ogni coppia deve poter essere riallineata al volto base senza ridimensionamento non uniforme.

## Regola anti-drift
Se una nuova tavola mostra anche una sola variazione evidente di volto, rapporto testa-corpo, busto, vita, fianchi o lunghezza gambe rispetto alla METRIC MASTER, la tavola è **SCARTATA** e non deve diventare reference per quella successiva.

## Criterio di validazione
Prima di approvare ogni tavola:
1. confrontare con la METRIC MASTER;
2. normalizzare visivamente alla stessa scala quando applicabile;
3. controllare landmark: sommità testa, occhi, mento, spalle, busto, vita, bacino, ginocchia, caviglie e piedi;
4. verificare volto e lunghezza/volume capelli;
5. approvare solo se non c'è drift evidente.

## Frase da includere in ogni prompt di generazione
> PROPORTION LOCK: questa tavola deve usare la stessa anatomia e le stesse proporzioni della METRIC MASTER approvata. Non reinterpretare o ricalibrare il corpo. Mantieni invariati rapporto testa-corpo, spalle, busto, vita, fianchi, lunghezze degli arti, dimensione mani/piedi e struttura del volto. La posa può cambiare; le proporzioni no.
