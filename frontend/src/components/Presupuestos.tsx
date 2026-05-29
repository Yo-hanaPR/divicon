import React, { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  moneda: 'bs' | 'usd' | 'eur' | 'usdt';
}

interface Tasas {
  usdt: number;
  dolar_bcv: number;
  euro_bcv: number;
}

export default function Presupuestos() {
  const [items, setItems] = useState<Item[]>([
    { id: Date.now(), nombre: '', cantidad: 1, precio: 0, moneda: 'bs' }
  ]);
  const [tasas, setTasas] = useState<Tasas | null>(null);
  const [selectedRate, setSelectedRate] = useState<'bcv' | 'euro'>('bcv');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const resp = await axios.get("/api/");
        if (resp.data && resp.data.tasas) {
          setTasas(resp.data.tasas);
        }
      } catch (err) {
        console.error("Error al obtener tasas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const addItem = () => {
    setItems([...items, { id: Date.now(), nombre: '', cantidad: 1, precio: 0, moneda: 'bs' }]);
  };

  const resetItems = () => {
    setItems([{ id: Date.now(), nombre: '', cantidad: 1, precio: 0, moneda: 'bs' }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: keyof Item, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const getCurrencySymbol = (moneda: 'bs' | 'usd' | 'eur' | 'usdt') => {
    switch (moneda) {
      case 'bs': return 'Bs';
      case 'usd': return '$';
      case 'eur': return '€';
      case 'usdt': return 'USDT';
      default: return '';
    }
  };

  const calculateSubtotalBs = (item: Item) => {
    const subtotal = item.cantidad * item.precio;
    if (!tasas) return subtotal;
    switch (item.moneda) {
      case 'usd': return subtotal * tasas.dolar_bcv;
      case 'eur': return subtotal * tasas.euro_bcv;
      case 'usdt': return subtotal * tasas.usdt;
      case 'bs':
      default:
        return subtotal;
    }
  };

  const calculateSubtotalRef = (item: Item) => {
    if (!tasas) return 0;
    const rate = selectedRate === 'bcv' ? tasas.dolar_bcv : tasas.euro_bcv;
    return calculateSubtotalBs(item) / rate;
  };

  const totalBs = items.reduce((acc, item) => acc + calculateSubtotalBs(item), 0);
  
  const totalRef = tasas ? totalBs / (selectedRate === 'bcv' ? tasas.dolar_bcv : tasas.euro_bcv) : 0;
  const totalUsdt = tasas ? totalBs / tasas.usdt : 0;
  const totalOther = tasas ? totalBs / (selectedRate === 'bcv' ? tasas.euro_bcv : tasas.dolar_bcv) : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Generador de Presupuestos</h1>
                <p className="text-gray-600 mt-2">Agregue artículos y calcule en tiempo real según la tasa seleccionada.</p>
              </div>
              <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-xl">
                <button
                  onClick={() => setSelectedRate('bcv')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    selectedRate === 'bcv' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Tasa BCV
                </button>
                <button
                  onClick={() => setSelectedRate('euro')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    selectedRate === 'euro' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Tasa EURO
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h2 className="font-bold text-gray-700">Artículos</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetItems}
                      title="Limpiar todo"
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-200 transition-colors border border-red-200"
                    >
                      🗑 Limpiar
                    </button>
                    <button 
                      onClick={addItem}
                      className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg"
                    >
                      <span className="text-2xl">+</span>
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-b pb-4 border-gray-100 last:border-0 last:pb-0">
                      <div className="md:col-span-4">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Artículo</label>
                        <input
                          type="text"
                          value={item.nombre}
                          onChange={(e) => updateItem(item.id, 'nombre', e.target.value)}
                          placeholder="Nombre del artículo"
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Cant.</label>
                        <input
                          type="number"
                          value={item.cantidad}
                          onChange={(e) => updateItem(item.id, 'cantidad', parseFloat(e.target.value) || 0)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Moneda</label>
                        <select
                          value={item.moneda}
                          onChange={(e) => updateItem(item.id, 'moneda', e.target.value as any)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer"
                        >
                          <option value="bs">Bs</option>
                          <option value="usd">USD ($)</option>
                          <option value="eur">EUR (€)</option>
                          <option value="usdt">USDT (💎)</option>
                        </select>
                      </div>
                      <div className="md:col-span-3">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                          Precio ({getCurrencySymbol(item.moneda)})
                        </label>
                        <input
                          type="number"
                          value={item.precio}
                          onChange={(e) => updateItem(item.id, 'precio', parseFloat(e.target.value) || 0)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        {items.length > 1 && (
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-3 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="md:col-span-12 text-right pt-2">
                        <span className="text-sm font-medium text-gray-400">Subtotal: </span>
                        <span className="font-bold text-gray-700">
                          {(item.cantidad * item.precio).toFixed(2)} {getCurrencySymbol(item.moneda)}
                        </span>
                        {item.moneda !== 'bs' && (
                          <>
                            <span className="text-gray-300 mx-2">|</span>
                            <span className="text-sm text-gray-500">
                              {calculateSubtotalBs(item).toFixed(2)} Bs
                            </span>
                          </>
                        )}
                        <span className="text-gray-300 mx-2">|</span>
                        <span className="font-bold text-blue-600">
                          {calculateSubtotalRef(item).toFixed(2)} {selectedRate === 'bcv' ? '$' : '€'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
                <div className="p-6 border-b border-gray-100 bg-blue-600">
                  <h2 className="font-bold text-white text-xl">Resumen del Total</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total en Bolívares</p>
                    <p className="text-4xl font-black text-gray-800">{totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs</p>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100 space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div>
                        <p className="text-blue-600 text-xs font-bold uppercase">Total {selectedRate === 'bcv' ? 'Dólar BCV' : 'Euro BCV'}</p>
                        <p className="text-2xl font-bold text-blue-800">
                          {totalRef.toFixed(2)} {selectedRate === 'bcv' ? '$' : '€'}
                        </p>
                      </div>
                      <span className="text-2xl">{selectedRate === 'bcv' ? '🇺🇸' : '🇪🇺'}</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-100">
                      <div>
                        <p className="text-green-600 text-xs font-bold uppercase">Total USDT</p>
                        <p className="text-2xl font-bold text-green-800">{totalUsdt.toFixed(2)} 💎</p>
                      </div>
                      <span className="text-xl">USDT</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                      <div>
                        <p className="text-indigo-600 text-xs font-bold uppercase">Total {selectedRate === 'bcv' ? 'Euro BCV' : 'Dólar BCV'}</p>
                        <p className="text-2xl font-bold text-indigo-800">
                          {totalOther.toFixed(2)} {selectedRate === 'bcv' ? '€' : '$'}
                        </p>
                      </div>
                      <span className="text-2xl">{selectedRate === 'bcv' ? '🇪🇺' : '🇺🇸'}</span>
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <p className="text-xs text-gray-400">Tasas actuales: 
                      BCV: {tasas?.dolar_bcv} | 
                      EURO: {tasas?.euro_bcv} | 
                      USDT: {tasas?.usdt}
                    </p>
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
