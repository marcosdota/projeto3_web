const Banco = require('../models/banco');
const Usuario = require('../models/usuario');

module.exports = {

  cadastrar(req, res) {
    const { login, email, password, confirmPassword } = req.body;
    //Verifica tanto no front quanto no back
    if (password.length < 3 || email.length < 3 || email.length < 3)
      return res.status(400).json({ message: 'Campos devem ter no minimo 3 caracteres' });

    if (password != confirmPassword)
      return res.status(400).json({ message: 'Senhas diferentes!' });

    const usuario = new Usuario({
      login: login,
      email: email,
      password: password
    });

    Banco.connect().then(() => {
      usuario.save()
        .then(() => {
          return res.status(200).json({ message: 'Cadastrado com sucesso!' });
        })
        .catch(erro => {
          //Verificar erros!
          if (erro.code === 11000 && erro.message.indexOf("login") > -1)
            return res.status(400).json({ message: 'Login já existente!' });

          if (erro.code === 11000 && erro.message.indexOf("email") > -1)
            return res.status(400).json({ message: 'Email em utilização!' });

          return res.status(400).json({
            message: erro.message
          });

        });
    })
      .catch(erro => res.status(400).json({ message: erro.message }))
  },

  login(req, res) {
    const { email, password } = req.body;
    Banco.connect().then(() => {
      //console.log("Conectou");
      Usuario.findOne({ email }).then(usuario => {
        if (!usuario)
          return res.status(401).json({ message: 'Usuário inválido (não encontrado)!' });

        if (usuario.password != password)
          return res.status(401).json({ message: 'Senha inválida!' });
        //Seta Session
        req.session.authenticated = true;
        req.session.user = {
          usuarioId: usuario._id,
          admin: usuario.admin
        }
        //console.log(req.sessionID);
        return res.status(200).json(usuario._id);
      })
        .catch(erro => res.status(400).json({ message: erro.message }));
    })
      .catch(erro => res.status(400).json({ message: erro.message }))
  }
}