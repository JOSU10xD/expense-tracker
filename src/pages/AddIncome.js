import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, collection, addDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Box, Input, Button, VStack, Select, Text } from "@chakra-ui/react";

const AddIncome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [incomeSources, setIncomeSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [customSource, setCustomSource] = useState("");

  useEffect(() => {
    if (!user) {
      const localIncome = JSON.parse(localStorage.getItem("incomeData")) || [];
      if (localIncome.length === 0) {
        setIsFirstTime(true);
      } else {
        setIncomeSources(localIncome);
      }
      return;
    }

    const fetchIncomeSources = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().incomeSources) {
        setIncomeSources(userSnap.data().incomeSources);
      } else {
        setIsFirstTime(true);
      }
    };

    fetchIncomeSources();
  }, [user]);

  const handleFirstTimeSave = async () => {
    if (!income) return;

    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { incomeSources: [{ source: "Salary", amount: parseFloat(income) }] });
    } else {
      localStorage.setItem("incomeData", JSON.stringify([{ source: "Salary", amount: parseFloat(income) }]));
    }

    navigate("/");
  };

  const addIncomeToBalance = async () => {
    const amountToAdd = parseFloat(income);
    if (!amountToAdd) return;

    const newIncome = { source: selectedSource === "Custom" ? customSource : selectedSource, amount: amountToAdd };

    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const existingIncomes = userSnap.data().incomeSources || [];
        await updateDoc(userRef, { 
          balance: (userSnap.data().balance || 0) + amountToAdd,
          incomeSources: [...existingIncomes, newIncome],
        });
      }
    } else {
      const localBalance = JSON.parse(localStorage.getItem("balance")) || 0;
      const localIncomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
      
      localStorage.setItem("balance", JSON.stringify(localBalance + amountToAdd));
      localStorage.setItem("incomeData", JSON.stringify([...localIncomeData, newIncome]));
    }

    navigate("/");
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="lg">
      <VStack spacing={4}>
        {isFirstTime ? (
          <>
            <Text fontSize="xl">Enter Your Salary/Income</Text>
            <Input type="number" placeholder="Income Amount" value={income} onChange={(e) => setIncome(e.target.value)} />
            <Button colorScheme="green" onClick={handleFirstTimeSave}>Save</Button>
          </>
        ) : (
          <>
            <Text fontSize="xl">Select Income Source</Text>
            <Select placeholder="Select Source" value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)}>
              {incomeSources.map(({ source }) => (
                <option key={source}>{source}</option>
              ))}
              <option value="Custom">Custom</option>
            </Select>

            {selectedSource === "Custom" && (
              <Input placeholder="Enter Custom Source" value={customSource} onChange={(e) => setCustomSource(e.target.value)} />
            )}

            <Input type="number" placeholder="Amount" value={income} onChange={(e) => setIncome(e.target.value)} />
            <Button colorScheme="green" onClick={addIncomeToBalance}>Add to Balance</Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default AddIncome;
