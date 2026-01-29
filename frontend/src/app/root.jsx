// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import NotFound from "../pages/NotFound";
// import Login from "./pages/Login";
// import Registration from "./pages/Registration";
// import { UserProvider } from "./context/UserContext";
// import { Navigate } from "react-router-dom";
// import Projects from "./pages/Projects";

// function Logout() {
//   localStorage.clear();
//   return <Navigate to="/home" />
// };
import '@/shared/ui/index.css';

export function Root() {
  return (
    <>Hello World!</>
    // <UserProvider>
    //   <BrowserRouter>
    //     <Routes>
    //       {/* Auth */}
    //       <Route path="/login/" element={<Login />} />
    //       <Route path="/logout/" element={<Logout />} />
    //       <Route path="/registration/" element={<Registration />} />

    //       <Route path="/home" element={<Home />} />
    //       <Route path="/projects" element={<Projects />} />

    //       <Route path="*" element={< NotFound />} />
    //     </Routes>
    //   </BrowserRouter>
    // </UserProvider>
  );
};
