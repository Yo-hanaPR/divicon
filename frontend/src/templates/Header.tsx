import { Link, Route } from 'react-router-dom';
import divicon from '../assets/img/divicon.png';
import axios from "axios";
import { useEffect, useState } from "react";

import AnimatedRates from '../components/SimpleAnimatedRates';
function Header() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tasasFormateadas, setTasasFormateadas] = useState<any[]>([]);

  useEffect(() => {
    const getTaxes = async () => {
      try {
        setLoading(true);
        console.log("🔍 Haciendo petición al backend...");

        // 👇 ¡CORRECTO! Usar await para esperar la respuesta
        const resp = await axios.get("/api/"); //o http://localhost:3000/

        console.log("✅ Respuesta completa:", resp);
        console.log("📊 Datos recibidos:", resp.data);
        console.log("🎯 Tasas:", resp.data.tasas);

        // Guardar en el estado
        setData(resp.data);

        if (resp.data.tasas) {
          const tasasParaHijo = [
            { name: 'USDT', value: resp.data.tasas.usdt, icon: '💎' },
            { name: 'Dólar BCV', value: resp.data.tasas.dolar_bcv, icon: '🇺🇸' },
            { name: 'Euro BCV', value: resp.data.tasas.euro_bcv, icon: '🇪🇺' }
          ];

          setTasasFormateadas(tasasParaHijo); // 👈 GUARDAR EN ESTADO
          console.log("📦 Tasas preparadas para hijo:", tasasParaHijo);
        }

      } catch (err) {
        console.error("❌ Error en la petición:", err);
        setError("No se pudo obtener los datos del backend");
        setTasasFormateadas([]); // 👈 LIMPIAR TASAS SI HAY ERROR
      } finally {
        setLoading(false);
      }
    };

    getTaxes();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center p-4 border-b border-gray-300">
        <img src={divicon} alt="" style={{ maxWidth: '300px' }} />
      </div>

      <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">


        {/* Navegación */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Home
          </Link>
          
          <Link
            to="/convierte"
            className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Convierte
          </Link>
          <Link
            to="/actualiza"
            className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Actualiza tasas
          </Link>
          <Link
            to="/presupuestos"
            className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Presupuestos
          </Link>
        </nav>

        <AnimatedRates
          rates={tasasFormateadas}
          loading={loading}
          error={error}
        />
      </header>
    </>
  );
}
export default Header;