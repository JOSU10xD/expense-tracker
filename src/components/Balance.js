import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { Box, Text } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import Notification from "./Notification";

const Balance = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!user) {
      const localBalance = JSON.parse(localStorage.getItem("balance")) || 0;
      setBalance(localBalance);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setBalance(docSnap.data().balance || 0);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <Box p={4} bg="green.100" borderRadius="lg" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold">Balance: ${balance.toFixed(2)}</Text>
      <Notification balance={balance} />
    </Box>
  );
};

export default Balance;
