// src/services/conversionService.ts
import tasasCambio, { TasasCambio } from './tasas';

export interface ResultadoConversion {
  success?: boolean;
  mensaje: string;
  monto: number;
  moneda: string;
  [key: string]: string | number | boolean | undefined;
}

class ConversionService {
  static convertirBsBCV(montoNum: number): Partial<ResultadoConversion> {
    const enDolarBcv = montoNum * tasasCambio.dolar_bcv;
    const enEuroBCV = montoNum * tasasCambio.euro_bcv;
    const enUsdt = enDolarBcv / tasasCambio.usdt;

    return {
      enDolarBcv: enDolarBcv.toFixed(2),
      enEuroBCV: enEuroBCV.toFixed(2),
      enUsdt: enUsdt.toFixed(2),
      mensaje: `El equivalente de ${montoNum} Bolívares en Dólares BCV es ${enDolarBcv.toFixed(2)} $.\n${montoNum} Bolívares a tasa euro serían: ${enEuroBCV.toFixed(2)} €.\nY en USDT serían: ${enUsdt.toFixed(2)} USDT.`
    };
  }

  static convertirDolarEuroBCV(montoNum: number): Partial<ResultadoConversion> {
    const enBSatasaEuroBcv = montoNum * tasasCambio.euro_bcv;
    console.log(enBSatasaEuroBcv)
    const enDolarBcv = enBSatasaEuroBcv / tasasCambio.dolar_bcv;
    const enUsdt = enBSatasaEuroBcv / tasasCambio.usdt;

    return {
      enDolarBcv: enDolarBcv.toFixed(2),
      enBSatasaEuroBcv: enBSatasaEuroBcv.toFixed(2),
      enUsdt: enUsdt.toFixed(2),
      mensaje: `${montoNum} $ a tasa euro son ${enBSatasaEuroBcv.toFixed(2)} bolívares a tasa euro BCV.\n${enDolarBcv.toFixed(2)} $ a tasa BCV y son ${enUsdt.toFixed(2)} USDT.`
    };
  }

  static convertirBsEuroBCV(montoNum: number): Partial<ResultadoConversion> {
    const DolarenEuroBcV = montoNum / tasasCambio.euro_bcv;
    const enDolaresBcv = montoNum / tasasCambio.dolar_bcv;
    const enUsdt = montoNum / tasasCambio.usdt;

    return {
      enDolaresBcv: enDolaresBcv.toFixed(2),
      DolarenEuroBcV: DolarenEuroBcV.toFixed(2),
      enUsdt: enUsdt.toFixed(2),
      mensaje: `${montoNum} BS a tasa euro son ${DolarenEuroBcV.toFixed(2)} dólares a tasa euro,\nlo cual equivale a ${enDolaresBcv.toFixed(2)} dólares a tasa dólar BCV.\nEquivalente en USDT: ${enUsdt.toFixed(2)} USDT.`
    };
  }

  static convertirUSDT(montoNum: number): Partial<ResultadoConversion> {
    const usdtEnBs = montoNum * tasasCambio.usdt;
    const enDolaresBCV = usdtEnBs / tasasCambio.dolar_bcv;
    const enDolaresBCVEuro = usdtEnBs / tasasCambio.euro_bcv;

    return {
      usdtEnBs: usdtEnBs.toFixed(2),
      enDolaresBCV: enDolaresBCV.toFixed(2),
      enDolaresBCVEuro: enDolaresBCVEuro.toFixed(2),
      tasa_usada: tasasCambio.usdt,
      mensaje: `El equivalente de ${montoNum} USDT en Bolívares es ${usdtEnBs.toFixed(2)} Bs.\nLo cual equivale a ${enDolaresBCV.toFixed(2)} $ a tasa dólar BCV,\ny a ${enDolaresBCVEuro.toFixed(2)} $ a tasa euro BCV.`
    };
  }

  static convertirBsaBSBCV_USDT_y_DOLAREURO(montoNum: number): Partial<ResultadoConversion>{
    console.log('este es el monto')
    console.log(montoNum)
    
    const enDolarBcv = montoNum / tasasCambio.dolar_bcv;
    const enEuroBCV = montoNum / tasasCambio.euro_bcv;
    const enUsdt = montoNum / tasasCambio.usdt;

    return {
      enDolarBcv: enDolarBcv.toFixed(2),
      enEuroBCV: enEuroBCV.toFixed(2),
      enUsdt: enUsdt.toFixed(2),
      mensaje: `El equivalente de ${montoNum} Bs en Dólares BCV es ${enDolarBcv.toFixed(2)} $,\n${montoNum} Bs a tasa euro serían: ${enEuroBCV.toFixed(2)} €.\nY en USDT serían: ${enUsdt.toFixed(2)} USDT.`
    };  
  }

  static convertir(moneda: string, monto: string | number): ResultadoConversion {
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
        } as ResultadoConversion
      case 'bs_bcv':
        return {
          ...this.convertirBsBCV(montoNum),
          monto: montoNum,
          moneda
        } as ResultadoConversion;
      case 'dolar_euro_bcv':
        return {
          ...this.convertirDolarEuroBCV(montoNum),
          monto: montoNum,
          moneda
        } as ResultadoConversion;
      case 'bs_euro_bcv':
        return {
          ...this.convertirBsEuroBCV(montoNum),
          monto: montoNum,
          moneda
        } as ResultadoConversion;
      case 'usdt':
        return {
          ...this.convertirUSDT(montoNum),
          monto: montoNum,
          moneda
        } as ResultadoConversion;
      default:
        throw new Error('Moneda no soportada');
    }
  }
}

export default ConversionService;