const Post = require('../models/post');
const Usuario = require('../models/usuario');
const Banco = require('../models/banco');
const deleteThumbnail = require('../middlewares/deleteThumbnail');

module.exports = {

  postagens(req, res) {
    Banco.connect().then(() => {
      const { categoria } = req.query;
      let filtro = {};
      if (categoria)
        filtro = { categoria: new RegExp(categoria, 'i') };

      Post.find(filtro).sort({ _id: -1 })
        .then(posts => res.status(200).json(posts))
        .catch(erro => res.status(400).json({ message: erro.message }))
    })
      .catch(erro => res.status(400).json({ message: erro.message }));
  },

  async novopost(req, res) {
    const { titulo, categoria, thumbnail } = req.body;

    Banco.connect().then(() => {
      if (!req.session.user.admin) {
        deleteThumbnail(req.file?.path);
        return res.status(401).json({ message: 'Este usuário não é admin! Acesso negado!' });
      }
      const post = new Post({ titulo, categoria, thumbnail: req.file?.path || null });
      if (!req.file?.mimetype.match(/image/i)) {
        deleteThumbnail(req.file?.path);
        return res.status(400).json({ message: 'Thumbnail deve ser uma imagem!' });
      }
      post.save().then(post => {
        req.session.num_post = (req.session.num_post || 0) + 1;
        return res.status(200).json({ message: 'Game salvo!' });
      })
        .catch(erro => {
          deleteThumbnail(req.file?.path);
          if (erro.code === 11000)
            return res.status(400).json({ message: 'Game com esse titulo já existente!' });
          return res.status(400).json({
            message: erro.errors?.titulo?.message || erro.errors?.categoria?.message || erro.message
          })
        });
    })
      .catch(erro => res.status(400).json({ message: erro.message }));
  }

}