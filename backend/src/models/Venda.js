const mongoose = require('mongoose');

//Cria schema da tabela do banco no mongoose
const VendaSchema = new mongoose.Schema({
    produtos: [{
        produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
        quantidade: Number,
    }],
    cliente: mongoose.Schema.Types.ObjectId,
    precoTotal: Number,
    pedido_status: {type: String, default: 'Em processamento'},
    forma_de_pagamento: String,
    troco: String,
    endereco_de_entrega: String,
    horario_de_entrega: { type: Date, default: Date.now },
    para_entrega: {type: Boolean, default: false},
},

{
    timestamps: true //cria campos createdAt e updatedAt
});

module.exports = mongoose.model('Venda', VendaSchema);