const express = require('express');
const multer = require('multer');

const verificaSession = require('./middlewares/verificaSession');
const Usuario = require('./controllers/usuario');
const Post = require('./controllers/post');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './thumbnails')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
});

const app = express();
const upload = multer({ storage: storage });

//################# VIEWS ###################

//Rota -> Vai para o index.html -> Página principal do projeto
app.get('/', function (req, res) {
  res.redirect('/views/index.html');
})

//Número de visualizações do index.html
app.get('/visualizacoes', function (req, res) {
  res.status(200).json(req.session.views['/views/index.html']);
})

app.get('/num_post', function (req, res) {
  res.status(200).json(req.session.num_post);
})

//################# SESSIONS ###################
//Verifica se uma sessão é válida e retorna flag de administrador
app.get('/usuario_logado', verificaSession, function (req, res) {
  res.status(200).json(req.session.user.admin);
})

//Verifica se uma sessão é válida e destroi - Logout
app.get('/usuario_logout', verificaSession, function (req, res) {
  req.session.destroy();
  res.redirect('/views/index.html');
})

//################# CONTROLLER ###################
//Faz Login de Usuário: OK - Completo
app.post('/usuario/login', Usuario.login);

//Faz Cadastro novo usuário: OK - Completo
app.post('/usuario/cadastrar', Usuario.cadastrar);

//Buscas as postagens (Todas ou Filtradas por categoria): OK - Completo
app.get('/posts', verificaSession, Post.postagens);

//Cria uma nova postagem: OK - Completo
/**
 * Salvar Imagens com Multer e AXIOS
 * @see https://pt.stackoverflow.com/questions/420362/upload-de-imagem-com-axios-para-um-servidor-node-js
 */
app.post('/posts/novopost', verificaSession, upload.single('thumbnail'), Post.novopost);

module.exports = app;