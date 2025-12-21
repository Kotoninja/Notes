import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Registration from "./pages/Registration"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login/" element={<Login />} />
        <Route path="/registration/" element={<Registration />} />

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="*" element={< NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
