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
const axios_1 = __importDefault(require("axios"));
const calculosController_1 = __importDefault(require("./controllers/calculosController"));
const HomeController_1 = __importDefault(require("./controllers/HomeController"));
const path_1 = __importDefault(require("path"));
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
// Router para agrupar todas las rutas de la API
const apiRouter = express_1.default.Router();
apiRouter.post("/calculos", calculosController_1.default.calcular);
apiRouter.get("/", HomeController_1.default.home);
apiRouter.post("/tasas", HomeController_1.default.updateTasa);
apiRouter.get("/docs", HomeController_1.default.docs);
apiRouter.get("/debug", async (req, res) => {
    try {
        const url = "https://ve.dolarapi.com/v1/dolares/oficial";
        const response = await axios_1.default.get(url);
        res.json({
            success: true,
            data: response.data
        });
    }
    catch (error) {
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
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/dist')));
// 2. Servir el frontend para cualquier ruta que no sea de la API
app.get(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../frontend/dist/index.html'));
});
/** LISTENER */
app.listen(port, "0.0.0.0", () => {
    console.log(`✅ Servidor ejecutándose en: http://localhost:${port}`);
    console.log(`📖 Swagger docs en: http://localhost:${port}/api-docs`);
    console.log(`📝 Documentación README en: http://localhost:${port}/docs`);
    console.log(`🏠 Home API en: http://localhost:${port}/home`);
});
exports.default = app;
