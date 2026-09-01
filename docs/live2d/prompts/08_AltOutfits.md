# Luna Live2D — Prompt 08: Alternate Outfits

## Scopo
Creare outfit alternativi modulari senza alterare corpo, volto, capelli o rig base di Luna.

## Prompt
Usa `LUNA master.png` e la METRIC MASTER approvata. Mantieni invariati volto, occhi viola, capelli nero-viola, proporzioni del corpo, carnagione, altezza apparente e silhouette base.

Genera **UN SOLO OUTFIT ALTERNATIVO PER TAVOLA**. NON mischiare più outfit nello stesso foglio.

Per l’outfit scelto crea almeno:
1. frontale full-body;
2. INTERMEDIO L ~22.5°;
3. 3/4 sinistra;
4. profilo sinistro;
5. retro;
6. profilo destro;
7. 3/4 destra;
8. INTERMEDIO R ~22.5°;
9. un riferimento supino completo se l’outfit verrà usato in scene a terra/letto.

Se il foglio diventa troppo affollato, dividere le viste in più tavole coordinate. Mai comprimere o tagliare.

Tutte le figure devono essere complete dalla punta dei capelli ai piedi, con mani, scarpe e almeno 12–15% di margine.

L’outfit deve condividere lo stesso body rig del modello principale. Evita cambi anatomici per adattare il vestito.

### Parti statiche/deformabili
Le parti tessili o rigide che seguono il corpo possono costituire layer outfit separati dal body ma non richiedono physics indipendente se non previsto.

### Accessori dinamici
Qualunque elemento che deve oscillare o spostarsi rispetto al corpo — collane, catene, pendenti, orecchini, charms, cordini, fiocchi pendenti, gemme sospese, accessori capelli — deve essere **separato dall'outfit statico**.

Per ogni vista/posa richiesta, inclusi INTERMEDIO L/R e riferimento supino, devono essere previste:
- **BASE CLEAN** senza accessori dinamici fusi;
- **ACCESSORY POSITION MAP** della stessa posa.

Gli oggetti devono mantenere identità, dimensione e punto di ancoraggio, ma cambiare orientamento/prospettiva in base alla posa e alla gravità.

La zona del corpo/outfit coperta dall'accessorio deve essere ricostruita completamente.

## Criteri di accettazione
- un solo outfit per tavola;
- corpo e volto identici alla METRIC MASTER;
- INTERMEDIO L/R presenti;
- front/side/back coerenti;
- riferimento supino incluso quando necessario;
- nessun crop;
- accessori dinamici separati;
- ACCESSORY POSITION MAP per ogni vista/posa;
- compatibilità con lo stesso rig base Live2D.