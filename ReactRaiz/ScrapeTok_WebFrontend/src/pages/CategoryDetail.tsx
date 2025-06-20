import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getExpensesByCategory } from "../service/expensesService";
import type { BackendExpenseDetailItem } from "../interfaces/Expense";
import { useParams, useSearchParams } from "react-router-dom";



const CategoryDetail: React.FC = () => {
  const { token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);
const [searchParams] = useSearchParams();
const initialYear = Number(searchParams.get("year")) || new Date().getFullYear();
const initialMonth = Number(searchParams.get("month")) || new Date().getMonth() + 1;
const [year, setYear] = useState<number>(initialYear);
const [month, setMonth] = useState<number>(initialMonth);
  const [details, setDetails] = useState<BackendExpenseDetailItem[]>([]);

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  useEffect(() => {
    if (!token || !categoryId) return;
    const fetchDetails = async () => {
      try {
        const data = await getExpensesByCategory(year, month, categoryId, token);
        setDetails(data);
      } catch (error) {
        console.error("Error al obtener detalles de categoría", error);
      }
    };
    fetchDetails();
  }, [token, categoryId, year, month]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10 flex justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-7xl p-8 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gastos de la categoría {categoryId}</h1>
          <div className="flex gap-4">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
            >
              {months.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
            >
              {[2023, 2024, 2025].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {details.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-lg">
            No hay gastos registrados en esta categoría para este periodo.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {details.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-600 transition"
              >
                <div className="text-sm text-gray-400 mb-2">ID: {item.id}</div>
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

export default CategoryDetail;
