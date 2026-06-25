import { useSyncExternalStore } from "react";
import { plans as seed } from "../data/mock";

let state = seed.map((p) => ({ ...p }));
const listeners = new Set();

const emit = () => listeners.forEach((l) => l());
const subscribe = (l) => (listeners.add(l), () => listeners.delete(l));
const getSnapshot = () => state;

export function addPlan(plan) {
  state = [
    ...state,
    { used: 0, progress: 0, status: "inactive", note: "Inactive", ...plan },
  ];
  emit();
}

export function usePlans() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
