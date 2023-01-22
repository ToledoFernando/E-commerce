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
import Cart from "./pages/cart/Cart";
import History from "./pages/history/Histori";
import AddresOne from "./pages/Oneproduct/addresOne";
import Payments from "./pages/payments/Payments";
import PayOne from "./pages/Oneproduct/PayOne";

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
          path="/myAcount/:id/edith"
          element={
            <>
              <EdithAcoutn />
              <Footer />
            </>
          }
        />
        <Route
          path="/myAcount/cartShopping"
          element={
            <>
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/myAcount/historiShop"
          element={
            <>
              <History />
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
        <Route path="/paymentOne/:tokenuser/:id/add" element={<AddresOne />} />
        <Route path="/paymentOne/:tokenuser/:id/add/pay" element={<PayOne />} />
        <Route path="/payment/:tokenuser/ar" element={<Payments />} />
      </Routes>
    </>
  );
}

export default App;
