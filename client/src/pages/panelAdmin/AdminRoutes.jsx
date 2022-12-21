import { Route, Routes } from "react-router-dom";
import EdithProduct from "./edithProduct/EdithProduct";
import NavBarAdmin from "./NavbarAdmin/NavBarAdmin";
import Products from "./productsAdmin/products";
import ProductsList from "./productsList/ProductsList";

function AdminRoutes() {
  return (
    <>
      <NavBarAdmin />
      <Routes>
        <Route path="/" element={<h1>Panel Admin Home</h1>} />
        <Route path="/AddProducts" element={<Products />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/edit/:id" element={<EdithProduct />} />
        <Route path="/users" element={<h1>Panel Admin Usuarios</h1>} />
        <Route path="/other" element={<h1>Panel Admin other</h1>} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
