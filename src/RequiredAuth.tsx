import { useSelector } from "react-redux";
import type { RootState } from "@/store/storeMain";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiredAuth = () => {
  const location = useLocation();

  const { isLoading, user_id } = useSelector((state: RootState) => state.userAuthentication);
    
  if (isLoading) {
   return <div>Loading...</div>;
  } else if (!user_id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequiredAuth;

