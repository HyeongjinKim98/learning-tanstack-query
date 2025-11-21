import styled from "styled-components";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export const TodoProfile = () => {
  const session = useAuthStore((state) => state.session);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout =async()=>{
      try{
            await logout();
            navigate('/')
      }catch(err){
            console.log(err);
      }
  }
  return (
    <>
      {session && (
        <>
          <div>{session.user.email}</div>
          <LogOut onClick={handleLogout}/>
        </>
      )}
    </>
  );
};
