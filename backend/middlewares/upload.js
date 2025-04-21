// Importa o Multer, biblioteca para upload de arquivos
const multer = require('multer');

// Importa o módulo 'path' para manipulação de caminhos de arquivos
const path = require('path');

// Importa o módulo 'fs' para lidar com o sistema de arquivos
const fs = require('fs');

// Define o caminho da pasta de uploads (um nível acima do diretório atual)
const uploadDir = path.join(__dirname, '..', 'uploads');

// Cria a pasta de uploads se ela ainda não existir
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuração do armazenamento dos arquivos
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos serão salvos
    destination: (req, file, cb) => {
        cb(null, uploadDir); // usa a pasta definida acima
    },
    // Define o nome do arquivo que será salvo
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`; // adiciona timestamp para evitar conflitos
        cb(null, uniqueName);
    }
});

// Filtro para aceitar apenas imagens (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/; // tipos permitidos
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase()); // valida a extensão do arquivo
    const mime = allowedTypes.test(file.mimetype); // valida o tipo MIME

    if (ext && mime) {
        cb(null, true); // válido
    } else {
        cb(new Error('Apenas imagens JPG, JPEG e PNG são permitidas')); // rejeita arquivo
    }
};

// Cria a instância do Multer com as configurações de armazenamento, filtro e limite de tamanho
const upload = multer({
    storage, // configura onde e como salvar o arquivo
    fileFilter, // aplica filtro de tipo de arquivo
    limits: {
        fileSize: 5 * 1024 * 1024 // limita o tamanho para 5MB
    }
});

// Exporta a configuração para ser usada nos middlewares de rotas (ex: upload.single('imagem'))
module.exports = upload;