import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Box, Input, Button, VStack } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const AddExpenseForm = ({ addExpense }) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !amount || !date) return;

    const expenseData = { name, amount: parseFloat(amount), date };

    if (user) {
      await addDoc(collection(db, "users", user.uid, "expenses"), expenseData);
    } else {
      const localExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      localExpenses.push(expenseData);
      localStorage.setItem("expenses", JSON.stringify(localExpenses));
    }

    addExpense(expenseData);
    setName("");
    setAmount("");
    setDate("");
  };

  return (
    <Box>
      <VStack as="form" onSubmit={handleSubmit} spacing={3}>
        <Input placeholder="Expense Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Button type="submit" colorScheme="blue">Add Expense</Button>
      </VStack>
    </Box>
  );
};

export default AddExpenseForm;
