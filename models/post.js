const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Titulo do game é obrigatório'],
    unique: true,
  },
  categoria: {
    type: String,
    required: [true, 'Categoria do game é obrigatória'],
  },
  thumbnail: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Post', PostSchema);