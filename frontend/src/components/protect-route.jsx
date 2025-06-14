import { Navigate } from "react-router-dom";
import { useUser } from "../context/user-context";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();
  if (isLoading)
    return (
      <div className=" flex justify-center text-center mt-10">
        <Loader2 className=" size-7 animate-spin" />
      </div>
    );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
