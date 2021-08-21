const Usuario = require('../models/Usuario');

module.exports = {

    //busca um usuario por id
    async index(req, res) {
        const usuario = await Usuario.findById(req.params.id, '-senha');
        return res.json(usuario);
    },

    //autentica login
    async login(req, res) {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({email, senha});
        if (usuario && usuario.email === email && usuario.senha === senha) 
        {
            const userInfo = {
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario?.tipo,
                id: usuario._id
            }
            return res.json(userInfo);
        }
        else return res.json(false);
    },

    //salva um usuario comum
    async store(req, res) {
        const { nome, email, senha } = req.body;
        let userInfo = null;
        try{
            const usuario = await Usuario.create({
                nome, email, senha
            });

            userInfo = {
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario?.tipo,
                id: usuario._id
            }

        }  catch (e) {
            return res.json(false);
        }   
        return res.json(userInfo);
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