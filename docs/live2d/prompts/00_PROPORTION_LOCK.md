# Luna Live2D — PROPORTION + ROTATION + ACCESSORY LOCK GLOBALE

## Regola obbligatoria
Questo blocco vale per **TUTTE** le generazioni Live2D di Luna. La coerenza deve essere mantenuta tra file diversi, non soltanto dentro la singola tavola.

## Reference primaria
Usa sempre `LUNA master.png` come reference identitaria canonica. Dopo approvazione di `01_Turnaround.md`, la vista frontale neutra approvata diventa la **METRIC MASTER** per tutte le tavole successive.

Una generazione non approvata NON può diventare reference della successiva.

## PROPORTION LOCK
Mantieni invariati tra tutti i file:
- rapporto testa/corpo;
- forma e larghezza di testa, mascella e mento;
- distanza e dimensione relativa degli occhi;
- collo e spalle;
- busto, vita, bacino/fianchi;
- lunghezza femore/tibia e posizione ginocchia;
- lunghezza braccia;
- dimensione relativa mani e piedi;
- lunghezza totale gambe;
- lunghezza, volume e attaccatura dei capelli;
- punti di ancoraggio dell'outfit statico.

La posa può cambiare; le proporzioni no.

## ROTATION LOCK — sinistra e destra
Per le tavole che richiedono rotazione orizzontale usa sempre il set completo:
- 0° frontale;
- 22.5° sinistra — INTERMEDIO L;
- 45° sinistra — 3/4 L;
- 90° sinistra — profilo L;
- 135° sinistra — 3/4 posteriore L;
- 180° retro;
- 135° destra — 3/4 posteriore R;
- 90° destra — profilo R;
- 45° destra — 3/4 R;
- 22.5° destra — INTERMEDIO R.

INTERMEDIO L e INTERMEDIO R si aggiungono alle viste principali e devono esistere entrambi. Non ottenere il lato destro con semplice mirroring del sinistro.

## REGOLA ACCESSORI DINAMICI — SEPARAZIONE ASSOLUTA
Qualunque oggetto che deve muoversi indipendentemente dal corpo NON deve apparire nelle tavole di pose, turnaround, volto, capelli o outfit base.

Esempi:
- collane/choker mobili;
- catene;
- pendenti e gemme sospese;
- orecchini;
- charms;
- accessori capelli mobili;
- bracciali/pendenti mobili;
- accessori stivali mobili;
- qualunque elemento oscillante o con physics indipendente.

### BASE CLEAN obbligatoria
Le tavole `01`, `02`, `03`, `04`, `05`, `06`, `07` e `08` devono mostrare Luna o i suoi componenti **senza accessori dinamici**. Non devono esserci versioni duplicate con e senza accessori nello stesso foglio.

La pelle, i capelli e l'outfit sottostanti devono essere completamente ricostruiti, senza buchi o residui dove normalmente passa l'accessorio.

### Dove vanno gli accessori
Gli accessori dinamici vengono creati **solo nella tavola dedicata `09_BodyParts_Accessories.md`**, come componenti indipendenti.

Per ogni oggetto la tavola 09 deve includere varianti dedicate a tutte le posizioni richieste:
- tutti i 10 angoli del turnaround, inclusi INTERMEDIO L/R;
- pose/gravity state rilevanti: eretta, inclinata, movimento, supina, prona, laterale L, laterale R, semi-sdraiata.

Gli oggetti NON devono essere disegnati sopra Luna nelle pose. Devono essere mostrati separatamente, etichettati con la posizione/angolo di destinazione e con pivot/anchor e direzione di gravità quando utile.

## ACCESSORY SCALE LOCK
Per ogni oggetto mantieni invariati tra file e varianti:
- dimensione relativa rispetto alla METRIC MASTER;
- lunghezza reale;
- forma e materiali;
- punto di ancoraggio;
- lato L/R;
- identità del componente.

Possono cambiare soltanto prospettiva, curva, rotazione, deformazione fisica, occlusione prevista e risposta alla gravità.

## Volto e occhi
Le emozioni modificano l'espressione, non la struttura del volto. Occhio L e occhio R devono essere completi e separati; non usare un singolo occhio specchiato come unica sorgente.

## Regola anti-drift
Se una tavola modifica significativamente volto, rapporto testa/corpo, busto, vita, fianchi, lunghezza arti o scala degli oggetti rispetto alla METRIC MASTER, è **SCARTATA**.

## Criterio di validazione
Prima di approvare ogni tavola:
1. confrontare con METRIC MASTER;
2. controllare landmark anatomici;
3. controllare identità volto/capelli;
4. verificare INTERMEDIO L + INTERMEDIO R quando richiesti;
5. verificare che nelle tavole di Luna NON compaiano accessori dinamici;
6. verificare che il corpo/outfit/capelli siano completi sotto i futuri accessori;
7. nella tavola 09 verificare tutte le varianti oggetto per angolo/posa e il loro scale lock;
8. approvare solo se non esistono amputazioni, drift, doppioni o oggetti mancanti.

## Frasi da includere nei prompt
> PROPORTION LOCK: usa la stessa anatomia e le stesse proporzioni della METRIC MASTER approvata. La posa può cambiare; le proporzioni no.

> ROTATION LOCK: quando sono previste rotazioni orizzontali, includi sempre INTERMEDIO L (~22.5°) e INTERMEDIO R (~22.5°), oltre alle viste principali.

> CLEAN BASE LOCK: questa tavola NON deve mostrare accessori dinamici su Luna. Collane, catene, pendenti, orecchini, charms e oggetti con physics indipendente vengono prodotti esclusivamente nella tavola accessori dedicata. La base sottostante deve essere completa e pulita.
