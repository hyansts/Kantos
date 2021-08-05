const Venda= require('../models/Venda');

module.exports = {

    //busca todas as vendas
    async index(req, res) {
        const vendas = await Venda.find().populate('produtos.produto');
        return res.json(vendas);
    },

    //salva uma venda
    async store(req, res) {
        const { 
            produtos, 
            cliente, 
            precoTotal, 
            forma_de_pagamento,
            troco, 
            endereco_de_entrega, 
            horario_de_entrega,
            para_entrega, 
        } = req.body;

        const venda = await Venda.create({
            produtos,
            cliente, 
            precoTotal,
            forma_de_pagamento,
            troco,
            endereco_de_entrega,
            horario_de_entrega,
            para_entrega,
        });

        return res.json(venda);
    },

    async update_status(req, res) {
        const venda = await Venda.findById(req.params.id);
        const { pedido_status } = req.body;
        if(pedido_status) venda.pedido_status = pedido_status;
        await venda.save();
        return res.json(venda);
    },
    
    async cancel(req, res) {
        const venda = await Venda.findByIdAndDelete(req.params.id);
        return res.json(venda);
    },

}