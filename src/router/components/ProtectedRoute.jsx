import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    else if (user){

    }
  
    return children;
  };

export default ProtectedRoute;