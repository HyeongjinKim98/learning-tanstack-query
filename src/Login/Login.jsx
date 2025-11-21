import { useState } from "react";
import supabase from "../../SupabaseClient";
import { useAuthStore } from "../stores/authStore";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore(state => state.login)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await login(email, password);
    }catch(err){
      console.log(err)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">sign in</button>
      </form>
    </>
  );
};
