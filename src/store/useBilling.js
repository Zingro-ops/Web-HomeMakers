import { useSyncExternalStore } from "react";
import {
  orderInvoice,
  payoutInvoice,
  subscriptionInvoice,
  GST,
  PLATFORM_GST,
} from "../data/billing";

const invoices = {
  order: orderInvoice,
  payout: payoutInvoice,
  subscription: subscriptionInvoice,
};

let state = { active: "order" };
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l) => (listeners.add(l), () => listeners.delete(l));

export const setInvoiceType = (active) => {
  state = { active };
  emit();
};
export function useBilling() {
  return useSyncExternalStore(subscribe, () => state);
}
export const getInvoice = (type) => invoices[type];

// Returns normalized lines + tax breakdown for any invoice type
export function computeBill(inv) {
  if (inv.type === "order") {
    const itemTotal = inv.items.reduce((s, i) => s + i.qty * i.price, 0);
    const { delivery, platform, packaging } = inv.charges;
    const foodCgst = itemTotal * GST.cgst;
    const foodSgst = itemTotal * GST.sgst;
    const platTaxable = delivery + platform + packaging;
    const platCgst = platTaxable * PLATFORM_GST;
    const platSgst = platTaxable * PLATFORM_GST;
    const taxes = [
      { label: "CGST (2.5% on food)", amt: foodCgst },
      { label: "SGST (2.5% on food)", amt: foodSgst },
      { label: "CGST (9% on charges)", amt: platCgst },
      { label: "SGST (9% on charges)", amt: platSgst },
    ];
    const subtotal = itemTotal + platTaxable;
    const tax = foodCgst + foodSgst + platCgst + platSgst;
    return {
      lines: [
        ...inv.items.map((i) => ({
          label: `${i.name} × ${i.qty}`,
          amt: i.qty * i.price,
        })),
        { label: "Delivery fee", amt: delivery },
        { label: "Platform fee", amt: platform },
        { label: "Packaging", amt: packaging },
      ],
      subtotal,
      taxes,
      tax,
      total: subtotal + tax,
    };
  }

  if (inv.type === "payout") {
    const commission = inv.grossSales * inv.commissionRate;
    const cgst = commission * PLATFORM_GST;
    const sgst = commission * PLATFORM_GST;
    const tax = cgst + sgst;
    return {
      lines: [
        { label: `Gross sales (${inv.orders} orders)`, amt: inv.grossSales },
        {
          label: `Commission (${inv.commissionRate * 100}%)`,
          amt: -commission,
        },
      ],
      subtotal: inv.grossSales - commission,
      taxes: [
        { label: "CGST (9% on commission)", amt: -cgst },
        { label: "SGST (9% on commission)", amt: -sgst },
      ],
      tax: -tax,
      total: inv.grossSales - commission - tax,
      payoutNote: "Net amount credited to your registered bank account.",
    };
  }

  // subscription
  const cgst = inv.amount * PLATFORM_GST;
  const sgst = inv.amount * PLATFORM_GST;
  const tax = cgst + sgst;
  return {
    lines: [{ label: `${inv.plan} (${inv.period})`, amt: inv.amount }],
    subtotal: inv.amount,
    taxes: [
      { label: "CGST (9%)", amt: cgst },
      { label: "SGST (9%)", amt: sgst },
    ],
    tax,
    total: inv.amount + tax,
  };
}
