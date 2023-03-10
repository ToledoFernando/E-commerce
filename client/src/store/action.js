import axios from "axios";
import md5 from "md5";
import swal from "sweetalert";

export const INITIALMP = "INITIALMP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const TOKENVALIDATE = "TOKENVALIDATE";
export const UPLOADPRODUCT = "UPLOADPRODUCT";
export const GETPRODUCTSLIST = "GETPRODUCTSLIST";
export const UPDATEPRODUCT = "UPDATEPRODUCT";
export const UPDATEACOUNT = "UPDATEACOUNT";
export const GETPRODUCTDETAIL = "GETPRODUCTDETAIL";
export const GETUSERS = "GETUSERS";
export const GETUSERCOPY = "GETUSERCOPY";
export const SEARCHUSER = "SEARCHUSER";
export const SEARCHPRODUCT = "SEARCHPRODUCT";
export const GETPRODUCTCOPY = "GETPRODUCTCOPY";
export const DELETEUSER = "DELETEUSER";
export const VERIFYACOUNT = "VERIFYACOUNT";
export const PEDIRVERIFICACION = "PEDIRVERIFICACION";
export const GETMARCAS = "GETMARCAS";
export const GETCATEGORY = "GETCATEGORY";
export const NEWIMG = "NEWIMG";
export const DELETEIMG = "DELETEIMG";
export const NEWCATEGORY = "NEWCATEGORY";
export const DELETECATEGORY = "DELETECATEGORY";
export const NEWMARCA = "NEWMARCA";
export const DELETEMARCA = "DELETEMARCA";
export const FILTROCATEGORY = "FILTROCATEGORY";
export const SEARCHpRODUCTS = "SEARCHpRODUCTS";
export const AGREGARCARRITO = "AGREGARCARRITO";
export const BUY = "BUY";
export const GETDETAILPAY = "GETDETAILPAY";
export const SETDOMICILIO = "SETDOMICILIO";

const api = import.meta.env.VITE_API_URL;

export const setDomicilio = (data) => {
  return (dispatch) => {
    return dispatch({
      type: SETDOMICILIO,
      payload: data,
    });
  };
};

export const initialMP = (mp) => {
  return (dispatch) => {
    return dispatch({
      type: INITIALMP,
      payload: mp,
    });
  };
};

export const register = (datas) => {
  return async (dispatch) => {
    datas.password = md5(datas.password);
    const resultData = await axios.post(`${api}/user/createUser`, datas);
    const { UsuarioCreado } = resultData.data;
    const newUser = [
      UsuarioCreado.userData,
      { token: resultData.data.tokenUser },
    ];
    return dispatch({
      type: REGISTER,
      payload: newUser,
    });
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(`${api}/user/`, data);
      return dispatch({
        type: LOGIN,
        payload: result.data,
      });
    } catch (error) {
      swal("Error", error.response.data.Error, "warning").then(() =>
        window.scrollTo(0, 0)
      );
    }
  };
};

export const logout = (data) => {
  return async (dispatch) => {
    return dispatch({
      type: LOGOUT,
    });
  };
};

export const validarToken = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${api}/user/validateToken`, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!data.status) throw Error("Cuenta suspendida");
    return dispatch({
      type: TOKENVALIDATE,
      payload: data,
    });
  };
};

export const updateAcout = (form, token) => {
  return async (dispatch) => {
    await axios.put(`${api}/user/updateUser`, form, {
      headers: { authorization: `Bearer ${token}` },
    });

    return dispatch({
      type: UPDATEACOUNT,
    });
  };
};

export const getAllUsers = (token) => {
  return async (dispatch) => {
    const result = await axios.get(`${api}/user/allUsers`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: GETUSERS,
      payload: result.data,
    });
  };
};

export const getUserCopy = () => {
  return (dispatch) => {
    return dispatch({
      type: GETUSERCOPY,
    });
  };
};

export const searchUser = (value) => {
  return (dispatch) => {
    return dispatch({
      type: SEARCHUSER,
      payload: value,
    });
  };
};

export const deleteUser = (id, token) => {
  return async (dispatch) => {
    await axios.delete(`${api}/user/deleteUser/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: DELETEUSER,
    });
  };
};

