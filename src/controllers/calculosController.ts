// src/controllers/calculosController.ts
import { Request, Response } from 'express';
import ConversionService from '../services/conversionService';

const calculosController = {
  calcular: (req: Request, res: Response): void => {
    try { // atrapa los datos del formulario, los valida y se los pasa al servicio que va a hacer la conversion.. Recibe la respuesta y la manda al cliente.
      console.log("=== DATOS RECIBIDOS ===");
      console.log("Body:", req.body);
      
      const { monto, moneda } = req.body as { monto: number; moneda: string };
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
      const resultado = ConversionService.convertir(moneda, monto);
      
      // Respuesta exitosa
      res.json({
        success: true,
        ...resultado
      });
      
    } catch (error: unknown) {
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

export default calculosController;