import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SidePanel = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      position="fixed"
      top="0"
      left={isOpen ? "0" : "-260px"}
      width="250px"
      height="100vh"
      bg="green.700"
      color="gray.900"
      p={4}
      transition="left 0.3s ease-in-out"
      zIndex="1000"
    >
      <VStack align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold">Expense Tracker</Text>

        <Button size="sm" bg="red.500" color="white" onClick={onClose}>Close</Button>

        {user ? (
          <>
            <Text fontSize="md" fontWeight="bold">Email: {user.email}</Text>
            <Button size="sm" bg="blue.500" color="white" onClick={() => signOut(auth)}>Logout</Button>
          </>
        ) : (
          <Button size="sm" bg="blue.500" color="white" onClick={() => navigate("/login")}>Login / Sign Up</Button> 
        )}

        {/* Navigation Options */}
        <Button size="sm" bg="gray.300" color="black" onClick={() => navigate("/settings")}>Settings</Button>
      </VStack>
    </Box>
  );
};

export default SidePanel;
