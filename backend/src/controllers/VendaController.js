const Venda= require('../models/Venda');

module.exports = {

    //busca todas as vendas de uma lanchonete
    async index(req, res) {
        //recupera as vendas e popula o campo cliente com seus nomes
        const vendas = await Venda.find({nome_lanchonete: req.params.id})
            .populate('produtos.produto').populate('cliente','nome').sort({'createdAt': 'desc'});
        return res.json(vendas);
    },

    //busca relatorio de vendas de uma lanchonete
    async relatorio(req, res) {
        //recupera as vendas e popula o campo cliente com seus nomes
        const vendas = await Venda.find({ 
            nome_lanchonete: req.params.id,
            'createdAt': {
                $gt: req.params.startDate,
                $lt: req.params.endDate
            }
         }).populate('produtos.produto').populate('cliente', 'nome').sort({ 'createdAt': 'desc' });
        return res.json(vendas);
    },

    //busca todas os peridos de um cliente
    async pedidos(req, res) {
        const vendas = await Venda.find({ cliente: req.params.id })
            .populate('produtos.produto').sort({'createdAt':'desc'});
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
            nome_lanchonete, 
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
            nome_lanchonete,
            endereco_de_entrega,
            horario_de_entrega,
            para_entrega,
        });

        return res.json(venda);
    },

    async update_status(req, res) {
        const venda = await Venda.findById(req.params.id)
            .populate('produtos.produto').populate('cliente', 'nome');
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