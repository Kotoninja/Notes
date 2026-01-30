// import React from "react";
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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@/shared/ui/index.css';
import { UserProvider } from "@/features/auth/ui/";
import { UserContext } from "@/features/auth/model/";
import { Layout } from "@/widgets/Layout";

export function Root() {
  return (
    <UserProvider>
      {/* <BrowserRouter>
         <Routes>
           <Route path="/login/" element={<Login />} />
           <Route path="/logout/" element={<Logout />} />
           <Route path="/registration/" element={<Registration />} />

           <Route path="/home" element={<Home />} />
           <Route path="/projects" element={<Projects />} />

           <Route path="*" element={< NotFound />} />
         </Routes>
       </BrowserRouter> */}

      {/* <BrowserRouter>
        <Routes>
          <Route element={Layout}>

          </Route>
        </Routes>
      </BrowserRouter> */}
      <Layout></Layout>
    </UserProvider>
  );
};
