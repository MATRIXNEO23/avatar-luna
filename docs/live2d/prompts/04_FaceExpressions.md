# Luna Live2D — Prompt 04: Face Expressions

## Scopo
Creare una tavola facciale ad alta risoluzione per espressioni, emozioni e registri del rig senza alterare la struttura del volto.

## Prompt
Usa `LUNA master.png` e la METRIC MASTER approvata. Mantieni invariati struttura del viso, forma degli occhi, iridi viola, sopracciglia, naso, labbra, carnagione, orecchie e attaccatura dei capelli. NON cambiare pettinatura, età apparente o stile grafico.

PROPORTION LOCK: le emozioni modificano parametri ed espressione, non anatomia o identità.

Questa tavola deve mostrare SOLO close-up grandi testa/spalle, tutti alla stessa scala e perfettamente coerenti. Nessun volto deve essere tagliato su capelli, mento o orecchie.

Espressioni richieste:
1. neutral;
2. happy;
3. smile;
4. shy / embarrassed;
5. angry;
6. surprised;
7. sad;
8. worried;
9. focused;
10. flirty;
11. sensual;
12. provocative/intense adult expression.

Aggiungi inoltre uno slot tecnico etichettato `erotic_explicit` come stato di mapping per Matrix Engine, rappresentato soltanto come espressione adulta intensa senza atti sessuali o contenuto grafico.

Ogni variante deve differire tramite sopracciglia, apertura palpebre, sguardo, forma bocca, lieve inclinazione della testa e blush. NON modificare la geometria fondamentale del volto.

### CLEAN HEAD LOCK
Questa tavola deve essere completamente priva di accessori dinamici. NON mostrare orecchini, collane, pendenti, catene, charms o accessori capelli mobili, neppure come overlay o riferimento.

Le orecchie, i capelli e la pelle normalmente coperti dagli accessori devono essere disegnati completi e puliti. Tutti gli accessori dinamici e le loro varianti di posizione vengono prodotti esclusivamente nel Prompt 09.

Mantieni entrambi gli occhi sempre presenti e coerenti. Alta risoluzione del volto, bordi puliti e texture nitide.

## Criteri di accettazione
- volto identico in tutte le espressioni;
- entrambi gli occhi presenti e coerenti;
- SAD/tristezza distinta;
- flirt/sensual/provocative distinti senza cambiare identità;
- nessun crop;
- nessun accessorio dinamico visibile;
- zone sottostanti complete;
- nessuna espressione ottenuta cambiando personaggio o proporzioni;
- tavola abbastanza grande da usare come reference reale per sopracciglia, occhi e bocca Live2D.