export const verifiAcoutnBT = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${api}/user/acountVerify`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: VERIFYACOUNT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const pedirVerificacion = (token) => {
  return async (dispatch) => {
    try {
      await axios.post(`${api}/user/validateAcount`, "data", {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: PEDIRVERIFICACION,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//=======================================================//

export const newIMG = (data) => {
  return (dispatch) => {
    return dispatch({
      type: NEWIMG,
      payload: data,
    });
  };
};

export const deleteIMG = () => {
  return (dispatch) => {
    return dispatch({
      type: DELETEIMG,
    });
  };
};

export const uploadProduct = (newProduct, token) => {
  return async (dispatch) => {
    await axios.post(`${api}/products/newProduct`, newProduct, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: UPLOADPRODUCT,
    });
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`${api}/products/`);
      return dispatch({
        type: GETPRODUCTSLIST,
        payload: result.data,
      });
    } catch (error) {
      console.log("Error");
      console.log(error.response.data);
    }
  };
};

export const searchProduct = (buscar, productos) => {
  return (dispatch) => {
    const filtro = productos.filter((producto) =>
      producto.name.includes(buscar.toLowerCase())
    );
    if (!filtro.length) throw Error("No se encontro ningun producto");
    return dispatch({
      type: SEARCHPRODUCT,
      payload: filtro,
    });
  };
};

export const getProductsCopy = () => {
  return (dispatch) => {
    return dispatch({
      type: GETPRODUCTCOPY,
    });
  };
};

export const updateProduct = (data, token) => {
  return async (dispatch) => {
    await axios.put(`${api}/products/updateProduct`, data, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: UPDATEPRODUCT,
    });
  };
};

export const getProductDetail = (id) => {
  return async (dispatch) => {
    return dispatch({
      type: GETPRODUCTDETAIL,
      payload: id,
    });
  };
};

export const getMarcas = () => {
  return async (dispatch) => {
    const result = await axios.get(`${api}/info/marcas`);
    return dispatch({
      type: GETMARCAS,
      payload: result.data,
    });
  };
};

export const postMarca = (data, token) => {
  return async (dispatch) => {
    const body = { name: data.marca };
    await axios.post(`${api}/info/newMarca`, body, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: NEWMARCA,
    });
  };
};

export const deleteMarca = (data, token) => {
  return async (dispatch) => {
    await axios.delete(`${api}/info/deleteMarca/${data}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: DELETEMARCA,
    });
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    const result = await axios.get(`${api}/info/category`);
    return dispatch({
      type: GETCATEGORY,
      payload: result.data,
    });
  };
};

export const postCategory = (data, token) => {
  return async (dispatch) => {
    const body = { name: data.category };
    console.log(body);
    await axios.post(`${api}/info/newCategory`, body, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: NEWCATEGORY,
    });
  };
};

export const deleteCategory = (data, token) => {
  return async (dispatch) => {
    await axios.delete(`${api}/info/deleteCategory/${data}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: DELETECATEGORY,
    });
  };
};

export const filtroCategory = (data) => {
  return (dispatch) => {
    return dispatch({
      type: FILTROCATEGORY,
      payload: data,
    });
  };
};

export const SearchProducts = (data) => {
  return (dispatch) => {
    return dispatch({
      type: SEARCHPRODUCT,
      payload: data,
    });
  };
};

export const agregarAcarrito = (product) => {
  return (dispatch) => {
    return dispatch({
      type: AGREGARCARRITO,
      payload: product,
    });
  };
};

export const getDetailApi = (id) => {
  return async (dispatch) => {
    const result = await axios.get(`${api}/products/detail/${id}`);
    return dispatch({
      type: GETDETAILPAY,
      payload: result.data,
    });
  };
};
