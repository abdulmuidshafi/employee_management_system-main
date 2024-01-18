import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  let isLogin = localStorage.getItem("token")
  const location = useLocation();
  /*  useEffect(() => {
    if (!isLogin) {
      return navigate("/login", { replace: true });
    }
  }, [isLogin, navigate]);
  return children;
 */
  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
