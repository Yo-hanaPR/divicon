import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Convierte() {
  const [formData, setFormData] = useState({
    monedaSeleccionada: '',
    monto: ''
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [resultado, setResultado] = useState<any>(null);
  const [tasasActuales, setTasasActuales] = useState<any>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Cambio en el input:", e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //tengo que actualizar setTasasActuales y hacer que el archivo tasas.ts agarre el cambio.
  const handleMonedaClick = (moneda: string) => {
    setFormData({
      ...formData,
      monedaSeleccionada: moneda
    });
  };

  const handleSubmit = async () => {
    const datosParaBackend = {
      monto: formData.monto || 0,
      moneda: formData.monedaSeleccionada
    };
    const resp = await axios.post("/api/calculos", datosParaBackend);
    setResultado(resp.data);
    console.log("Este es el resultado de la conversión:");
    console.log(resp.data);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Columna 1: Formulario */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Encabezado del formulario */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  Conversión de Divisas
                </h2>
                <p className="text-gray-600 mt-2">
                  Selecciona la moneda y el monto que deseas convertir
                </p>
              </div>

              {/* Cuerpo del formulario */}
              <div className="p-8 space-y-8">
                {/* Sección 1: Selección de moneda */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        ¿Qué moneda quieres convertir?
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Selecciona la moneda de origen
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">💱</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => handleMonedaClick('tengo_bs')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 
                    ${formData.monedaSeleccionada === 'tengo_bs'
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                        }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">🇻🇪</div>
                        <div className="text-sm font-medium">
                          BS
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleMonedaClick('usdt')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 
                    ${formData.monedaSeleccionada === 'usdt'
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                        }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">💎</div>
                        <div className="text-sm font-medium">
                          USDT
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleMonedaClick('bs_bcv')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 
                    ${formData.monedaSeleccionada === 'bs_bcv'
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                        }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">🇺🇸</div>
                        <div className="text-sm font-medium">
                          Dolar BCV
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleMonedaClick('dolar_euro_bcv')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 
                    ${formData.monedaSeleccionada === 'dolar_euro_bcv'
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                        }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">🇪🇺</div>
                        <div className="text-sm font-medium">
                          Euro BCV
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Separador */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          ¿Qué cantidad de dinero quieres convertir?
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Ingresa el monto exacto a convertir
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">💰</span>
                      </div>
                    </div>

                    <input
                      type="text"
                      name="monto"
                      value={formData.monto}
                      onChange={handleChange}
                      placeholder="Ej: 10"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg font-medium focus:border-blue-500 focus:outline-none transition-colors"
                      required
                      min="0"
                    />
                  </div>
                </div>

                {/* Botón de conversión */}
                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  >
                    CONVERTIR
                  </button>
                </div>
              </div>
            </div>

            {/* Columna 2: Resultados */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Encabezado de resultados */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  Resultados de la Conversión
                </h2>
                <p className="text-gray-600 mt-2">
                  Equivalencia en diferentes monedas
                </p>
              </div>

              {/* Cuerpo de resultados */}
              <div className="p-8">
                <div className="space-y-8">
                  {/* Resultado principal */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        {resultado ? (
                          resultado.moneda === 'bs_bcv'
                            ? `${resultado.monto} Dólares a tasa BCV`
                            : resultado.moneda === 'dolar_euro_bcv'
                              ? `${resultado.monto} Dólares a tasa EURO`
                              : resultado.moneda === 'bs_euro_bcv'
                                ? `${resultado.monto} Euros a tasa BCV`
                                : resultado.moneda === 'usdt'
                                  ? `${resultado.monto} Dólares a tasa USDT`
                                  : resultado.moneda === 'tengo_bs'
                                    ? `${resultado.monto} Bolívares`
                                    : `${resultado.monto} ${resultado.moneda}`
                        ) : '0.00'}
                      </div>
                      <div className="text-gray-600 mb-4">equivalen a</div>

                      {/* Para USDT */}
                      {resultado?.moneda === 'usdt' && (
                        <div className="space-y-2">
                          <div className="text-5xl font-bold text-blue-600">
                            {resultado.usdtEnBs || '0.00'} Bs
                          </div>
                          <div className="text-5xl font-bold text-blue-600">
                            {resultado.enDolaresBCV || '0.00'} Dólar BCV
                          </div>
                          <div className="text-5xl font-bold text-blue-600">
                            {resultado.enDolaresBCVEuro || '0.00'} Euro BCV
                          </div>
                        </div>
                      )}

                      {/* Para bs_bcv */}
                      {resultado?.moneda === 'bs_bcv' && (
                        <div className="space-y-2">
                          <div className="text-5xl font-bold text-blue-600">
                            {resultado.enDolarBcv || '0.00'} Bolivares
                          </div>
                          <div className="text-5xl font-bold text-blue-600">
                            {resultado.enUsdt || '0.00'} USDT
                          </div>
                        </div>
                      )}

                      {/* Para euros */}
                      {resultado?.moneda === 'dolar_euro_bcv' && (
                        <div className="space-y-2">
                          <div className="text-5xl font-bold text-blue-600">
                            {resultado.enBSatasaEuroBcv || '0.00'} Bolivares
                          </div>
                          <div className="text-5xl font-bold text-blue-600">
                            {resultado.enUsdt || '0.00'} USDT
                          </div>
                        </div>
                      )}

                      {/* Para bolivares */}
                      {resultado?.moneda === 'tengo_bs' && (
                        <div className="space-y-2">
                          <div className="text-5xl font-bold text-blue-600">
                            {resultado.enDolarBcv || '0.00'} Dolares a BCV
                          </div>
                          <div className="text-5xl font-bold text-blue-600">
                            {resultado.enEuroBCV || '0.00'} Dolares a tasa Euro
                          </div>
                          <div className="text-5xl font-bold text-blue-600">
                            {resultado.enUsdt || '0.00'} USDT
                          </div>
                        </div>
                      )}

                      <div className="text-gray-500 mt-4 pt-4 border-t border-blue-100">
                        Tipo de cambio aplicado: 1 {
                          resultado ? (
                            resultado.moneda === 'bs_bcv'
                              ? 'Dólar BCV'
                              : resultado.moneda === 'dolar_euro_bcv'
                                ? 'Dólar a tasa EURO'
                                : resultado.moneda === 'bs_euro_bcv'
                                  ? 'Euro BCV'
                                  : resultado.moneda === 'usdt'
                                    ? 'USDT'
                                    : resultado.moneda
                          ) : '---'
                        } = {resultado ? resultado.tasa_usada || '0.00' : '0.00'} BS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
