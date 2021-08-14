const express = require('express');
//biblioteca para lidar com multipart form, enviar e ler os dados, fotos, etc.
const multer = require('multer');

//importa configs do multer para upload da imagem
const uploadConfig = require('./config/upload.js');
//importa controller dos produtos
const ProdutoController = require('./controllers/ProdutoController.js');
//importa controller dos usuarios
const UsuarioController = require('./controllers/UsuarioController.js');
//importa controller das vendas
const VendaController = require('./controllers/VendaController.js');
//importa controller dos gerentes de lanchonete
const GerenteLanchoneteController = require('./controllers/GerenteLanchoneteController.js');

//cria objeto para gerenciar as rotas
const routes = new express.Router();
//instancia o multer para enviar a imagem
const upload = multer(uploadConfig);

// CRUD dos produtos
routes.get('/produtos', ProdutoController.index);
routes.post('/produtos/categorias', ProdutoController.filtrarPorCategoria);
routes.post('/produtos/lanchonetes', ProdutoController.filtrarPorLanchonete);
routes.post('/produtos', upload.single('image'), ProdutoController.salvar);
routes.post('/produtos/:id/estoque', ProdutoController.adicionarEstoque);
routes.delete('/produtos/:id/deletar', ProdutoController.deletar);

// CRUD dos usuarios
routes.get('/usuario/:id/perfil', UsuarioController.index);
routes.put('/usuario/:id/editar', UsuarioController.edit);
routes.post('/usuario', UsuarioController.store);

// CRUD dos gerentes de lanchonetes
routes.get('/lanchonete/:id/perfil', GerenteLanchoneteController.index);
routes.put('/lanchonete/:id/editar', GerenteLanchoneteController.edit);
routes.post('/lanchonete', GerenteLanchoneteController.store);

// CRUD das vendas
routes.get('/vendas', VendaController.index);
routes.put('/vendas/:id/confirmar', VendaController.update_status);
routes.post('/vendas', VendaController.store);
routes.delete('/vendas/:id/cancelar', VendaController.cancel);

module.exports = routes;