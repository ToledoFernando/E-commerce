import { Route, Routes } from "react-router-dom";
import EdithProduct from "./edithProduct/EdithProduct";
import HomeADM from "./HomeAdmin/HomeADM";
import ListProductAdmin from "./ListProductAdmin/ListProductAdmin";
import ListUsers from "./ListUsers/ListUsers";
import SuperAdminUsers from "./ListUsers/SuperAdminUsers";
import NavBarAdmin from "./NavbarAdmin/NavBarAdmin";
import Products from "./productsAdmin/products";
import ProductsList from "./productsList/ProductsList";
import "./AdminRoutes.scss";

function AdminRoutes() {
  return (
    <div className="admPanel">
      <NavBarAdmin />
      <Routes>
        <Route path="/" element={<HomeADM />} />
        <Route path="/AddProducts" element={<Products />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/modProducts" element={<ListProductAdmin />} />
        <Route path="/products/edit/:id" element={<EdithProduct />} />
        <Route path="/userClients" element={<ListUsers />} />
        <Route path="/users" element={<SuperAdminUsers />} />
      </Routes>
    </div>
  );
}

export default AdminRoutes;
