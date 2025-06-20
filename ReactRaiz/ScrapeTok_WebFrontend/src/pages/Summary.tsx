import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchExpenseSummary } from "../service/expensesService";
import type { BackendExpenseSummaryItem } from "../interfaces/Expense";
import { useNavigate } from "react-router-dom";

// Interfaz para la UI
interface ExpenseSummaryItem {
  categoryId: number;
  categoryName: string;
  amount: number;
}

const Summary: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [rawData, setRawData] = useState<BackendExpenseSummaryItem[]>([]);
  const [summary, setSummary] = useState<ExpenseSummaryItem[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // 1. Traer todos los registros una sola vez (cuando cambia el token)
  useEffect(() => {
    if (!token) return;
    const fetchAll = async () => {
      try {
        const data = await fetchExpenseSummary(token);
        setRawData(data);
      } catch (error) {
        console.error("Error al cargar datos crudos", error);
      }
    };
    fetchAll();
  }, [token]);

  // 2. Filtrar y agrupar en cliente al cambiar mes/año o rawData
  useEffect(() => {
    const filtered = rawData.filter(
      (item) => item.year === selectedYear && item.month === selectedMonth
    );
    const grouped = filtered.reduce<Record<number, ExpenseSummaryItem>>(
      (acc, item) => {
        const id = item.expenseCategory.id;
        if (!acc[id]) {
          acc[id] = {
            categoryId: id,
            categoryName: item.expenseCategory.name,
            amount: 0,
          };
        }
        acc[id].amount += item.amount;
        return acc;
      },
      {}
    );
    setSummary(Object.values(grouped));
  }, [rawData, selectedYear, selectedMonth]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10 flex justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-7xl p-8 space-y-8">
        {/* === HEADER === */}
        <div className="relative mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Resumen de gastos</h1>
            <p className="text-lg text-gray-300">
              del mes de{" "}
              <span className="capitalize">{months[selectedMonth - 1]}</span> de{" "}
              {selectedYear}
            </p>
          </div>
          <div className="absolute top-0 right-0 flex items-center gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
            >
              {months.map((m, i) => (
                <option key={i} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
            >
              {[2023, 2024, 2025].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* === CONTENIDO === */}
        {summary.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-lg">
            No hay datos para mostrar en este mes.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {summary.map((item) => (
              <div
  key={item.categoryId}
onClick={() =>
  navigate(
    `/category/${item.categoryId}?month=${selectedMonth}&year=${selectedYear}`
  )
}  className="bg-gray-700 border border-gray-600 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition"
>
  <div className="flex justify-between items-center">
    <span className="capitalize font-medium">
      {item.categoryName}
    </span>
    <span className="font-bold text-green-400">
      S/ {item.amount.toFixed(2)}
    </span>
  </div>
</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
