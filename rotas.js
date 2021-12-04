const express = require('express');
const verificaSession = require('./middlewares/verificaSession');
const Usuario = require('./controllers/usuario');

const app = express();

//################# SESSIONS ###################
//Verifica se uma sessão é válida e retorna flag de administrador
app.get('/usuario_logado', verificaSession, function (req, res) {
  res.status(200).json(req.session.user.admin);
})

//Verifica se uma sessão é válida e destroi - Logout
app.get('/usuario_logout', verificaSession, function (req, res) {
  req.session.destroy();
  res.redirect('/');
})

//################# CONTROLLER ###################
//Faz Login de Usuário: OK - Completo
app.post('/usuario/login', Usuario.login);

//Faz Cadastro novo usuário: OK - Completo
app.post('/usuario/cadastrar', Usuario.cadastrar);

module.exports = app;