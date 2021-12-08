//  multer - Deletar Thumbnail Inválida

const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

const deleteThumbnail = async (attachPath) => {
  if (!attachPath) return;
  await unlinkAsync(attachPath);
};

module.exports = deleteThumbnail;