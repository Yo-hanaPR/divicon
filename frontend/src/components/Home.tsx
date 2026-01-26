import { Link } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: 'Conversiones en tiempo real',
      description: 'Obtén tasas de cambio actualizadas al instante. Siempre trabajamos con la información más reciente del mercado.',
      color: 'from-blue-500 to-blue-700',
      //icon: <TrendingUp className="text-blue-600" style={{ fontSize: '2.5rem' }} />
    },
    {
      title: 'Múltiples Monedas',
      description: 'Convierte entre USD, EUR, Bs (Bolívares), USDT y más. Soporte para las principales divisas mundiales.',
      //icon: <CurrencyExchange className="text-green-600" style={{ fontSize: '2.5rem' }} />,
      color: 'from-green-500 to-green-700'
    },
    {
      title: 'Seguro y Confiable',
      description: 'Tus datos están protegidos. No almacenamos información personal ni historial de conversiones.',
      //icon: <Security className="text-purple-600" style={{ fontSize: '2.5rem' }} />,
      color: 'from-purple-500 to-purple-700'
    }
  ]

  const steps = [
    {
      step: 1,
      title: 'Ingresa a la opción CONVERTIR',
      description: 'Navega hasta la sección de conversión desde el menú principal o usando el botón de abajo.',
      //icon: <Speed className="text-white" style={{ fontSize: '2rem' }} />,
      color: 'bg-gradient-to-r from-blue-600 to-blue-800'
    },
    {
      step: 2,
      title: 'Ingresa monto y moneda',
      description: 'Selecciona la moneda de origen, ingresa el monto que deseas convertir y elige la moneda destino.',
      //icon: <AttachMoney className="text-white" style={{ fontSize: '2rem' }} />,
      color: 'bg-gradient-to-r from-green-600 to-green-800'
    },
    {
      step: 3,
      title: 'Presiona convertir',
      description: 'Haz clic en el botón convertir y obtén inmediatamente el resultado de tu conversión.',
      //icon: <Calculate className="text-white" style={{ fontSize: '2rem' }} />,
      color: 'bg-gradient-to-r from-purple-600 to-purple-800'
    }
  ]
  return (
    <div className="min-h-screen">
      {/* Hero Section - Reemplaza tu section actual */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Conversor de Divisas{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Inteligente
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Esta es la página principal de tu aplicación de conversión de divisas. 
              Fácil, rápido y preciso. ¡Comienza a convertir ahora!
            </p>
            {/* Contenedor interno para el contenido */}
            <div className="mx-auto">
                <p className="">
                    Aquí debe imprimir el mensaje que le llega desde el back
                </p>
                <p>Ajustar el componente Header.tsx y Footer.tsx para que se vean de borde a borde y no se vea como flotando.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section - Reemplaza tu grid actual */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ¿Cómo Convertir Divisas?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sigue estos 3 simples pasos para convertir tu dinero en segundos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {steps.map((item) => (
              <div 
                key={item.step} 
                className="relative group transform hover:-translate-y-2 transition-transform duration-300"
              >
                {/* Número del paso */}
                <div className="absolute -top-4 left-6 z-10">
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-xl">{item.step}</span>
                  </div>
                </div>

                {/* Card - Manteniendo tu estructura pero mejorada */}
                <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl p-8 pt-12 border border-gray-100 group-hover:shadow-2xl transition-shadow">
                  <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Indicador de progreso */}
                  {item.step < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <div className="text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Resultado final */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 max-w-3xl mx-auto">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 mr-6">
                </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  ¡Y listo! Verás el equivalente en otras monedas
                </h3>
                <p className="text-gray-600">
                  Con estos tres pasos podrás convertir cualquier monto y ver su equivalente en diferentes divisas, 
                  incluyendo tasas BCV, USDT y más.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Similar a tu grid original pero mejorada */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ¿Por qué usar nuestro conversor?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Características diseñadas para hacer tu experiencia de conversión perfecta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="mb-6">
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${feature.color}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
            Convierte tu dinero ahora y obtén los mejores tipos de cambio del mercado
          </p>
          
          {/* Tasas destacadas */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { currency: 'USD/Bs', rate: '36.50', change: '+0.12' },
              { currency: 'EUR/Bs', rate: '39.25', change: '-0.08' },
              { currency: 'USDT/Bs', rate: '36.80', change: '+0.05' },
              { currency: 'USD/EUR', rate: '0.92', change: '+0.01' }
            ].map((rate, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-blue-100 font-medium">{rate.currency}</div>
                <div className="text-white text-2xl font-bold my-2">{rate.rate}</div>
                <div className={`text-sm ${rate.change.startsWith('+') ? 'text-green-300' : 'text-red-300'}`}>
                  {rate.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}