import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoutes({
  isLoggedIn,
  anonymous = false,
  children,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isLoggedIn) return <Navigate to={from} replace />;
  if (!anonymous && !isLoggedIn)
    return <Navigate to="/" state={{ from: location }} replace />;
  return children;
}
