import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export const URL = import.meta.env.VITE_API_URL;

// Tipo de categoría
interface Category {
  id: number;
  name: string;
}

const ViewCategories: React.FC = () => {
  const { token } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);

  // Traer categorías al montar
  useEffect(() => {
    if (!token) return;
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get<Category[]>(
          URL + `/expenses_category`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategories(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };
    fetchCategories();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10 flex justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-7xl p-8 space-y-6">
        {/* Header con título y Logout */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Categorías de gastos</h1>
        </div>

        {/* Grid de categorías */}
        {categories.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-lg">
            Cargando categorías...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-600 transition"
              >
                <div className="text-gray-300 text-sm mb-1">ID: {cat.id}</div>
                <div className="font-medium">{cat.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCategories;
