import axios from 'axios';
import md5 from 'md5';

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
export const SEARCHUSER = "SEARCHUSER";
export const DELETEUSER = "DELETEUSER";
export const VERIFYACOUNT = "VERIFYACOUNT";
export const PEDIRVERIFICACION = "PEDIRVERIFICACION";

const api = import.meta.env.VITE_API_URL;

export const register = (datas) => {
  return async (dispatch) => {
    datas.password = md5(datas.password);
    const resultData = await axios.post(`${api}/user/createUser`, datas)
    const { UsuarioCreado } = resultData.data;
    const newUser = [{
      _id: UsuarioCreado.userData._id,
      name: UsuarioCreado.userData.first_name,
      lastName: UsuarioCreado.userData.last_name,
      email: UsuarioCreado.userData.email,
      rol: UsuarioCreado.userData.rol,
      verify: UsuarioCreado.userData.verify
    }, {
      token: resultData.data.tokenUser
    }]
    return dispatch({
      type: REGISTER,
      payload: newUser
    })
  }
}

export const login = (data) => {
  return async (dispatch) => {
    const result = await axios.post(`${api}/user/`, data)
    if (!result.data.usuario.status) throw Error('Cuenta suspendida')
    return dispatch({
      type: LOGIN,
      payload: result.data
    })
  }
}

export const logout = (data) => {
  return async (dispatch) => {
    return dispatch({
      type: LOGOUT
    })
  }
}

export const validarToken = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${api}/user/validateToken`, {
      headers: { authorization: `Bearer ${token}` },
    })
    return dispatch({
      type: TOKENVALIDATE,
      payload: data
    })
  }
}

export const updateAcout = (form, token) => {
  return async (dispatch) => {
    await axios.put(`${api}/user/updateUser`, form, {
      headers: { authorization: `Bearer ${token}` }
    });

    return dispatch({
      type: UPDATEACOUNT
    });
  }
}

export const getAllUsers = (token) => {
  return async (dispatch) => {
    const result = await axios.get(`${api}/user/allUsers`, {
      headers: { authorization: `Bearer ${token}` }
    });
    return dispatch({
      type: GETUSERS,
      payload: result.data
    })
  }
}

export const searchUser = (value) => {
  return (dispatch) => {
    return dispatch({
      type: SEARCHUSER,
      payload: value
    })
  }
}

export const deleteUser = (id, token) => {
  return async (dispatch) => {
    await axios.delete(`${api}/user/deleteUser/${id}`, {
      headers: { authorization: `Bearer ${token}` }
    })
    return dispatch({
      type: DELETEUSER
    })
  }
}

export const verifiAcoutnBT = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${api}/user/acountVerify`, {
        headers: { authorization: `Bearer ${token}` }
      });
      return dispatch({
        type: VERIFYACOUNT,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const pedirVerificacion = (token) => {
  return async (dispatch) => {
    try {
      await axios.post(`${api}/user/validateAcount`, 'data', {
        headers: { authorization: `Bearer ${token}` }
      })
      return dispatch({
        type: PEDIRVERIFICACION
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//=======================================================//

export const uploadProduct = (newProduct, token, img) => {
  return async (dispatch) => {
    newProduct.productIMG = img.url;
    newProduct.imgid = img.id;
    const result = await axios.post(`${api}/products/newProduct`, newProduct, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(result);
    return dispatch({
      type: UPLOADPRODUCT
    })
  }
}

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`${api}/products/`)
      return dispatch({
        type: GETPRODUCTSLIST,
        payload: result.data
      })
    } catch (error) {
      console.log('Error')
      console.log(error)
    }
  }
}

export const updateProduct = (data, token) => {
  return async (dispatch) => {
    try {
      await axios.put(`${api}/products/updateProduct`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
      return dispatch({
        type: UPDATEPRODUCT,
      })
    } catch (error) {
      console.log('error')
      console.log(error)
    }
  }
}

export const getProductDetail = (id) => {
  return (dispatch) => {
    return dispatch({
      type: GETPRODUCTDETAIL,
      payload: id
    })
  }
}