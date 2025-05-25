import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Box, Select, Text } from "@chakra-ui/react";

const ExpenseChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [timeFilter, setTimeFilter] = useState("month");

  useEffect(() => {
    const fetchExpenses = () => {
      if (!db) return;
      const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setExpenses(groupByTime(data, timeFilter));
      });

      return () => unsubscribe();
    };

    fetchExpenses();
  }, [timeFilter]);

  const groupByTime = (data, filter) => {
    const now = new Date();
    const grouped = {};

    data.forEach(({ category, amount, date }) => {
      const expenseDate = new Date(date);
      if (
        (filter === "day" && expenseDate.toDateString() === now.toDateString()) ||
        (filter === "month" && expenseDate.getMonth() === now.getMonth()) ||
        (filter === "year" && expenseDate.getFullYear() === now.getFullYear())
      ) {
        grouped[category] = (grouped[category] || 0) + amount;
      }
    });

    return Object.entries(grouped).map(([category, amount]) => ({ category, amount }));
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="lg">
      <Text fontSize="lg" fontWeight="bold" mb={3}>Expense Breakdown</Text>
      <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </Select>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={expenses}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#38A169" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ExpenseChart;
