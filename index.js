/** SETTINGS */
import express from "express";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";  
import specs from "./swagger.config.js";
import cors from 'cors';

const port = 3000;
dotenv.config();
const app = express();


// ============================================
// Tasas de cambio
// ============================================
const tasasCambio = {
  usdt: 460,
  dolar_bcv: 355,
  euro_bcv: 418,
};

/**
 * FUNCIONES
 */

function conversion(moneda, monto, tasa, res) {
    const montoNum = parseFloat(monto);
    
    if (moneda == 'bs_bcv') {
        const enDolarBcv = montoNum * tasasCambio.dolar_bcv;
        const enEuroBCV = montoNum * tasasCambio.euro_bcv;
        const enUsdt = enDolarBcv / tasasCambio.usdt;
        console.log('Este es el USDT '+tasasCambio.usdt)

        return res.json({
            success: true,
            mensaje: `El equivalente de ${montoNum} Bolívares en Dólares BCV es ${enDolarBcv.toFixed(2)} $.\n${montoNum} Bolívares a tasa euro serían: ${enEuroBCV.toFixed(2)} €.\nY en USDT serían: ${enUsdt.toFixed(2)} USDT.`,
            monto: montoNum,
            enDolarBcv: enDolarBcv.toFixed(2),
            enEuroBCV: enEuroBCV.toFixed(2),
            enUsdt: enUsdt.toFixed(2),
            moneda: moneda
        });
    }
    
    if (moneda == 'dolar_euro_bcv') {
        const enBSatasaEuroBcv = montoNum * tasasCambio.euro_bcv;
        const enDolarBcv = enBSatasaEuroBcv / tasasCambio.dolar_bcv;
        const enUsdt = enBSatasaEuroBcv / tasasCambio.usdt;
        
        return res.json({
            success: true,
            mensaje: `${montoNum} $ a tasa euro son ${enBSatasaEuroBcv.toFixed(2)} bolívares a tasa euro BCV.\n${enDolarBcv.toFixed(2)} $ a tasa BCV y son ${enUsdt.toFixed(2)} USDT.`,
            enDolarBcv: enDolarBcv.toFixed(2),
            enBSatasaEuroBcv: enBSatasaEuroBcv.toFixed(2),
            enUsdt: enUsdt.toFixed(2),
            monto: montoNum,
            moneda: moneda
        });
    }
    
    if (moneda == 'bs_euro_bcv') {
        const DolarenEuroBcV = montoNum / tasasCambio.euro_bcv;
        const enDolaresBcv = montoNum / tasasCambio.dolar_bcv;
        const enUsdt = montoNum / tasasCambio.usdt;
        
        return res.json({
            success: true,
            mensaje: `${montoNum} BS a tasa euro son ${DolarenEuroBcV.toFixed(2)} dólares a tasa euro,\nlo cual equivale a ${enDolaresBcv.toFixed(2)} dólares a tasa dólar BCV.\nEquivalente en USDT: ${enUsdt.toFixed(2)} USDT.`,
            monto: montoNum,
            enDolaresBcv: enDolaresBcv.toFixed(2),
            DolarenEuroBcV: DolarenEuroBcV.toFixed(2),
            enUsdt: enUsdt.toFixed(2),
            moneda: moneda
        });
    }
    
    if (moneda == 'usdt') {
        const usdtEnBs = montoNum * tasasCambio.usdt;
        const enDolaresBCV = usdtEnBs / tasasCambio.dolar_bcv;
        const enDolaresBCVEuro = usdtEnBs / tasasCambio.euro_bcv;
        
        return res.json({
            success: true,
            mensaje: `El equivalente de ${montoNum} USDT en Bolívares es ${usdtEnBs.toFixed(2)} Bs.\nLo cual equivale a ${enDolaresBCV.toFixed(2)} $ a tasa dólar BCV,\ny a ${enDolaresBCVEuro.toFixed(2)} $ a tasa euro BCV.`,
            monto: montoNum,
            moneda: moneda,
            tasa_usada: tasa,
            usdtEnBs: usdtEnBs.toFixed(2),
            enDolaresBCV: enDolaresBCV.toFixed(2),
            enDolaresBCVEuro: enDolaresBCVEuro.toFixed(2)
        });
    }
    
    // IMPORTANTE: Si no coincide ninguna moneda, DEBES enviar una respuesta
    return res.status(400).json({
        success: false,
        error: "Moneda no válida. Opciones válidas: bs_bcv, dolar_euro_bcv, bs_euro_bcv, usdt"
    });
}

/**
 * MIDDLEWARES
 */

app.use(cors({
  origin: 'http://localhost:5174', // Esta es la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

/** ENDPOINTS */

app.post("/calculos", (req, res) => {
    console.log("=== DATOS RECIBIDOS ===");
    console.log("Body:", req.body);
    
    const { monto, moneda} = req.body;
    
    if (!monto || isNaN(monto)) {
        return res.status(400).json({
            success: false,
            error: "Debe enviar un monto válido",
        });
    }
    
    if (!moneda) {
        return res.status(400).json({
            success: false,
            error: "Debe especificar una moneda",
        });
    }
    
    // Llamar a la función de conversión
    conversion(moneda, monto, tasasCambio.usdt, res);
    //no se define el tercer parametro.. porque??? 
});

app.get("/home", (req, res) => {
    const { usdt, dolar_bcv, euro_bcv } = tasasCambio;

    res.json({
        success: true,
        message: "Bienvenido a la API de Conversión de Divisas",
        subtitle: "Tasas de cambio y conversiones básicas",
        text: 'En esta aplicación podrás convertir montos entre bolívares, dólares, USDT y tasa euro del BCV según las tasas actuales del mercado.',
        version: "1.0.0",
        tasas: {
            usdt,
            dolar_bcv,
            euro_bcv,
        }
    });
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API de Conversión de Divisas",
        endpoints: {
            home: "GET /home",
            calculos: "POST /calculos",
            swagger: "GET /api-docs"
        }
    });
});

/** LISTENER */
app.listen(port, () => {
    console.log(`✅ Servidor ejecutándose en: http://localhost:${port}`);
    console.log(`📖 Swagger docs en: http://localhost:${port}/api-docs`);
    console.log(`🏠 Home API en: http://localhost:${port}/home`);
});

export default app;