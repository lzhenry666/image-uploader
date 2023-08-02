import express from 'express';
import multer, { diskStorage } from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path'; // Adicionei 'extname' aqui
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use('/uploads', express.static(join(__dirname, './uploads')));

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, join(__dirname, './uploads'));
    },
    filename: (req, file, cb) => {
        const ext = extname(file.originalname); // Corrigido para usar 'extname'

        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    res.status(200).json({
        message: 'Imagem enviada com sucesso',
        url: `/uploads/${req.file.filename}`
    });
});


app.get('/upload', (req, res) => {
    res.status(200).json({
        url: `/uploads/${req.file.filename}`
    });
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000  ');
    console.log('http://localhost:5000');
});
