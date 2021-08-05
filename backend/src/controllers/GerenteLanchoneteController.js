const GerenteLanchonete = require('../models/GerenteLanchonete');

module.exports = {

    //busca um usuario gerente por id
    async index(req, res) {
        const gerente = await GerenteLanchonete.findById(req.params.id);
        return res.json(gerente);
    },

    //salva um usuario gerente
    async store(req, res) {
        const { nome, email, senha, nome_lanchonete, endereco, contato } = req.body;

        const gerente = await GerenteLanchonete.create({
            nome, email, senha, nome_lanchonete, endereco, contato
        });

        //if(req.io)req.io.emit('comment', post);

        return res.json(gerente);
    },

    //edita um usuario gerente
    async edit(req, res) {
        const gerente = await GerenteLanchonete.findById(req.params.id);

        const { nome, email, senha, nome_lanchonete, endereco, contato } = req.body;

        if (nome) gerente.nome = nome;
        if (email) gerente.email = email;
        if (senha) gerente.senha = senha;
        if (nome_lanchonete) gerente.nome_lanchonete = nome_lanchonete;
        if (endereco) gerente.endereco = endereco;
        if (contato) gerente.contato = contato;
        await gerente.save();

        //if(req.io)req.io.emit('comment', post);

        return res.json(gerente);
    }
}