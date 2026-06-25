import { useSyncExternalStore } from "react";

const saved = (() => {
  try {
    return JSON.parse(sessionStorage.getItem("zingro-session"));
  } catch {
    return null;
  }
})();
// verification: "none" | "submitted" | "review" | "approved" | "rejected"
let state = saved || { authed: false, verification: "none" };
const listeners = new Set();

const emit = () => {
  sessionStorage.setItem("zingro-session", JSON.stringify(state));
  listeners.forEach((l) => l());
};

const subscribe = (l) => (listeners.add(l), () => listeners.delete(l));
const getSnapshot = () => state;

const set = (patch) => {
  state = { ...state, ...patch };
  emit();
};

export const login = () => set({ authed: true });
export const logout = () => set({ authed: false, verification: "none" });
export const setVerification = (verification) => set({ verification });

export function useSession() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
