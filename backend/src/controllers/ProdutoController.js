const Produto = require('../models/Produto');
//importa biblioteca para redimensionar imagens
const sharp = require('sharp');
//importa biblioteca para resolver o pathing
const path = require('path');
//importa biblioteca do file system
const fs = require('fs');


module.exports = {
    
    //busca todos os produtos
     async index(req, res) {
        const produtos = await Produto.find();
        return res.json(produtos);
    },

    //salva um produto e sua imagem
    async salvar(req, res) {

        const { nome, vendedor_nome_lanchonete, vendedor_endereco, vendedor_contato, 
            vendedor_horario, preco, quantidade, categorias } = req.body;

        const { filename: image } = req.file;

        const vendedor = {
            nome_lanchonete: vendedor_nome_lanchonete,
            endereco: vendedor_endereco,
            contato: vendedor_contato,
            horario: vendedor_horario,
        };

        //transforma string de categorias em array
        const categoriasArr = categorias.split(' ');

        //separa o nome da imagem da extencao
        const [name] = image.split('.');
        const fileName = name + '.jpg';

        //redimensiona e salva a imagem recebida
        await sharp(req.file.path).resize(500).jpeg({quality:70}).toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        );

        //deleta a imagem com tamanho original
        //fs.unlinkSync(req.file.path);

        const produto = await Produto.create({
            nome, vendedor, preco, quantidade, categorias: categoriasArr, imagem: fileName
        });

        //if(req.io)req.io.emit('post', post);

        res.json(produto);
    },

    //editar produto ao estoque
     async editarEstoque(req, res) {
        const produtos = await Produto.findById(req.params.id);
        const { quantidade } = req.body;
        produtos.quantidade = Number(quantidade);
        await produtos.save();
        return res.json(produtos);
    },

    async filtrarPorCategoria(req, res) {
        const { categorias } = req.body;
        const produtos = await Produto.find({ categorias: { $all: categorias } });
        return res.json(produtos);
    },

    async filtrarPorLanchonete(req, res) {
        const produtos = await Produto.find({ 'vendedor.nome_lanchonete': req.params.id });
        return res.json(produtos);
    },

    async deletar(req, res) {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        return res.json(produto);
    },
}