# Luna Live2D — PROPORTION + ACCESSORY LOCK GLOBALE

## Regola obbligatoria
Questo blocco va applicato a **TUTTE** le generazioni Live2D di Luna. La coerenza deve essere mantenuta tra una tavola e l'altra, non solo dentro la singola immagine.

## Reference primaria
Usa sempre `LUNA master.png` come reference identitaria canonica. Dopo approvazione della tavola `01_Turnaround`, la vista frontale neutra approvata diventa anche la **METRIC MASTER**.

Non usare una nuova generazione come unica reference se non è stata approvata.

## Proporzioni da bloccare
Mantieni invariati:
- rapporto altezza testa / altezza corpo;
- larghezza testa e mascella;
- distanza e dimensione relativa degli occhi;
- collo e spalle;
- posizione e volume relativo del busto;
- distanza spalle-vita;
- vita e bacino/fianchi;
- lunghezza femore e tibia;
- posizione ginocchia;
- dimensione relativa mani e piedi;
- lunghezza totale gambe;
- lunghezza e volume dei capelli;
- punti di ancoraggio dell'outfit canonico.

La posa può cambiare; le proporzioni no.

## Scala tecnica
Per pose in piedi, usa la stessa scala anatomica della METRIC MASTER. Per pose sedute, supine, prone o laterali non forzare lo stesso bounding box: mantieni le stesse lunghezze anatomiche reali e limita scorci prospettici estremi.

## Volto
Le emozioni devono cambiare l'espressione, non la struttura del viso. Mantieni forma del cranio, mascella, mento, distanza interpupillare e posizione relativa di sopracciglia, occhi, naso e bocca.

## ACCESSORY LOCK — REGOLA PERMANENTE
Qualunque elemento che deve muoversi indipendentemente dal corpo deve essere trattato come **layer dinamico separato** e NON deve essere fuso nel corpo, nella pelle, nei capelli o nell'outfit statico.

Elementi dinamici previsti per Luna, quando presenti:
- choker/collana;
- catena centrale;
- pendente/gemma;
- catene laterali o sui fianchi;
- orecchino sinistro;
- orecchino destro;
- bracciali/charms mobili;
- pendenti o gemme sospese;
- accessori capelli mobili;
- altri elementi sospesi o oscillanti.

### Base statica pulita
Per ogni vista/posa la base corpo+outfit deve esistere **anche senza gli oggetti dinamici fusi sopra**. Le zone sottostanti devono essere ricostruite completamente, così il movimento dell'accessorio non scopre buchi, doppioni o residui.

### Oggetti per ogni posizione
Per **ogni singola vista, angolo o posa** richiesta dalla tavola, devono esistere riferimenti coerenti della posizione degli accessori dinamici. Non riutilizzare automaticamente l'oggetto frontale per il profilo, il retro, una posa supina o una posa inclinata.

Ogni accessorio deve rispettare:
- punto di ancoraggio corretto al corpo/outfit;
- prospettiva coerente con la posa;
- orientamento coerente con gravità e movimento;
- lunghezza e dimensioni costanti;
- lato L/R corretto;
- occlusioni corrette davanti/dietro a corpo, capelli e outfit.

### Coppia obbligatoria per ogni posizione
Ogni posa tecnica deve essere pensata come:
1. **BASE CLEAN** — Luna completa senza accessori dinamici fusi;
2. **ACCESSORY POSITION MAP** — riferimento degli accessori dinamici nella stessa identica posa/angolo.

Il riferimento può mostrare gli accessori sul personaggio per leggibilità, ma deve essere chiaro che in PSD/Cubism saranno layer separati e che la base sottostante è completa.

## Occhi L/R e parti separate
Occhio sinistro e destro devono essere completi e separati. Ogni coppia deve riallinearsi al volto base senza ridimensionamento non uniforme.

## Regola anti-drift
Se una tavola modifica volto, rapporto testa-corpo, busto, vita, fianchi, lunghezza arti oppure scala/posizione degli accessori rispetto alla METRIC MASTER, è **SCARTATA**.

## Criterio di validazione
Prima di approvare ogni tavola:
1. confrontare con METRIC MASTER;
2. controllare landmark anatomici;
3. controllare identità volto/capelli;
4. verificare BASE CLEAN senza accessori dinamici fusi;
5. verificare ACCESSORY POSITION MAP per ogni posa/angolo;
6. controllare L/R, gravità, prospettiva e punti di ancoraggio degli accessori;
7. approvare solo se non esistono amputazioni, drift o doppioni.

## Frasi da includere in ogni prompt
> PROPORTION LOCK: usa la stessa anatomia e le stesse proporzioni della METRIC MASTER approvata. La posa può cambiare; le proporzioni no.

> ACCESSORY LOCK: collane, catene, pendenti, orecchini e ogni oggetto con movimento indipendente NON devono essere fusi nella base statica. Per ogni posa/angolo prevedi la base pulita e la posizione specifica di ogni accessorio dinamico, con geometria sottostante completamente ricostruita.