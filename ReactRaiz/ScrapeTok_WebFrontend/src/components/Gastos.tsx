import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import type { BackendExpenseDetailItem } from "../interfaces/Expense";

// Mapping de categorías estático
export const URL = import.meta.env.VITE_API_URL;

const categorias: Record<number, string> = {
  1: "Alimentación",
  2: "Transporte",
  3: "Vivienda",
  4: "Servicios (agua, luz, internet)",
  5: "Educación",
  6: "Salud",
  7: "Entretenimiento",
  8: "Ropa y calzado",
  9: "Ahorros",
  10: "Impuestos",
  11: "Mascotas",
  12: "Viajes",
  13: "Donaciones",
  14: "Seguros",
  15: "Hijos y familia",
  16: "Gimnasio y deporte",
  17: "Tecnología y gadgets",
  18: "Mantenimiento del hogar",
  19: "Bebidas y snacks",
  20: "Otros gastos personales",
};


const Gastos: React.FC = () => {
  const { token } = useAuth();

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [details, setDetails] = useState<BackendExpenseDetailItem[]>([]);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Fetch detalle al cambiar filtros
  useEffect(() => {
    if (!token) return;
    const fetchDetails = async () => {
      try {
        const url =
          URL +
          `/expenses/detail?year=${year}&month=${month}&categoryId=${selectedCategory}`;
        const { data } = await axios.get<BackendExpenseDetailItem[]>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDetails(data);
      } catch (error) {
        console.error("Error al obtener detalles", error);
      }
    };
    fetchDetails();
  }, [token, year, month, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10 flex justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-7xl p-8 space-y-6">
        {/* Header: Título, filtros y acciones */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">Detalle de gastos</h1>
          <div className="flex flex-wrap items-center gap-4">
            {/* Select Mes */}
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
            >
              {months.map((m, i) => (
                <option key={i} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
            {/* Select Año */}
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
            >
              {[2023, 2024, 2025].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {/* Select Categoría */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
            >
              {Object.entries(categorias).map(([id, name]) => (
                <option key={id} value={Number(id)}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid de gastos individuales */}
        {details.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-lg">
            No hay gastos para este filtro.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {details.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-600 transition"
              >
                <div className="text-gray-300 text-sm mb-1">ID: {item.id}</div>
                <div className="font-medium">{item.date}</div>
                <div className="mt-2 font-bold text-green-400">
                  S/ {item.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gastos;
