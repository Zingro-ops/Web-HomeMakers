import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "../store/useSession";

export default function ProtectedRoute() {
  const { authed } = useSession();
  const location = useLocation();
  return authed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
}
