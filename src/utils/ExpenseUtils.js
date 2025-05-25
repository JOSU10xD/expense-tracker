export const groupExpensesByTime = (data, filter) => {
  const now = new Date();
  const filteredData = data.filter((expense) => {
    const expenseDate = new Date(expense.date);
    if (filter === "day") return expenseDate.toDateString() === now.toDateString();
    if (filter === "week") return now - expenseDate < 7 * 24 * 60 * 60 * 1000;
    if (filter === "month") return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
    if (filter === "year") return expenseDate.getFullYear() === now.getFullYear();
    return true;
  });

  const grouped = filteredData.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};
