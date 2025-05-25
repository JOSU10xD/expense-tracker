import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Box, Input, Button } from "@chakra-ui/react";

const Settings = () => {
  const { user } = useAuth();
  const [savingsGoal, setSavingsGoal] = useState("");

  useEffect(() => {
    if (!user) {
      const localGoal = localStorage.getItem("savingsGoal");
      if (localGoal) setSavingsGoal(localGoal);
      return;
    }

    const fetchData = async () => {
      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);
      if (userData.exists()) {
        setSavingsGoal(userData.data().savingsGoal || "");
      }
    };

    fetchData();
  }, [user]);

  const updateSavingsGoal = async () => {
    if (!user) {
      localStorage.setItem("savingsGoal", savingsGoal);
      return;
    }
    
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { savingsGoal });
  };

  return (
    <Box>
      <Input
        placeholder="Set Monthly Savings Goal"
        value={savingsGoal}
        onChange={(e) => setSavingsGoal(e.target.value)}
      />
      <Button onClick={updateSavingsGoal}>Update Goal</Button>
    </Box>
  );
};

export default Settings;
