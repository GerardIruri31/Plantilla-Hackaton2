import axios from "axios";
import type { BackendExpenseDetailItem, BackendExpenseSummaryItem} from "../interfaces/Expense";

const URL = import.meta.env.VITE_API_URL;

export const getExpensesByCategory = async (
  year: number,
  month: number,
  categoryId: number,
  token: string
): Promise<BackendExpenseDetailItem[]> => {
  const response = await axios.get<BackendExpenseDetailItem[]>(
    `${URL}/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
export const registerExpense = async (
  date: string,
  amount: number,
  categoryId: number,
  token: string
): Promise<void> => {
  await axios.post(
    `${URL}/expenses`,
    {
      amount,
      category: { id: categoryId },
      date,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteExpense = async (
  expenseId: number,
  token: string
): Promise<void> => {
  await axios.delete(`${URL}/expenses/${expenseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const fetchExpenseSummary = async (
  token: string
): Promise<BackendExpenseSummaryItem[]> => {
  const response = await axios.get<BackendExpenseSummaryItem[]>(
    `${URL}/expenses_summary`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
