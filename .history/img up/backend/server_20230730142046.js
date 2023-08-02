import express from 'express';
import multer, { diskStorage } from 'multer';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './backend/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});


const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    res.status(200).json({
        message: 'Imagem enviada com sucesso',
        url: `/backend/uploads/${req.file.filename}`
    });
});


app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000  ');
    console.log('http://localhost:5000');
});
