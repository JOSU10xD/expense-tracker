import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import AppContent from "./AppContent";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import LoginPage from "./pages/LoginPage"; // ✅ Import Login Page
import SettingsPage from "./pages/SettingsPage"; // ✅ Import Settings Page
import SidePanel from "./components/SidePanel";

const App = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <ChakraProvider>
      <Router>
        <Box>
          {/* Menu Button to Toggle SidePanel */}
          <Button position="fixed" top="10px" left="10px" colorScheme="green" onClick={() => setIsPanelOpen(true)}>
            ☰ Menu
          </Button>

          {/* SidePanel Component */}
          <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />

          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/login" element={<LoginPage />} /> {/* ✅ Add Login Route */}
            <Route path="/settings" element={<SettingsPage />} /> {/* ✅ Add Settings Route */}
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
