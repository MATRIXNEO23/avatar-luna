# Luna Live2D — Prompt 01: Turnaround 360° + intermedi L/R

## Scopo
Creare la tavola geometrica principale di Luna e la METRIC MASTER per tutte le tavole successive.

## Prompt
Usa **LUNA master.png** come identità canonica. Mantieni invariati volto, occhi viola, capelli nero-viola, carnagione, proporzioni corporee, silhouette e outfit canonico.

PROPORTION LOCK: stessa anatomia e stesse proporzioni in tutte le viste. La prospettiva cambia; il corpo no.

ROTATION LOCK: oltre alle viste principali, includi **un frame intermedio aggiuntivo a sinistra e uno a destra**.

Crea **10 viste full-body complete**:
1. frontale 0°;
2. INTERMEDIO L circa 22.5°;
3. 3/4 sinistra circa 45°;
4. profilo sinistro circa 90°;
5. 3/4 posteriore sinistro circa 135°;
6. retro 180°;
7. 3/4 posteriore destro circa 135°;
8. profilo destro circa 90°;
9. 3/4 destro circa 45°;
10. INTERMEDIO R circa 22.5°.

Gli intermedi L/R si aggiungono alle viste previste e NON le sostituiscono. Devono essere entrambi presenti.

Non specchiare semplicemente il lato sinistro: capelli, catene, orecchini, gioielli e dettagli asimmetrici devono essere coerenti realmente in L/R.

Ogni figura deve essere completamente visibile dalla punta dei capelli ai piedi, incluse mani, dita visibili, tacchi e accessori, con almeno 12–15% di margine. Nessuna parte deve toccare il bordo.

### Base statica
La base corpo+outfit deve essere pensata **senza accessori dinamici fusi**. Collane, catene, pendenti, orecchini e oggetti oscillanti sono layer separati. Le zone sotto di essi devono essere completamente ricostruite.

### Accessori per ogni vista
Per ognuna delle 10 viste crea un riferimento coerente della posizione di:
- choker/collana;
- catena centrale;
- pendente/gemma;
- catene laterali/fianchi;
- orecchino L;
- orecchino R;
- altri charms o gemme sospese presenti nella reference.

Ogni oggetto deve avere prospettiva, lato, ancoraggio e occlusione corretti per quella specifica vista, inclusi INTERMEDIO L e INTERMEDIO R. Non riutilizzare la posizione frontale per profilo, retro o intermedi.

L'output tecnico deve distinguere concettualmente:
- **BASE CLEAN** per ogni angolo;
- **ACCESSORY POSITION MAP** per lo stesso angolo.

Se 10 viste non entrano grandi e leggibili in una tavola, dividere in **Turnaround A: 5 viste** e **Turnaround B: 5 viste** mantenendo identica scala. NON comprimere e NON tagliare.

## Criteri di accettazione
- 10 viste complete con giro 360°;
- INTERMEDIO L + INTERMEDIO R presenti;
- frontale approvabile come METRIC MASTER;
- zero parti del corpo tagliate;
- stesse proporzioni in tutte le viste;
- outfit base coerente;
- accessori dinamici non fusi nella base;
- posizione di ogni accessorio definita per ogni vista;
- nessun arto duplicato/fuso/mancante;
- retro, profili e intermedi realmente leggibili;
- alta risoluzione, adatta a ricavare una sorgente Live2D mobile di qualità.