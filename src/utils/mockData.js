const today = new Date();
const tenMonthsAgo = new Date(today);
tenMonthsAgo.setMonth(today.getMonth() - 10); // Set the date to 10 months ago

// We'll store the customerIds generated for each customer to ensure they stay consistent.
const customerIds = new Map();

export const transactions = Array.from({ length: 100 }, (_, index) => {
  const transactionId = (index + 1).toString();
  const customerNames = ["John Doe", "Jane Smith", "Alice Johnson", "Robert Brown", "Michael White"];
  const products = ["Laptop", "Smartphone", "Headphones", "Tablet", "Smartwatch", "Monitor", "Keyboard", "Mouse", "Camera", "Printer"];
  
  const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
  
  // Check if the customer already has an ID, otherwise generate and store a new one.
  let customerId = customerIds.get(customerName);
  if (!customerId) {
    customerId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    customerIds.set(customerName, customerId);
  }
  
  const product = products[Math.floor(Math.random() * products.length)];
  const price = (Math.random() * (500 - 50) + 50).toFixed(2); 
  
  // Generate a random date between tenMonthsAgo and today
  const randomDate = new Date(tenMonthsAgo.getTime() + Math.random() * (today.getTime() - tenMonthsAgo.getTime()));
  const purchaseDate = randomDate.toISOString();

  return {
    transactionId,
    customerId,
    customerName,
    purchaseDate,
    product,
    price: parseFloat(price),
  };
});
