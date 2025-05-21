import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const AdminRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    toast.error("Please sign in to access this page");
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;