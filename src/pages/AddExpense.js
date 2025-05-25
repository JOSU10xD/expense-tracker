import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Box, Input, Button, VStack, Select, Text } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const AddExpense = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // ✅ Create navigation instance
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const categories = ["Food", "Entertainment", "Shopping", "Groceries", "Vehicle", "Custom"];

  const addExpense = async () => {
    const category = selectedCategory === "Custom" ? customCategory : selectedCategory;
    if (!category || !amount) return;

    const expenseData = {
      category,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };

    if (user) {
      await addDoc(collection(db, "users", user.uid, "expenses"), expenseData);
    } else {
      const localExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      localExpenses.push(expenseData);
      localStorage.setItem("expenses", JSON.stringify(localExpenses));
    }

    setAmount("");
    setCustomCategory("");

    navigate("/"); // ✅ Redirect to home page after saving
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="lg">
      <Text fontSize="lg" fontWeight="bold" mb={3}>Add an Expense</Text>
      <VStack spacing={3} align="stretch">
        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </Select>
        {selectedCategory === "Custom" && (
          <Input placeholder="Enter Custom Category" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} />
        )}
        <Input type="number" inputMode="numeric" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Button onClick={addExpense} colorScheme="red">Add Expense</Button>
      </VStack>
    </Box>
  );
};

export default AddExpense;
