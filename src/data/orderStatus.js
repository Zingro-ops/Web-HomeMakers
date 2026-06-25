// Order lifecycle: pending → preparing → ready → completed (or rejected)
export const FLOW = ["pending", "preparing", "ready", "completed"];

export const statusMeta = {
  pending: { label: "Pending", chip: "pending", tab: "New" },
  preparing: { label: "Preparing", chip: "active", tab: "Active" },
  ready: { label: "Ready", chip: "success", tab: "Active" },
  completed: { label: "Completed", chip: "neutral", tab: "History" },
  rejected: { label: "Rejected", chip: "neutral", tab: "History" },
};

// Primary CTA shown per status on the detail screen
export const primaryAction = {
  pending: { label: "Accept Order", next: "preparing", icon: "check_circle" },
  preparing: { label: "Mark as Ready", next: "ready", icon: "outdoor_grill" },
  ready: { label: "Mark Picked Up", next: "completed", icon: "local_shipping" },
};

export const nextStatus = (s) => primaryAction[s]?.next ?? s;
