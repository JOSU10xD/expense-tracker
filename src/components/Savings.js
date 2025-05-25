import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Box, Text, Button } from "@chakra-ui/react";

const Savings = () => {
  const { user } = useAuth();
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    if (!user) {
      const localSavings = localStorage.getItem("savings");
      if (localSavings) setSavings(JSON.parse(localSavings));
      return;
    }

    const fetchSavings = async () => {
      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);
      if (userData.exists()) {
        setSavings(userData.data().savings || 0);
      }
    };

    fetchSavings();
  }, [user]);

  const addMonthlySavings = async () => {
    if (!user) {
      const updatedSavings = savings + 100;
      setSavings(updatedSavings);
      localStorage.setItem("savings", JSON.stringify(updatedSavings));
      return;
    }

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { savings: savings + 100 });
    setSavings((prev) => prev + 100);
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="lg">
      <Text fontSize="xl">Savings Balance: ${savings}</Text>
      <Button colorScheme="green" onClick={addMonthlySavings}>Add Monthly Savings</Button>
    </Box>
  );
};

export default Savings;
