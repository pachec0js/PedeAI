import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/imgs/combos');
  },
  filename: function (req, file, cb) {
    const id = req.params.id;
    const extensao = path.extname(file.originalname);
    const novoNome = `combo${id}${extensao}`;
    cb(null, novoNome);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(new Error('Formato de imagem não suportado'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

export default upload;