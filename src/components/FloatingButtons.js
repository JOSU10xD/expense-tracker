import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

const FloatingButtons = () => {
  const navigate = useNavigate();

  return (
    <Box position="fixed" bottom="20px" left="50%" transform="translateX(-50%)" display="flex" gap="10px">
      <Button colorScheme="green" size="lg" onClick={() => navigate("/add-income")}>+</Button>
      <Button colorScheme="red" size="lg" onClick={() => navigate("/add-expense")}>-</Button>
    </Box>
  );
};

export default FloatingButtons;
