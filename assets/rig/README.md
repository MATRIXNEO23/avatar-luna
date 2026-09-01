# Luna layered rig assets

La v0.3 usa automaticamente il rig a livelli quando trova tutti questi PNG trasparenti, perfettamente allineati sullo stesso canvas della base:

- `hair_back.png`
- `body.png`
- `chest.png`
- `head.png`
- `eyes_open.png`
- `eyes_closed.png`
- `mouth_closed.png`
- `mouth_open.png`
- `hair_front.png`

Finché uno o più file mancano, il renderer resta in modalità fallback e usa `luna_08_no_cape.png`, quindi l'avatar continua a funzionare.

## Regole asset

Tutti i livelli devono avere identiche dimensioni, trasparenza PNG e stessa posizione assoluta del personaggio. Non ritagliare ogni parte su un canvas diverso: il sistema sovrappone i livelli 1:1.

Il rig applica fisica indipendente a testa, capelli e torace, blink irregolare e alternanza bocca aperta/chiusa durante lo stato `speaking`. La logica è in `app.js`; le trasformazioni sono in `styles.css`.
