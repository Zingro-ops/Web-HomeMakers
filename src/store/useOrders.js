import { useSyncExternalStore } from "react";
import { orders as seed } from "../data/mock";

let state = seed.map((o) => ({ ...o }));
const listeners = new Set();

const emit = () => listeners.forEach((l) => l());
const subscribe = (l) => (listeners.add(l), () => listeners.delete(l));
const getSnapshot = () => state;

export function setOrderStatus(id, status) {
  state = state.map((o) => (o.id === id ? { ...o, status } : o));
  emit();
}

export function useOrders() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

export function useOrder(id) {
  return useOrders().find((o) => o.id === id);
}
