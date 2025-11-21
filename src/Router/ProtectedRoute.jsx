import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const ProtectedRoute = ({children})=>{
      const user = useAuthStore(state => state.user);
      return user ? children : <Navigate to='/login'/>
}