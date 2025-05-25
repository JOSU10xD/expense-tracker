import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { Box, Input, Button, VStack, Select, Text } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const ExpenseTracker = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const categories = ["Food", "Entertainment", "Shopping", "Groceries", "Vehicle", "Custom"];

  const addExpense = async () => {
    const category = selectedCategory === "Custom" ? customCategory : selectedCategory;
    if (!category || !amount) return;

    const expenseData = { category, amount: parseFloat(amount), date: new Date().toISOString() };

    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const currentBalance = userSnap.data().balance || 0;
        const newBalance = currentBalance - parseFloat(amount);

        await updateDoc(userRef, {
          balance: newBalance,
        });

        await addDoc(collection(db, "users", user.uid, "expenses"), expenseData);
      }
    } else {
      let localBalance = JSON.parse(localStorage.getItem("balance")) || 0;
      localBalance -= parseFloat(amount);
      localStorage.setItem("balance", JSON.stringify(localBalance));

      const localExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      localExpenses.push(expenseData);
      localStorage.setItem("expenses", JSON.stringify(localExpenses));
    }

    setAmount("");
    setCustomCategory("");
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

export default ExpenseTracker;
