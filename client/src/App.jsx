import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./components/navbar/NavBar";
import Login from "./pages/login/Login";
import Registro from "./pages/register/Registro";
import AdminRoutes from "./pages/panelAdmin/AdminRoutes";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/dashboardAdmin/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
}

export default App;
