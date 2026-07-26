import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from "./pages/Login.jsx";
import Register from "./pages/UserForm.jsx";
import Menu from "./pages/menu.jsx";
import Methods from "./pages/methods.jsx";
import Add_Method from "./pages/add_method.jsx";
import Edit_Method from "./pages/edit_method.jsx";
import EditProfile from "./pages/EditProfile.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="App">

          <BrowserRouter>

            <Routes>

                <Route path="/login" element={<Login /> } />

                <Route path="/register" element={<Register />} />

                <Route path="/menu" element={<ProtectedRoute> <Menu /> </ProtectedRoute>} />

                <Route path="/methods" element={<ProtectedRoute> <Methods /> </ProtectedRoute>} />

                <Route path="/add_method" element={<ProtectedRoute> <Add_Method /> </ProtectedRoute>} />

                <Route path="/edit_method/:id" element={<ProtectedRoute> <Edit_Method /> </ProtectedRoute>} />

                <Route path="/edit_profile/:id" element={<ProtectedRoute> <EditProfile /> </ProtectedRoute>} />
            </Routes>

        </BrowserRouter>
      </div>
  );
}

export default App
