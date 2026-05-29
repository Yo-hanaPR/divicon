"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** SETTINGS */
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const cors_1 = __importDefault(require("cors"));
const calculosController_1 = __importDefault(require("./controllers/calculosController"));
const HomeController_1 = __importDefault(require("./controllers/HomeController"));
const port = 3000;
dotenv_1.default.config();
const app = (0, express_1.default)();
/**
 * MIDDLEWARES
 */
app.use((0, cors_1.default)({
    origin: ['http://localhost:5174', 'http://192.168.68.65:5174'], // Esta es la URL de tu frontend. Aqui se configuran los accesos que CORS permite
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// ============================================
// Tasas de cambio
// ============================================
// Usando el servicio consolidado tasas.ts
/**
 * FUNCIONES
 */
/**
 * @swagger
 * /calculos:
 *   post:
 *     summary: Realiza cálculos de conversión de divisas
 *     description: Endpoint para convertir entre diferentes monedas usando tasas de cambio actuales
 *     tags:
 *       - Conversión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monto:
 *                 type: number
 *                 description: Monto a convertir
 *                 example: 100
 *               monedaOrigen:
 *                 type: string
 *                 description: Moneda de origen
 *                 example: "bolivares"
 *               monedaDestino:
 *                 type: string
 *                 description: Moneda de destino
 *                 example: "dolares"
 *     responses:
 *       200:
 *         description: Conversión realizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 resultado:
 *                   type: number
 *       400:
 *         description: Error en los parámetros de entrada
 */
app.post("/calculos", calculosController_1.default.calcular);
/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint raíz de la API
 *     description: Devuelve información sobre la API y lista de endpoints disponibles
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: Información básica de la API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "API de Conversión de Divisas"
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     home:
 *                       type: string
 *                       example: "GET /home"
 *                     calculos:
 *                       type: string
 *                       example: "POST /calculos"
 *                     swagger:
 *                       type: string
 *                       example: "GET /api-docs"
 */
// Ruta de prueba
app.get("/", HomeController_1.default.home);
app.post("/tasas", HomeController_1.default.updateTasa);
/**
 * @swagger
 * /docs:
 *   get:
 *     summary: Documentación del sistema en formato README
 *     description: Renderiza el archivo documentacion.md como una página HTML estilizada
 *     tags:
 *       - Documentación
 *     responses:
 *       200:
 *         description: Página de documentación renderizada
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       404:
 *         description: Archivo de documentación no encontrado
 */
app.get("/docs", HomeController_1.default.docs);
/** LISTENER */
app.listen(port, "0.0.0.0", () => {
    console.log(`✅ Servidor ejecutándose en: http://localhost:${port}`);
    console.log(`📖 Swagger docs en: http://localhost:${port}/api-docs`);
    console.log(`📝 Documentación README en: http://localhost:${port}/docs`);
    console.log(`🏠 Home API en: http://localhost:${port}/home`);
});
exports.default = app;
