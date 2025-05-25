import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // ✅ Detect page changes
import { Box, VStack } from "@chakra-ui/react";
import FloatingButtons from "./components/FloatingButtons";
import Balance from "./components/Balance";
import ExpenseTracker from "./components/ExpenseTracker";
import ExpenseChart from "./components/ExpenseChart";
import Savings from "./components/Savings";

const AppContent = () => {
  const location = useLocation(); // ✅ Detect when route changes
  const [key, setKey] = useState(0); // ✅ Force re-render on route change

  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // ✅ Update key to re-render components
  }, [location]);

  return (
    <Box p={5} key={key}>
      <VStack spacing={6}>
        <Balance />
        <ExpenseTracker />
        <ExpenseChart />
        <Savings />
      </VStack>
      <FloatingButtons />
    </Box>
  );
};

export default AppContent;
