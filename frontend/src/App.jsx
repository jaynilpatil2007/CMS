

import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Hero from "./pages/Hero"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/admin-login" element={<Login />} />
      <Route path="/admin-signup" element={<Signup />} />
    </Routes>
  )
}

export default App
