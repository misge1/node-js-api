const express = require('express');
const app = express();

app.use(express.json());

const agendas = [
    { id: 1, titulo: 'reunion AFA', dia: 21, mes: 09, anyo: 2022 },
    { id: 2, titulo: 'inicio de curso', dia: 15, mes: 09, anyo: 2022 },
    { id: 3, titulo: 'excursión al museo', dia: 10, mes: 10, anyo: 2022 },
];

app.get('/', (req, res) => {
    res.send('Node JS api');
});

app.get('/api/agendas', (req, res) => {
    res.send(agendas);
});

app.get('/api/agendas/:id', (req, res) => {
    const agenda = agendas.find(c => c.id === parseInt(req.params.id));
    if (!agenda) return res.status(404).send('Evento no encontrado');
    else res.send(agenda)
});


app.post('/api/agendas', (req, res) => {
    const agenda = {
        id: agendas.length + 1,
        titulo: req.body.titulo,
        dia: parseInt(req.body.dia),
        mes: parseInt(req.body.mes),
        anyo: parseInt(req.body.anyo),
    };

    agendas.push(agenda);
    res.send(agenda);

});


app.delete('/api/agendas/:id', (req, res) => {
    const agenda = agendas.find(c => c.id === parseInt(req.params.id));
    if (!agenda) return res.status(404).send('Evento no encontrado');

    const index = agendas.indexOf(agenda);
    agendas.splice(index, 1);
    res.send(agenda);

});


const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));