const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://root:piriquito01@cluster0-vnziw.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// app.use(cors({ origin: 'http://localhost:3000' })); // PARA LIBERAR ACESSO SOMENTE DESTE ENDERECO
app.use(cors()); // PARA LIBERAR ACESSO DE QUALQUER LUGAR
app.use(express.json());
app.use(routes);


app.listen(3333);