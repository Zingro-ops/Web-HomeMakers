import { useSyncExternalStore } from "react";
import api from "../services/api";

let state = { dishes: [], loading: true, error: "" };
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l) => (listeners.add(l), () => listeners.delete(l));
const getSnapshot = () => state;

function setState(patch) {
  state = { ...state, ...patch };
  emit();
}

export async function fetchDishes() {
  setState({ loading: true, error: "" });
  try {
    const { data } = await api.get("/api/menu");
    setState({ dishes: data, loading: false });
  } catch (e) {
    setState({
      loading: false,
      error: e.response?.data?.error || "Failed to load menu.",
    });
  }
}

export async function addDish(payload) {
  const { data } = await api.post("/api/menu", payload);
  setState({ dishes: [data, ...state.dishes] });
  return data;
}

export async function toggleDish(id) {
  const dish = state.dishes.find((d) => d._id === id);
  if (!dish) return;
  const { data } = await api.patch(`/api/menu/${id}`, {
    available: !dish.available,
  });
  setState({ dishes: state.dishes.map((d) => (d._id === id ? data : d)) });
}

export async function deleteDish(id) {
  await api.delete(`/api/menu/${id}`);
  setState({ dishes: state.dishes.filter((d) => d._id !== id) });
}

export function useDishes() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
