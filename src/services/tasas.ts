import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

export async function getEuroPrice() {
  try {
    const url = "https://ve.dolarapi.com/v1/cotizaciones";
    const { data } = await axios.get(url);
    const eurData = data.find((item: any) => item.moneda === "EUR");
    if (eurData && typeof eurData.promedio === 'number') {
      const price = eurData.promedio;
      console.log(`Precio del Euro (API): ${price}`);
      return price;
    }
    throw new Error("No se encontró el promedio del Euro en la API");
  } catch (error) {
    console.error("❌ Error al obtener precio del euro de dolarapi:", error);
    return 566; // Fallback
  }
}
//en este endpoint parece que tenemos el precio oficial del BCV y del euro. https://ve.dolarapi.com/v1/cotizaciones 
//aqui puedes ver el precio del euro https://ve.dolarapi.com/v1/euros 
async function getOfficialDollarPrice(){
  try {
    const url ="https://ve.dolarapi.com/v1/dolares/oficial"; //extraer donde dice PROMEDIO
    const { data } = await axios.get(url);
    const price = data.promedio;
    console.log(`Precio del Dolar Oficial: ${price}`);
    return price;
  } catch (error) {
    console.error("❌ Error al obtener precio del dólar oficial de dolarapi:", error);
    return 37.8; // Fallback razonable
  }
}

export interface TasasCambio {
  usdt: number;
  dolar_bcv: number;
  euro_bcv: number;
}

const tasasCambio: TasasCambio = {
  usdt: 748.98, //el valor del USDT se esta tomando de aqui
  dolar_bcv: 37.8, // Fallback por defecto razonable
  euro_bcv: 56.62, // Fallback por defecto razonable
};

let lastFetchTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos de caché en memoria

export async function ensureRatesUpdated() {
  const now = Date.now();
  if (now - lastFetchTime > CACHE_DURATION) {
    try {
      console.log("🔄 Obteniendo tasas de cambio actualizadas desde la API...");
      const [euroPrice, dollarPrice] = await Promise.all([
        getEuroPrice(),
        getOfficialDollarPrice()
      ]);
      
      if (euroPrice && !isNaN(euroPrice)) {
        tasasCambio.euro_bcv = euroPrice;
      }
      if (dollarPrice && !isNaN(dollarPrice)) {
        tasasCambio.dolar_bcv = dollarPrice;
      }
      
      lastFetchTime = now;
      console.log("✅ Tasas actualizadas con éxito:", tasasCambio);
    } catch (error) {
      console.error("❌ Error al actualizar tasas en request, usando valores en memoria:", error);
    }
  }
}

// Intentar actualizar las tasas en el arranque de forma asíncrona
ensureRatesUpdated().catch((err) => {
  console.error("❌ Falló el fetch inicial de tasas:", err);
});


export function updateRate(moneda: keyof TasasCambio, value: number) {
  if (moneda in tasasCambio) {
    tasasCambio[moneda] = value;
    console.log(`✅ Tasa ${moneda} actualizada a: ${value}`);

    if (moneda === 'usdt') {
      setTimeout(() => {
        try {
          const sourceFilePath = path.join(process.cwd(), 'src/services/tasas.ts');
          if (fs.existsSync(sourceFilePath)) {
            const content = fs.readFileSync(sourceFilePath, 'utf-8');
            const updatedContent = content.replace(/(usdt:\s*)\d+/, `$1${value}`);
            fs.writeFileSync(sourceFilePath, updatedContent, 'utf-8');
            console.log(`💾 Archivo ${sourceFilePath} actualizado con el nuevo valor de USDT: ${value}`);
          } else {
            console.warn(`⚠️ No se encontró el archivo de origen en ${sourceFilePath}`);
          }
        } catch (error) {
          console.error("❌ Error al persistir la tasa USDT en el archivo:", error);
        }
      }, 500);
    }

    return true;
  }
  return false;
}

export default tasasCambio;