"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversionService_1 = __importDefault(require("../services/conversionService"));
const calculosController = {
    calcular: (req, res) => {
        try { // atrapa los datos del formulario, los valida y se los pasa al servicio que va a hacer la conversion.. Recibe la respuesta y la manda al cliente.
            console.log("=== DATOS RECIBIDOS ===");
            console.log("Body:", req.body);
            const { monto, moneda } = req.body;
            // Validaciones
            if (!monto || isNaN(monto)) {
                res.status(400).json({
                    success: false,
                    error: "Debe enviar un monto válido",
                });
                return;
            }
            if (!moneda) {
                res.status(400).json({
                    success: false,
                    error: "Debe especificar una moneda",
                });
                return;
            }
            // Lógica de conversión
            const resultado = conversionService_1.default.convertir(moneda, monto);
            // Respuesta exitosa
            res.json({
                success: true,
                ...resultado
            });
        }
        catch (error) {
            console.error("Error en cálculo:", error);
            // Type guard para acceder al mensaje
            let errorMessage = "Error desconocido";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json({
                success: false,
                error: errorMessage
            });
        }
    }
};
exports.default = calculosController;
