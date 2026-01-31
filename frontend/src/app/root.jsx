// import React from "react";
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
// import Login from "../pages/Login";
import { LoginPage } from "@/pages/login";


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

      <BrowserRouter>
        <Routes>
          <Route path="/login/" element={<LoginPage />} />


          <Route element={<Layout />}>
          <Route path="/home" element={<>Hello</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
