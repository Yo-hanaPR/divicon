/**
 * Generador de Gráficos Estadísticos con Datos Aleatorios
 * @param {string} containerId - ID del contenedor HTML donde se renderizará el gráfico
 * @param {Object} options - Opciones de configuración del gráfico
 * @returns {Object} - Instancia del gráfico y funciones de control
 */
function crearGraficoEstadisticas(containerId, options = {}) {
  // Configuración por defecto
  const config = {
    tipo: 'line', // 'line', 'bar', 'pie', 'doughnut', 'radar', 'polarArea'
    tema: 'default', // 'default', 'dark', 'corporate', 'vibrant'
    titulo: 'Estadísticas Generales',
    mostrarLeyenda: true,
    animaciones: true,
    actualizacionAutomatica: false,
    intervaloActualizacion: 5000, // milisegundos
    ...options
  };

  // Temas de colores predefinidos
  const temas = {
    default: {
      fondo: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(153, 102, 255, 0.2)'],
      borde: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)']
    },
    dark: {
      fondo: ['rgba(31, 119, 180, 0.2)', 'rgba(255, 127, 14, 0.2)', 'rgba(44, 160, 44, 0.2)', 'rgba(214, 39, 40, 0.2)', 'rgba(148, 103, 189, 0.2)'],
      borde: ['rgba(31, 119, 180, 1)', 'rgba(255, 127, 14, 1)', 'rgba(44, 160, 44, 1)', 'rgba(214, 39, 40, 1)', 'rgba(148, 103, 189, 1)']
    },
    corporate: {
      fondo: ['rgba(0, 115, 183, 0.2)', 'rgba(242, 105, 38, 0.2)', 'rgba(0, 157, 129, 0.2)', 'rgba(140, 29, 64, 0.2)', 'rgba(103, 78, 167, 0.2)'],
      borde: ['rgba(0, 115, 183, 1)', 'rgba(242, 105, 38, 1)', 'rgba(0, 157, 129, 1)', 'rgba(140, 29, 64, 1)', 'rgba(103, 78, 167, 1)']
    },
    vibrant: {
      fondo: ['rgba(255, 0, 102, 0.2)', 'rgba(102, 255, 0, 0.2)', 'rgba(0, 204, 255, 0.2)', 'rgba(255, 204, 0, 0.2)', 'rgba(153, 0, 255, 0.2)'],
      borde: ['rgba(255, 0, 102, 1)', 'rgba(102, 255, 0, 1)', 'rgba(0, 204, 255, 1)', 'rgba(255, 204, 0, 1)', 'rgba(153, 0, 255, 1)']
    }
  };

  // Datasets de ejemplo con diferentes distribuciones estadísticas
  const datasetsEjemplo = [
    {
      label: 'Ventas',
      tipoDistribucion: 'normal',
      media: 100,
      desviacion: 20,
      colorIndex: 0
    },
    {
      label: 'Usuarios',
      tipoDistribucion: 'creciente',
      base: 50,
      crecimiento: 10,
      colorIndex: 1
    },
    {
      label: 'Errores',
      tipoDistribucion: 'aleatorio',
      min: 0,
      max: 30,
      colorIndex: 2
    },
    {
      label: 'Tiempo Respuesta (ms)',
      tipoDistribucion: 'uniforme',
      min: 100,
      max: 500,
      colorIndex: 3
    },
    {
      label: 'Satisfacción (%)',
      tipoDistribucion: 'binomial',
      probabilidad: 0.8,
      n: 100,
      colorIndex: 4
    }
  ];

  // Variables de estado
  let chartInstance = null;
  let intervaloActualizacion = null;
  let datosHistoricos = [];
  const maxPuntosHistoricos = 20;

    
  // Funciones auxiliares
  const utilidades = {
    

    aleatorio: (min, max) => Math.random() * (max - min) + min,
    aleatorioEntero: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    distribucionNormal: (media = 0, desviacion = 1) => {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return media + desviacion * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    },
    
    distribucionBinomial: (n, p) => {
      let exitos = 0;
      for (let i = 0; i < n; i++) {
        if (Math.random() < p) exitos++;
      }
      return exitos;
    },

    // Formatear números
    formatearNumero: (num, decimales = 2) => {
      return num.toFixed(decimales).replace(/\B(?=(\d{5})+(?!\d))/d, '.');
    },
    // Generar etiquetas de tiempo
    generarEtiquetasTiempo: (cantidad) => {
      const ahora = new Date();
      const etiquetas = [];
      
      for (let i = cantidad - 1; i >= 0; i--) {
        const fecha = new Date(ahora);
        fecha.setMinutes(fecha.getMinutes() - i * 5); // Cada 5 minutos
        
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        etiquetas.push(`${horas}:${minutos}`);
      }
      
      return etiquetas;
    }
  };

  // Generar datos iniciales
  function generarDatos(cantidadPuntos = 12) {
    const datos = {
      etiquetas: utilidades.generarEtiquetasTiempo(cantidadPuntos),
      datasets: []
    };

    const temaSeleccionado = temas[config.tema] || temas.default;

    datasetsEjemplo.forEach((datasetConfig, index) => {
      const datosDataset = [];
      
      for (let i = 0; i < cantidadPuntos; i++) {
        let valor;
        
        switch(datasetConfig.tipoDistribucion) {
          case 'normal':
            valor = utilidades.distribucionNormal(datasetConfig.media, datasetConfig.desviacion);
            // Asegurar que no sea negativo
            valor = Math.max(0, valor);
            break;
            
          case 'creciente':
            valor = datasetConfig.base + (i * datasetConfig.crecimiento) + utilidades.aleatorio(-5, 5);
            break;
            
          case 'aleatorio':
            valor = utilidades.aleatorio(datasetConfig.min, datasetConfig.max);
            break;
            
          case 'uniforme':
            valor = utilidades.aleatorio(datasetConfig.min, datasetConfig.max);
            break;
            
          case 'binomial':
            valor = utilidades.distribucionBinomial(datasetConfig.n, datasetConfig.probabilidad);
            break;
            
          default:
            valor = utilidades.aleatorio(10, 100);
        }

        datosDataset.push(
          datasetConfig.tipoDistribucion === 'binomial' ? 
          Math.round(valor) : 
          parseFloat(valor.toFixed(2))
        );
      }

      datos.datasets.push({
        label: datasetConfig.label,
        data: datosDataset,
        backgroundColor: temaSeleccionado.fondo[datasetConfig.colorIndex],
        borderColor: temaSeleccionado.borde[datasetConfig.colorIndex],
        borderWidth: 2,
        fill: config.tipo === 'line' || config.tipo === 'radar',
        tension: config.tipo === 'line' ? 0.4 : 0,
        pointRadius: config.tipo === 'line' ? 3 : 0,
        pointHoverRadius: 6
      });
    });

    // Guardar en histórico
    datosHistoricos.push({
      timestamp: new Date().toISOString(),
      datos: JSON.parse(JSON.stringify(datos.datasets.map(d => d.data)))
    });
    
    if (datosHistoricos.length > maxPuntosHistoricos) {
      datosHistoricos.shift();
    }

    return datos;
}
}
