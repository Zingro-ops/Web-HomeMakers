import { useSyncExternalStore } from "react";
import { dishes as seed } from "../data/mock";

let state = seed.map((d) => ({ ...d }));
const listeners = new Set();

const emit = () => listeners.forEach((l) => l());
const subscribe = (l) => (listeners.add(l), () => listeners.delete(l));
const getSnapshot = () => state;

export function addDish(dish) {
  state = [{ tag: null, available: true, ...dish }, ...state];
  emit();
}

export function toggleDish(name) {
  state = state.map((d) =>
    d.name === name ? { ...d, available: !d.available } : d,
  );
  emit();
}

export function useDishes() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
