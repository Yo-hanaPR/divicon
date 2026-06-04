/** SETTINGS */
import express from "express";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from 'cors';
import axios from 'axios';
import calculosController from './controllers/calculosController';
import HomeController from './controllers/HomeController';
import tasasCambio from './services/tasas';

import path from 'path';

const port = 3000;
dotenv.config();
const app = express();
/**
 * MIDDLEWARES
 */

app.use(cors({
    origin: ['http://localhost:5174', 'http://192.168.68.65:5174'], // Esta es la URL de tu frontend. Aqui se configuran los accesos que CORS permite
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * SWAGGER CONFIGURATION
 */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Conversión de Monedas',
            version: '1.0.0',
            description: 'API para convertir entre Bolívares, Dólares y Euros usando tasas de cambio específicas.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
    },
    apis: ['./src/controllers/*.ts', './src/index.ts'], // Archivos con documentación JSDoc/Swagger
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// ============================================
// Tasas de cambio
// ============================================
// Usando el servicio consolidado tasas.ts

/**
 * FUNCIONES
 */

// Router para agrupar todas las rutas de la API
const apiRouter = express.Router();

apiRouter.post("/calculos", calculosController.calcular);
apiRouter.get("/", HomeController.home);
apiRouter.post("/tasas", HomeController.updateTasa);
apiRouter.get("/docs", HomeController.docs);
apiRouter.get("/debug", async (req, res) => {
  try {
    const url = "https://ve.dolarapi.com/v1/dolares/oficial";
    const response = await axios.get(url);
    res.json({
      success: true,
      data: response.data
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
      code: error.code,
      stack: error.stack,
      response: error.response ? {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      } : null
    });
  }
});

// Registrar el router bajo /api (para Vercel) y bajo / (para local)
app.use("/api", apiRouter);
app.use("/", apiRouter);

// 1. Decirle a Express dónde están los archivos compilados del frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// 2. Servir el frontend para cualquier ruta que no sea de la API
app.get(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

/** LISTENER */
app.listen(port, "0.0.0.0",() => {
    console.log(`✅ Servidor ejecutándose en: http://localhost:${port}`);
    console.log(`📖 Swagger docs en: http://localhost:${port}/api-docs`);
    console.log(`📝 Documentación README en: http://localhost:${port}/docs`);
    console.log(`🏠 Home API en: http://localhost:${port}/home`);
});

export default app;