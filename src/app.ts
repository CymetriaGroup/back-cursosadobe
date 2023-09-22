import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { logger } from "./tools"
import cursoRoutes from './routes/newcurso.route';
import clienteRoutes from './routes/cliente.route';
import multer from 'multer';
import fs from 'fs'
import path from 'path'
const app = express();

app.set('trust proxy', true)
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', cursoRoutes);
app.use('/api', clienteRoutes);
app.use(function (err: any, req: any, res: any, next: any) {
  logger(err);
  res.status(500).send('Ocurrió un error en el servidor');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        fs.mkdirSync('uploads/', { recursive: true })

        cb(null, 'uploads/')

    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)

    }
})

const upload = multer({ storage: storage });

app.post('/api/upload/', upload.single('file'), (req, res) => {
  try {
    const file = req.file;

    // Verifica si se cargó un archivo
    if (!file) {
      throw new Error('No File');
    }

    // Envía el archivo como respuesta
    res.send(file);
  } catch (error:any) {
    console.error('Error en la carga de archivos:', error.message);
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/download/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const directoryPath = path.join(__dirname ,'../uploads/')

    console.log(directoryPath+filename);

    // Verifica si el archivo existe
    if (!fs.existsSync(directoryPath + filename)) {
      throw new Error('File not found');
    }

    // Envía el archivo como respuesta
    const filePath = directoryPath + filename;
    res.sendFile(filePath);
  } catch (error:any) {
    console.error('Error en la descarga de archivos:', error.message);
    res.status(400).json({ message: error.message });
  }
});



app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
}
);