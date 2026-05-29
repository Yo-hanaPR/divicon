import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
/** importando paginas de prueba */

import Home from './components/Home';
import About from './components/Actualiza';
/** importando paginas de prueba */

import Header from './templates/Header'
import Footer from './templates/Footer'
import './App.css'
import Convierte from './components/Convierte';
import Presupuestos from './components/Presupuestos';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
      {/* Header ocupa todo el ancho */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convierte" element={<Convierte />} />
        <Route path="/actualiza" element={<About />} />
        <Route path="/presupuestos" element={<Presupuestos />} />
      </Routes>
      {/* Footer ocupa todo el ancho */}
      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
