import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  registerExpense,
  deleteExpense } from "../service/expensesService";
import type { Category } from "../interfaces/Category";
import { fetchCategories } from "../service/categoryService";


const ManageExpenses: React.FC = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  // Form state for new expense
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [categoryId, setCategoryId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  // State for deletion
  const [deleteId, setDeleteId] = useState<number>(0);

  // Feedback
  const [message, setMessage] = useState<string>("");

  // Fetch categories on mount
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
  try {
    const data = await fetchCategories(token);
    setCategories(data);
    if (data.length > 0) setCategoryId(data[0].id);
  } catch (err) {
    console.error("Error al cargar categorías", err);
  }
};
fetchData();
  }, [token]);

 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!token) {
    setMessage("No hay sesión activa.");
    return;
  }
  try {
    await registerExpense(date, amount, categoryId, token);
    setMessage("Gasto registrado correctamente.");
  } catch (err) {
    console.error("Error al registrar gasto", err);
    setMessage("Error al registrar gasto.");
  }
};
 
const handleDelete = async () => {
  if (!token) {
    setMessage("No hay sesión activa.");
    return;
  }
  try {
    await deleteExpense(deleteId, token);
    setMessage("Gasto eliminado correctamente.");
  } catch (err) {
    console.error("Error al eliminar gasto", err);
    setMessage("Error al eliminar gasto.");
  }
};



  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10 flex justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl p-8 space-y-8 text-center">
        <h1 className="text-2xl font-bold">Registrar y eliminar gastos</h1>

        {message && (
          <div className="text-center text-green-400 font-medium">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form para registrar gasto */}
          <form
            onSubmit={handleRegister}
            className="space-y-4 bg-gray-700 p-6 rounded-lg"
          >
            <h2 className="text-lg font-semibold">Registrar gasto</h2>

            <div>
              <label className="block text-gray-300 mb-1">Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-600 text-white border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Categoría</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full bg-gray-600 text-white border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Monto</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-gray-600 text-white border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 rounded py-2 font-medium transition"
            >
              Registrar gasto
            </button>
          </form>

          {/* Sección para eliminar gasto */}
          <div className="space-y-4 bg-gray-700 p-6 rounded-lg">
            <h2 className="text-lg font-semibold">Eliminar gasto</h2>

            <div>
              <label className="block text-gray-300 mb-1">ID del gasto</label>
              <input
                type="number"
                min="1"
                value={deleteId}
                onChange={(e) => setDeleteId(Number(e.target.value))}
                className="w-full bg-gray-600 text-white border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>

            <button
              onClick={handleDelete}
              className="w-full bg-red-600 hover:bg-red-500 rounded py-2 font-medium transition"
            >
              Eliminar gasto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageExpenses;
