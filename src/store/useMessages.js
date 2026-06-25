import { useSyncExternalStore } from "react";

let state = [];
const listeners = new Set();

const emit = () => listeners.forEach((l) => l());
const subscribe = (l) => (listeners.add(l), () => listeners.delete(l));
const getSnapshot = () => state;

export function addMessage(msg) {
  state = [
    { id: Date.now(), createdAt: new Date().toISOString(), ...msg },
    ...state,
  ];
  emit();
}

export function useMessages() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
