import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchCategories } from "../service/categoryService";
import type { Category } from "../interfaces/Category";

const ViewCategories: React.FC = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const data = await fetchCategories(token);
        setCategories(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10 flex justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-7xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Categorías de gastos</h1>
        </div>

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
