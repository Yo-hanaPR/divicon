"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/conversionService.ts
const tasas_1 = __importDefault(require("./tasas"));
class ConversionService {
    static convertirBsBCV(montoNum) {
        const enDolarBcv = montoNum * tasas_1.default.dolar_bcv;
        const enEuroBCV = montoNum * tasas_1.default.euro_bcv;
        const enUsdt = enDolarBcv / tasas_1.default.usdt;
        return {
            enDolarBcv: enDolarBcv.toFixed(2),
            enEuroBCV: enEuroBCV.toFixed(2),
            enUsdt: enUsdt.toFixed(2),
            mensaje: `El equivalente de ${montoNum} Bolívares en Dólares BCV es ${enDolarBcv.toFixed(2)} $.\n${montoNum} Bolívares a tasa euro serían: ${enEuroBCV.toFixed(2)} €.\nY en USDT serían: ${enUsdt.toFixed(2)} USDT.`
        };
    }
    static convertirDolarEuroBCV(montoNum) {
        const enBSatasaEuroBcv = montoNum * tasas_1.default.euro_bcv;
        console.log(enBSatasaEuroBcv);
        const enDolarBcv = enBSatasaEuroBcv / tasas_1.default.dolar_bcv;
        const enUsdt = enBSatasaEuroBcv / tasas_1.default.usdt;
        return {
            enDolarBcv: enDolarBcv.toFixed(2),
            enBSatasaEuroBcv: enBSatasaEuroBcv.toFixed(2),
            enUsdt: enUsdt.toFixed(2),
            mensaje: `${montoNum} $ a tasa euro son ${enBSatasaEuroBcv.toFixed(2)} bolívares a tasa euro BCV.\n${enDolarBcv.toFixed(2)} $ a tasa BCV y son ${enUsdt.toFixed(2)} USDT.`
        };
    }
    static convertirBsEuroBCV(montoNum) {
        const DolarenEuroBcV = montoNum / tasas_1.default.euro_bcv;
        const enDolaresBcv = montoNum / tasas_1.default.dolar_bcv;
        const enUsdt = montoNum / tasas_1.default.usdt;
        return {
            enDolaresBcv: enDolaresBcv.toFixed(2),
            DolarenEuroBcV: DolarenEuroBcV.toFixed(2),
            enUsdt: enUsdt.toFixed(2),
            mensaje: `${montoNum} BS a tasa euro son ${DolarenEuroBcV.toFixed(2)} dólares a tasa euro,\nlo cual equivale a ${enDolaresBcv.toFixed(2)} dólares a tasa dólar BCV.\nEquivalente en USDT: ${enUsdt.toFixed(2)} USDT.`
        };
    }
    static convertirUSDT(montoNum) {
        const usdtEnBs = montoNum * tasas_1.default.usdt;
        const enDolaresBCV = usdtEnBs / tasas_1.default.dolar_bcv;
        const enDolaresBCVEuro = usdtEnBs / tasas_1.default.euro_bcv;
        return {
            usdtEnBs: usdtEnBs.toFixed(2),
            enDolaresBCV: enDolaresBCV.toFixed(2),
            enDolaresBCVEuro: enDolaresBCVEuro.toFixed(2),
            tasa_usada: tasas_1.default.usdt,
            mensaje: `El equivalente de ${montoNum} USDT en Bolívares es ${usdtEnBs.toFixed(2)} Bs.\nLo cual equivale a ${enDolaresBCV.toFixed(2)} $ a tasa dólar BCV,\ny a ${enDolaresBCVEuro.toFixed(2)} $ a tasa euro BCV.`
        };
    }
    static convertirBsaBSBCV_USDT_y_DOLAREURO(montoNum) {
        console.log('este es el monto');
        console.log(montoNum);
        const enDolarBcv = montoNum / tasas_1.default.dolar_bcv;
        const enEuroBCV = montoNum / tasas_1.default.euro_bcv;
        const enUsdt = montoNum / tasas_1.default.usdt;
        return {
            enDolarBcv: enDolarBcv.toFixed(2),
            enEuroBCV: enEuroBCV.toFixed(2),
            enUsdt: enUsdt.toFixed(2),
            mensaje: `El equivalente de ${montoNum} Bs en Dólares BCV es ${enDolarBcv.toFixed(2)} $,\n${montoNum} Bs a tasa euro serían: ${enEuroBCV.toFixed(2)} €.\nY en USDT serían: ${enUsdt.toFixed(2)} USDT.`
        };
    }
    static convertir(moneda, monto) {
        const montoNum = typeof monto === 'string' ? parseFloat(monto) : monto;
        const monedasValidas = ['bs_bcv', 'dolar_euro_bcv', 'bs_euro_bcv', 'usdt', 'tengo_bs'];
        if (!monedasValidas.includes(moneda)) {
            throw new Error(`Moneda no válida. Opciones: ${monedasValidas.join(', ')}`);
        }
        switch (moneda) {
            case 'tengo_bs':
                return {
                    ...this.convertirBsaBSBCV_USDT_y_DOLAREURO(montoNum),
                    monto: montoNum,
                    moneda
                };
            case 'bs_bcv':
                return {
                    ...this.convertirBsBCV(montoNum),
                    monto: montoNum,
                    moneda
                };
            case 'dolar_euro_bcv':
                return {
                    ...this.convertirDolarEuroBCV(montoNum),
                    monto: montoNum,
                    moneda
                };
            case 'bs_euro_bcv':
                return {
                    ...this.convertirBsEuroBCV(montoNum),
                    monto: montoNum,
                    moneda
                };
            case 'usdt':
                return {
                    ...this.convertirUSDT(montoNum),
                    monto: montoNum,
                    moneda
                };
            default:
                throw new Error('Moneda no soportada');
        }
    }
}
exports.default = ConversionService;
