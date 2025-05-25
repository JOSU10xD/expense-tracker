import { Box, Input, VStack, Text } from "@chakra-ui/react";

const IncomeSection = ({ setIncome }) => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">Income</Text>
      <VStack spacing={2}>
        <Input type="number" placeholder="Enter Income" onChange={(e) => setIncome(parseFloat(e.target.value) || 0)} />
      </VStack>
    </Box>
  );
};

export default IncomeSection;
