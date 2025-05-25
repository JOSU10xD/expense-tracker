import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // ✅ Redirect to home after login
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("User not found. Please check your email or sign up.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="lg">
      <VStack spacing={4}>
        <Text fontSize="xl">Login</Text>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <Text color="red">{error}</Text>}
        <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
