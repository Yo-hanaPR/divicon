import React from 'react';

// 1. Definimos las interfaces (tipos)
interface RateItem {
  name: string;
  value: number;
  icon: string;
}

interface SimpleAnimatedRatesProps {
  rates?: RateItem[];   // ? = opcional
  loading?: boolean;    // ? = opcional
  error?: string | null; // ? = opcional
}

// 2. Componente con props tipados
const SimpleAnimatedRates: React.FC<SimpleAnimatedRatesProps> = ({ 
  rates = [],      // Valor por defecto: array vacío
  loading = false, // Valor por defecto: false
  error = null     // Valor por defecto: null
}) => {
  // 3. Datos por defecto (si el padre no pasa rates)
  const defaultRates: RateItem[] = [
    { name: 'USDT', value: 6284, icon: '💎' },
    { name: 'Dólar BCV', value: 265, icon: '🇺🇸' },
    { name: 'Euro BCV', value: 300, icon: '🇪🇺' },
  ];

  // 4. Elegir qué datos usar
  const displayRates = rates.length > 0 ? rates : defaultRates;

  // 5. Función para formatear valores
  const formatValue = (value: number): string => {
    return `${value.toFixed(2)} Bs`;
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-3 overflow-hidden">
      <div className="flex items-center">
        {/* 6. Etiqueta con estado */}
        <div className="bg-white text-amber-700 px-4 py-1 rounded-r-lg font-bold text-lg z-10">
          {loading ? '⏳ CARGANDO...' : error ? '⚠️ ERROR' : '💱 TASAS EN VIVO'}
        </div>
        
        {/* 7. Contenido condicional */}
        <div className="flex-1 overflow-hidden ml-4">
          {error ? (
            <div className="text-center text-white font-semibold">
              ⚠️ {error}
            </div>
          ) : loading ? (
            <div className="text-center text-white font-semibold">
              <span className="inline-block animate-spin mr-2">⟳</span>
              Cargando tasas actuales...
            </div>
          ) : (
            // 8. Mostrar tasas (dinámicas o por defecto)
            <div className="flex animate-marquee whitespace-nowrap">
              {[...displayRates, ...displayRates].map((rate, index) => (
                <div key={index} className="inline-flex items-center mx-6">
                  <span className="text-xl mr-2">{rate.icon}</span>
                  <span className="text-white font-semibold text-lg">
                    {rate.name}: <span className="font-bold">{formatValue(rate.value)}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleAnimatedRates;