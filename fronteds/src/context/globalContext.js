import React, { useContext, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const apiUrl = process.env.REACT_APP_API_URL;
const BASE_URL = `https://mernexpense.vercel.app/api/v1/`;

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Add Income
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
        } catch (err) {
            setError(err?.response?.data?.message || "Error occurred while adding income");
        }
    };

    // Get Incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
        } catch (err) {
            setError(err?.response?.data?.message || "Error occurred while fetching incomes");
        }
    };

    // Delete Income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (err) {
            setError(err?.response?.data?.message || "Error occurred while deleting income");
        }
    };

    // Total Income
    const totalIncome = () => {
        return incomes.reduce((acc, income) => acc + income.amount, 0);
    };

    // Add Expense
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            getExpenses();
        } catch (err) {
            setError(err?.response?.data?.message || "Error occurred while adding expense");
        }
    };

    // Get Expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError(err?.response?.data?.message || "Error occurred while fetching expenses");
        }
    };

    // Delete Expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            setError(err?.response?.data?.message || "Error occurred while deleting expense");
        }
    };

    // Total Expenses
    const totalExpenses = () => {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0);
    };

    // Total Balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Transaction History
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
