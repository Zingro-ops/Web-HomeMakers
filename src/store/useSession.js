import { useSyncExternalStore } from "react";

const saved = (() => {
  try {
    return JSON.parse(sessionStorage.getItem("zingro-session"));
  } catch {
    return null;
  }
})();

let state = saved || {
  authed: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  verification: "none",
};
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

export const login = ({ user, accessToken, refreshToken }) =>
  set({ authed: true, user, accessToken, refreshToken });

export const logout = () =>
  set({
    authed: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    verification: "none",
  });

export const setVerification = (verification) => set({ verification });

export const getAccessToken = () => state.accessToken;

export function useSession() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
