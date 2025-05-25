import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";

const AuthPage = ({ isSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      if (isSignup) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCred.user.uid), { email, expenses: [], savings: 0 });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      window.location.href = "/"; // Redirect to home after successful login/signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="lg">
      <VStack spacing={4}>
        <Text fontSize="xl">{isSignup ? "Sign Up" : "Login"}</Text>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <Text color="red">{error}</Text>}
        <Button colorScheme="green" onClick={handleAuth}>{isSignup ? "Sign Up" : "Login"}</Button>
      </VStack>
    </Box>
  );
};

export default AuthPage;
