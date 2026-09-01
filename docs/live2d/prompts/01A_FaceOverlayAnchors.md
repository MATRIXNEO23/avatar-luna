# Luna Live2D — Face Overlay / Anchor Lock

## Scopo
Definire come occhi, sopracciglia e bocca separati verranno sovrapposti al volto del rig senza rifare le Tavole A/B.

## Principio
Le Tavole A/B sono reference geometriche di rotazione, NON sprite finali da usare così come sono nel runtime.
Nel PSD/rig finale il volto deve essere composto da layer separati:
- `FaceBase` / pelle del volto;
- `EyeL` e relativi componenti;
- `EyeR` e relativi componenti;
- `BrowL`;
- `BrowR`;
- `MouthBase` / labbra / interno bocca / denti / lingua se necessari al lip-sync;
- eventuali highlight/ombre facciali separati solo se utili al rig.

## Anchor metrici obbligatori
Tutti gli anchor sono derivati dalla METRIC MASTER e appartengono allo stesso sistema metrico globale.
Non inventare coordinate arbitrarie e non riscalare occhi/bocca per adattarli a ogni posa.

Per la frontale 0° registrare almeno:
- centro occhio L;
- centro occhio R;
- angoli interno/esterno di entrambi gli occhi;
- centro iride/pupilla L/R;
- pivot palpebra superiore/inferiore L/R;
- centro sopracciglia L/R;
- angoli bocca L/R;
- centro bocca;
- linea labbro superiore/inferiore;
- punta naso;
- centro mento;
- asse verticale del volto.

## Trasformazione sulle viste A/B
Gli stessi landmark devono essere tracciabili sulle viste:
`0° / 22.5° L / 45° L / 90° L / 135° L / 180° / 135° R / 90° R / 45° R / 22.5° R`.

Regole:
- occhi e bocca NON restano fissi sul canvas: seguono il `Head Deformer`;
- scala, posizione e prospettiva cambiano tramite deformazione/keyform, non tramite sostituzione di sprite full-body;
- sul profilo 90° l'occhio lontano può essere fortemente compresso o occultato; non va forzato visibile;
- a 135°/180° gli elementi facciali frontali possono diventare completamente occultati;
- usare mask/opacity/occlusion coerenti con la geometria della testa;
- nessun mirroring automatico dell'occhio sinistro per creare il destro: L/R restano asset distinti.

## Relazione con Pitch e diagonali
Gli anchor facciali devono essere compatibili anche con:
- pitch `DOWN / NEUTRAL / UP`;
- combinazioni diagonali X+Y;
- gaze indipendente;
- blink;
- lip-sync.

La posizione finale di occhi e bocca è quindi funzione del deformer della testa e dei parametri facciali, non di coordinate 2D fisse.

## Validazione overlay
Prima di approvare occhi/bocca separati:
1. derivare dimensioni e anchor dalla METRIC MASTER;
2. sovrapporre i componenti alla frontale 0° senza scaling non uniforme;
3. verificare 22.5°/45°/90° L e R con keyform/deformazione;
4. verificare pitch up/down;
5. controllare che nessun componente 'galleggi', slitti o esca dalla maschera del volto;
6. scartare se per far combaciare serve deformazione arbitraria non prevista dal rig.

## Regola operativa
NON rigenerare Tavola A/B per questa funzione. Si estraggono/registrano landmark e anchor dalle reference già accettate e si costruiscono i layer facciali separati su quella geometria.
