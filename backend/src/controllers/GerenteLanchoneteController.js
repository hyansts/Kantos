const GerenteLanchonete = require('../models/GerenteLanchonete');
//importa biblioteca para redimensionar imagens
const sharp = require('sharp');
//importa biblioteca para resolver o pathing
const path = require('path');
//importa biblioteca do file system
const fs = require('fs');

module.exports = {

    //busca um usuario gerente por id
    async index(req, res) {
        const gerente = await GerenteLanchonete.findById(req.params.id);
        return res.json(gerente);
    },

    //busca info de todas lanchonetes
    async getLanchonetes(req, res) {
        const gerente = await GerenteLanchonete.find({},
             "nome_lanchonete endereco contato horario imagem");
        return res.json(gerente);
    },

    //salva um usuario gerente
    async store(req, res) {
        const { nome, email, senha, nome_lanchonete, endereco, contato, horario } = req.body;

        const { filename: image } = req.file;

        //separa o nome da imagem da extencao
        const [name] = image.split('.');
        const fileName = name + '.jpg';

        //redimensiona e salva a imagem recebida
        await sharp(req.file.path).resize(500).jpeg({ quality: 70 }).toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        );

        const gerente = await GerenteLanchonete.create({
            nome, email, senha, nome_lanchonete, endereco, 
            contato, horario, imagem: fileName
        });

        //if(req.io)req.io.emit('comment', post);

        return res.json(gerente);
    },

    //edita um usuario gerente
    async edit(req, res) {
        const gerente = await GerenteLanchonete.findById(req.params.id);

        const { nome, email, senha, nome_lanchonete, 
            endereco, contato, horario } = req.body;

        if (nome) gerente.nome = nome;
        if (email) gerente.email = email;
        if (senha) gerente.senha = senha;
        if (nome_lanchonete) gerente.nome_lanchonete = nome_lanchonete;
        if (endereco) gerente.endereco = endereco;
        if (contato) gerente.contato = contato;
        if (horario) gerente.horario = horario;
        await gerente.save();

        //if(req.io)req.io.emit('comment', post);

        return res.json(gerente);
    }
}