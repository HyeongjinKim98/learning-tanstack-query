import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import { ProtectedRoute } from "./Router/ProtectedRoute";
import { SignUp } from "./SignUp/SignUp";
import { Login } from "./Login/Login";
import { Todo } from "./Todo/Todo";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <Todo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const Root = () => {
  const user = useAuthStore((state) => state.user);
  if (user) {
    return <Navigate to="/todo" />;
  }
  return <Navigate to="/login" />;
};

export default App;
