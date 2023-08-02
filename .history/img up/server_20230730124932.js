const express = require('express');
const multer  = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    res.status(200).json({
        message: 'Imagem enviada com sucesso',
        url: `/uploads/${req.file.filename}`
    });
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
