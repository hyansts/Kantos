const mongoose = require('mongoose');

//Cria schema da tabela do banco no mongoose
const UsuarioSchema = new mongoose.Schema({
    nome: String,
    email: {type: String, unique: true},
    senha: String,
},

{
    timestamps: true //cria campos createdAt e updatedAt
});

module.exports = mongoose.model('Usuario', UsuarioSchema);