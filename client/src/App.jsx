import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./components/navbar/NavBar";
import Login from "./pages/login/Login";
import Registro from "./pages/register/Registro";
import AdminRoutes from "./pages/panelAdmin/AdminRoutes";
import Products from "./pages/products/products";
import ProductDetail from "./pages/productDetail/ProductDetail";
import MyAcount from "./pages/miCuenta/MyAcount";
import EdithAcoutn from "./pages/EdithAcoutn/EdithAcoutn";
import VerifyAcount from "./pages/verifyAcoutn/VerifyAcount";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/detailP/:id" element={<ProductDetail />} />
        <Route path="/myAcount" element={<MyAcount />} />
        <Route path="/myAcount/:id" element={<EdithAcoutn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/dashboardAdmin/*" element={<AdminRoutes />} />
        <Route
          path="/myAcoutn/Verify/:token/:email/ok"
          element={<VerifyAcount />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
