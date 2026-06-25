// NOTE: Rates/structure are illustrative for a mock. Confirm actual GST
// rates, HSN/SAC codes and Sec 9(5) liability with a CA before production.
export const GST = { cgst: 0.025, sgst: 0.025, igst: 0.05 }; // 5% food
export const PLATFORM_GST = 0.09; // 18% on platform/commission, split 9+9

export const inr = (n) =>
  `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Customer food order bill (Zomato/Swiggy style)
export const orderInvoice = {
  type: "order",
  number: "ZG/ORD/2026/0421",
  date: "25 Jun 2026",
  customer: "Priya Sharma",
  gstin: "29ABCDE1234F1Z5",
  state: "Karnataka",
  items: [
    { name: "Idli Sambar", qty: 2, price: 60 },
    { name: "Medu Vada (2pc)", qty: 1, price: 80 },
  ],
  charges: { delivery: 30, platform: 6, packaging: 15 },
};

// Cook payout statement (commission deducted)
export const payoutInvoice = {
  type: "payout",
  number: "ZG/PAY/2026/0088",
  date: "24 Jun 2026",
  cook: "Sunita's Kitchen",
  gstin: "29SUNIT5678K1Z2",
  grossSales: 8420,
  commissionRate: 0.18,
  orders: 32,
};

// Zingro subscription invoice
export const subscriptionInvoice = {
  type: "subscription",
  number: "ZG/SUB/2026/0156",
  date: "25 Jun 2026",
  customer: "Sunita's Kitchen",
  gstin: "29SUNIT5678K1Z2",
  plan: "Pro Plan",
  period: "30 days",
  amount: 299,
};
