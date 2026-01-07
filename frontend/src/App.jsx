import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { UserProvider } from "./context/UserContext";
import { Navigate } from "react-router-dom";

function Logout() {
  localStorage.clear();
  return <Navigate to="/home" />
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login/" element={<Login />} />
          <Route path="/logout/" element={<Logout />} />
          <Route path="/registration/" element={<Registration />} />

          <Route path="/home" element={<Home />} />

          <Route path="*" element={< NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
