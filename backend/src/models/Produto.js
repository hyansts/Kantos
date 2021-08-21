const mongoose = require('mongoose');

//Cria schema da tabela do banco no mongoose
const ProdutoSchema = new mongoose.Schema({
    nome: String,
    vendedor: {
        nome_lanchonete: String,
        endereco: String,
        contato: String,
        horario: String,
    },
    preco: {type: Number, min: 0},
    quantidade: { type: Number, min: 0 },
    categorias: [String],
    imagem: String,
},

{
    timestamps: true //cria campos createdAt e updatedAt
});

module.exports = mongoose.model('Produto', ProdutoSchema);