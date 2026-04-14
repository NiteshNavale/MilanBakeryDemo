export const ownerMetrics = {
  todayRevenue: 14250,
  batchesCompleted: 5,
  outstandingPayments: 12450,
  activeTrips: 2,
};

export const actionQueue = [
  { id: 1, text: "2 packs returned: Broken Seal", action: "Refurbish or Waste?" },
  { id: 2, text: "Pending payment from Ramesh Stores", action: "Send Reminder" },
];

export const salesmen = [
  { id: 1, name: "Kiran" },
  { id: 2, name: "Rahul" },
];

export const shops = [
  { id: 1, name: "Ramesh Stores", address: "123 Main St" },
  { id: 2, name: "Ganesh Traders", address: "456 Market Rd" },
  { id: 3, name: "Sri Sai Supermarket", address: "789 High St" },
];

export const plannedBatches = [
  { id: "B-101", product: "White Bread", targetQty: 500 },
  { id: "B-102", product: "Brown Bread", targetQty: 200 },
];

export const inProgressBatches = [
  { id: "B-099", product: "Sweet Buns", targetQty: 300 },
];

export const completedBatches = [
  { id: "B-098", product: "Pav", targetQty: 1000 },
];

export const rawMaterialsMap: Record<string, { material: string; perUnit: number }[]> = {
  "White Bread": [
    { material: "Maida (kg)", perUnit: 0.5 },
    { material: "Sugar (kg)", perUnit: 0.06 },
    { material: "Yeast (kg)", perUnit: 0.01 },
  ],
  "Brown Bread": [
    { material: "Wheat Flour (kg)", perUnit: 0.5 },
    { material: "Sugar (kg)", perUnit: 0.04 },
    { material: "Yeast (kg)", perUnit: 0.01 },
  ],
  "Sweet Buns": [
    { material: "Maida (kg)", perUnit: 0.4 },
    { material: "Sugar (kg)", perUnit: 0.1 },
    { material: "Yeast (kg)", perUnit: 0.01 },
  ],
  "Pav": [
    { material: "Maida (kg)", perUnit: 0.45 },
    { material: "Yeast (kg)", perUnit: 0.015 },
  ]
};

export const salesmanRoute = [
  { id: 1, name: "Ramesh Stores", address: "123 Main St", status: "Pending", expectedItems: [{ name: "Bread 30-pack", qty: 5 }, { name: "Sweet Buns", qty: 2 }], amountDue: 1500 },
  { id: 2, name: "Ganesh Traders", address: "456 Market Rd", status: "Pending", expectedItems: [{ name: "Pav", qty: 10 }], amountDue: 800 },
];

export const weeklySalesData = [
  { name: 'Mon', sales: 12000 },
  { name: 'Tue', sales: 13500 },
  { name: 'Wed', sales: 11000 },
  { name: 'Thu', sales: 14250 },
  { name: 'Fri', sales: 15000 },
  { name: 'Sat', sales: 18000 },
  { name: 'Sun', sales: 19500 },
];
