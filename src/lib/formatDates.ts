export const formatDate = (dateString: string) => {
  const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};
