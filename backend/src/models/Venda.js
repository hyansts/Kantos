const mongoose = require('mongoose');

//Cria schema da tabela do banco no mongoose
const VendaSchema = new mongoose.Schema({
    produtos: [{
        produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
        quantidade: Number,
    }],
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    precoTotal: Number,
    pedido_status: {type: String, default: 'Esperando Confirmação'},
    forma_de_pagamento: String,
    troco: Number,
    nome_lanchonete: String,
    endereco_de_entrega: String,
    horario_de_entrega: { type: String, default: 'Agora'},
    para_entrega: {type: Boolean, default: false},
},

{
    timestamps: true //cria campos createdAt e updatedAt
});

module.exports = mongoose.model('Venda', VendaSchema);