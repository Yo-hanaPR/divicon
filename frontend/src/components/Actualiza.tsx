export default function About() {
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
                  <select className="flex-1 bg-transparent text-lg font-medium text-gray-800 outline-none appearance-none">
                    <option value="" disabled selected>Selecciona una moneda</option>
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
                    <div className="text-gray-600 text-sm">420 Bs</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                    <div className="text-2xl mb-2">🇺🇸</div>
                    <div className="font-bold text-gray-800">Dólar BCV</div>
                    <div className="text-gray-600 text-sm">265 Bs</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                    <div className="text-2xl mb-2">🇪🇺</div>
                    <div className="font-bold text-gray-800">Euro BCV</div>
                    <div className="text-gray-600 text-sm">300 Bs</div>
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
                      placeholder="0.00"
                      className="flex-1 bg-transparent text-2xl font-bold text-gray-800 outline-none placeholder:text-gray-400"
                      step="0.01"
                      min="0"
                    />
                    <span className="text-gray-600 font-medium ml-2">
                      Bolívares (Bs)
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      +10 Bs
                    </button>
                    <button className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      +50 Bs
                    </button>
                    <button className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      +100 Bs
                    </button>
                    <button className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Restablecer
                    </button>
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
            <div className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Botón 1: Actualizar */}
                <button className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Actualizar Moneda
                </button>
                
                {/* Botón 2: Actualizar otra */}
                <button className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Actualizar Otra Moneda
                </button>
              </div>
              
              {/* Botón secundario */}
              <div className="mt-4">
                <button className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
                  Cancelar Cambios
                </button>
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