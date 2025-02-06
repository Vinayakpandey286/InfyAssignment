export const transactions = Array.from({ length: 100 }, (_, index) => {
  const transactionId = (index + 1).toString();
  const customerNames = ["John Doe", "Jane Smith", "Alice Johnson", "Robert Brown", "Michael White"];
  const products = ["Laptop", "Smartphone", "Headphones", "Tablet", "Smartwatch", "Monitor", "Keyboard", "Mouse", "Camera", "Printer"];
  
  const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
  const customerId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  const product = products[Math.floor(Math.random() * products.length)];
  const price = (Math.random() * (500 - 50) + 50).toFixed(2); 
  
  const randomYear = Math.floor(Math.random() * 5) + 2020; 
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomDay = Math.floor(Math.random() * 28) + 1;
  const purchaseDate = new Date(randomYear, randomMonth - 1, randomDay).toISOString();

  return {
    transactionId,
    customerId,
    customerName,
    purchaseDate,
    product,
    price: parseFloat(price),
  };
});