import { Route, Routes } from "react-router-dom";
import EdithProduct from "./edithProduct/EdithProduct";
import ListProductAdmin from "./ListProductAdmin/ListProductAdmin";
import ListUsers from "./ListUsers/ListUsers";
import SuperAdminUsers from "./ListUsers/SuperAdminUsers";
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
        <Route path="/modProducts" element={<ListProductAdmin />} />
        <Route path="/products/edit/:id" element={<EdithProduct />} />
        <Route path="/userClients" element={<ListUsers />} />
        <Route path="/users" element={<SuperAdminUsers />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
