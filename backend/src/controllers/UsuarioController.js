const Usuario = require('../models/Usuario');

module.exports = {

    //busca um usuario por id
    async index(req, res) {
        const usuario = await Usuario.findById(req.params.id);
        return res.json(usuario);
    },

    //salva um usuario comum
    async store(req, res) {
        const { nome, email, senha } = req.body;

        const usuario = await Usuario.create({
            nome, email, senha
        });

        //if(req.io)req.io.emit('comment', post);

        return res.json(usuario);
    },

    //edita um usuario comum
    async edit(req, res) {
        const usuario = await Usuario.findById(req.params.id);

        const { nome, email, senha } = req.body;

        if(nome) usuario.nome = nome;
        if(email) usuario.email = email;
        if(senha) usuario.senha = senha;

        await usuario.save();

        //if(req.io)req.io.emit('comment', post);

        return res.json(usuario);
    }
}