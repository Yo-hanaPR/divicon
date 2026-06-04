import { Request, Response } from 'express';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import tasasCambio, { updateRate, ensureRatesUpdated } from '../services/tasas';

export const HomeController = {
    home: async (req: Request, res: Response) => {
        await ensureRatesUpdated();
        res.json({
            success: true,
            message: "Bienvenido a la API de Conversión de Divisas",
            subtitle: "Tasas de cambio y conversiones básicas",
            text: 'En esta aplicación podrás convertir montos entre bolívares, dólares, USDT y tasa euro del BCV según las tasas actuales del mercado.',
            version: "1.0.0",
            tasas: tasasCambio
        });
    },
    docs: (req: Request, res: Response): void => {
        try {
            console.log('Entra aqui?')
            // Leer el archivo markdown
            const docsPath = path.join(__dirname, '../../frontend/documentacion.md');
            const markdownContent = fs.readFileSync(docsPath, 'utf-8');

            // Convertir markdown a HTML
            const htmlContent = marked(markdownContent);

            // Crear una página HTML completa con estilos
            const fullHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentación - API de Conversión de Divisas</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            color: #667eea;
            border-bottom: 3px solid #667eea;
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
            font-size: 2.5rem;
        }
        
        h2 {
            color: #764ba2;
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-size: 1.8rem;
            border-left: 4px solid #764ba2;
            padding-left: 1rem;
        }
        
        h3 {
            color: #555;
            margin-top: 1.5rem;
            margin-bottom: 0.8rem;
            font-size: 1.3rem;
        }
        
        p {
            margin-bottom: 1rem;
            text-align: justify;
        }
        
        code {
            background: #f4f4f4;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            color: #e83e8c;
            font-size: 0.9em;
        }
        
        pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 1.5rem 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        pre code {
            background: transparent;
            color: #f8f8f2;
            padding: 0;
        }
        
        ul, ol {
            margin-left: 2rem;
            margin-bottom: 1rem;
        }
        
        li {
            margin-bottom: 0.5rem;
        }
        
        a {
            color: #667eea;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: border-color 0.3s;
        }
        
        a:hover {
            border-bottom-color: #667eea;
        }
        
        .header-banner {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .header-banner h1 {
            color: white;
            border: none;
            margin: 0;
            font-size: 2rem;
        }
        
        .back-link {
            display: inline-block;
            margin-bottom: 1rem;
            color: #667eea;
            font-weight: 600;
            text-decoration: none;
            transition: transform 0.2s;
        }
        
        .back-link:hover {
            transform: translateX(-5px);
        }
        
        @media (max-width: 768px) {
            body {
                padding: 1rem;
            }
            
            .container {
                padding: 1.5rem;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            h2 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Volver al inicio</a>
        <div class="header-banner">
            <h1>📚 Documentación del Sistema</h1>
        </div>
        ${htmlContent}
    </div>
</body>
</html>
        `;

            res.send(fullHtml);
        } catch (error) {
            res.status(404).json({
                success: false,
                message: "No se pudo cargar la documentación",
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    },
    updateTasa: (req: Request, res: Response) => {
        const { moneda, valor } = req.body;
        
        if (!moneda || valor === undefined) {
            return res.status(400).json({
                success: false,
                message: "Faltan parámetros: moneda y valor son requeridos"
            });
        }

        const numericValue = parseFloat(valor);
        if (isNaN(numericValue)) {
            return res.status(400).json({
                success: false,
                message: "El valor debe ser un número válido"
            });
        }

        const success = updateRate(moneda, numericValue);

        if (success) {
            res.json({
                success: true,
                message: `Tasa de ${moneda} actualizada correctamente`,
                tasas: tasasCambio
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Moneda no válida o error al actualizar"
            });
        }
    }
}


export default HomeController;