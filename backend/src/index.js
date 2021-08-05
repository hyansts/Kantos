//importa express para criar e manipular o servidor
const express = require ('express');
//importa mongoose para conectar com o banco de dados nao relacional mongoDB
const mongoose = require('mongoose');
//importa parser para form urlencoded
const bodyParser = require('body-parser');

const path = require('path');
const cors = require('cors');

//cria servidor
const app = express();

//configura o servidor para receber conexoes http e websocket
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});


//conecta com o banco - usuario: hyan / senha: eQbKOftPSNdy5U03
mongoose.connect('mongodb+srv://hyan:eQbKOftPSNdy5U03@cluster0.70ti5.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//atribui o io na requisicao
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname,'..','uploads', 'resized')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes'));

//escuta uma porta qualquer
server.listen(3333);

