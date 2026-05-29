
import { useState, useEffect } from "react";
import axios from "axios";

export default function About() {
  const [dolar, setDolar] = useState<any>(null);
  const [euro, setEuro] = useState<any>(null);
  const [usdt, setUsdt] = useState<any>(null);
  
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });

  const fetchTasas = async () => {
    try {
      const response = await fetch('/api/');
      const data = await response.json();
      if (data.success && data.tasas) {
        setDolar(data.tasas.dolar_bcv);
        setEuro(data.tasas.euro_bcv);
        setUsdt(data.tasas.usdt);
      }
    } catch (error) {
      console.error("Error al cargar las tasas:", error);
    }
  };

  useEffect(() => {
    fetchTasas();
  }, []);

  const handleUpdate = async () => {
    if (!selectedCurrency || !newValue) {
      setStatus({ type: 'error', message: "Por favor selecciona una moneda e ingresa el nuevo valor." });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await axios.post('/api/tasas', {
        moneda: selectedCurrency,
        valor: newValue
      });

      if (response.data.success) {
        setStatus({ type: 'success', message: `¡Tasa de ${selectedCurrency.toUpperCase()} actualizada correctamente!` });
        setNewValue("");
        fetchTasas(); // Recargar valores actuales
      } else {
        setStatus({ type: 'error', message: response.data.message || "Error al actualizar la tasa." });
      }
    } catch (error: any) {
      console.error("Error al actualizar:", error);
      setStatus({ type: 'error', message: error.response?.data?.message || "Ocurrió un error al procesar la actualización." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Card principal */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">

            {/* Encabezado */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Actualizar Tasas de Cambio
              </h2>
              <p className="text-gray-600 mt-2">
                Modifica los valores de las monedas en el sistema
              </p>
            </div>

            {/* Cuerpo del formulario */}
            <div className="p-8">
              <div className="space-y-8">
                
                {/* Notificaciones */}
                {status.type && (
                  <div className={`p-4 rounded-xl border ${
                    status.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
                  } transition-all`}>
                    {status.message}
                  </div>
                )}

                {/* Sección 1: Selección de moneda */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        ¿Qué moneda quieres actualizar?
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Selecciona la moneda a modificar
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">💱</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center bg-gray-50 rounded-xl border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 p-4">
                      <span className="text-2xl mr-3">💰</span>
                      <select 
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="flex-1 bg-transparent text-lg font-medium text-gray-800 outline-none appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Selecciona una moneda</option>
                        <option value="usdt">USDT</option>
                        <option value="dolar_bcv">Dólar BCV</option>
                        <option value="euro_bcv">Euro BCV</option>
                      </select>
                      <svg className="w-5 h-5 text-gray-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Indicadores de monedas actuales */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                        <div className="text-2xl mb-2">💎</div>
                        <div className="font-bold text-gray-800">USDT</div>
                        <div className="text-gray-600 text-sm">{usdt ? `${usdt}` : 'Cargando...'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                        <div className="text-2xl mb-2">🇺🇸</div>
                        <div className="font-bold text-gray-800">Dólar BCV</div>
                        <div className="text-gray-600 text-sm">{dolar ? `${dolar} $` : 'Cargando...'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                        <div className="text-2xl mb-2">🇪🇺</div>
                        <div className="font-bold text-gray-800">Euro BCV</div>
                        <div className="text-gray-600 text-sm">{euro ? `${euro} €` : 'Cargando...'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separador */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          ¿Cuál será su nuevo valor?
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Ingresa el nuevo valor en Bolívares
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">📈</span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex items-center bg-gray-50 rounded-xl border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 p-4">
                        <span className="text-2xl mr-3">🇻🇪</span>
                        <input
                          type="number"
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                          placeholder="0.00"
                          className="flex-1 bg-transparent text-2xl font-bold text-gray-800 outline-none placeholder:text-gray-400"
                          step="0.01"
                          min="0"
                        />
                        <span className="text-gray-600 font-medium ml-2">
                          Bolívares (Bs)
                        </span>
                      </div>
                    </div>

                    {/* Preview del cambio */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-yellow-600 font-bold">⚠️</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-800">Vista previa del cambio</h4>
                          <p className="text-yellow-700 text-sm mt-1">
                            El nuevo valor se aplicará inmediatamente al sistema
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="pt-8 text-center">
                  <button 
                    onClick={handleUpdate}
                    disabled={loading}
                    className={`w-full max-w-md py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center mx-auto ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    ) : (
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )}
                    {loading ? 'Actualizando...' : 'Actualizar Moneda'}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}