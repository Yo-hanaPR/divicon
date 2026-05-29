"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;

// Se eliminó la línea de require("marked") que causaba el crash en Vercel
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const tasas_1 = __importDefault(require("../services/tasas"));

exports.HomeController = {
    // 1. Agregamos async aquí
    home: async (req, res) => {
        res.json({
            success: true,
            message: "Bienvenido a la API de Conversión de Divisas",
            subtitle: "Tasas de cambio",
            text: 'En esta aplicación podrás convertir montos entre bolívares...',
            version: "1.0.0",
            tasas: tasas_1.default
        });
    },

    // 2. Agregamos async aquí
    docs: async (req, res) => {
        try {
            console.log('Entra aqui?');
            // Leer el archivo markdown
            const docsPath = path_1.default.join(__dirname, '../frontend/docs.md');
            const markdownContent = fs_1.default.readFileSync(docsPath, 'utf-8');
            
            // 3. Importación dinámica compatible con ES Modules desde CommonJS
            const { marked } = await import('marked');
            
            // 4. Convertir markdown a HTML usando la nueva constante
            const htmlContent = marked.parse(markdownContent);
            
            // Crear una página HTML completa con estilos
            const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentación de la API</title>
</head>
<body>
    ${htmlContent}
</body>
</html>`;
            
            res.send(fullHtml);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al cargar la documentación");
        }
    }
};