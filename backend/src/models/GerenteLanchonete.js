const mongoose = require('mongoose');

//Cria schema da tabela do banco no mongoose
const GerenteLanchoneteSchema = new mongoose.Schema({
    nome: String,
    email: {type: String, unique: true},
    senha: String,
    nome_lanchonete: { type: String, unique: true },
    endereco: String,
    contato: String,
    horario: String,
    imagem: String,
},

{
    timestamps: true //cria campos createdAt e updatedAt
});

module.exports = mongoose.model('GerenteLanchonete', GerenteLanchoneteSchema);