import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const Notification = ({ balance, savings }) => {
  const toast = useToast();
  const spendingLimit = balance - savings;

  useEffect(() => {
    if (balance < spendingLimit) {
      toast({
        title: "Warning: Exceeding Safe Spending Limit",
        description: `You're spending more than your safe balance.`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [balance, savings, toast]);

  return null;
};

export default Notification;
