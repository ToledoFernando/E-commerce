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
import Payment from "./pages/payments/Payments";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Products />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/detailP/:id"
          element={
            <>
              <ProductDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/myAcount"
          element={
            <>
              <MyAcount />
              <Footer />
            </>
          }
        />
        <Route
          path="/myAcount/:id"
          element={
            <>
              <EdithAcoutn />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Registro />
              <Footer />
            </>
          }
        />
        <Route path="/dashboardAdmin/*" element={<AdminRoutes />} />
        <Route
          path="/myAcoutn/Verify/:token/:email/ok"
          element={<VerifyAcount />}
        />
        <Route path="/payment/:tokenuser/ar" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
