import swaggerJSDoc from 'swagger-jsdoc';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Conversión de Monedas',
      version: '1.0.0',
      description: 'API para convertir entre Bolívares, Dólares y Euros usando tasas de cambio específicas.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./index.js'], // Ruta a los archivos donde se definen los endpoints
};

const specs = swaggerJSDoc(options);
export default specs;