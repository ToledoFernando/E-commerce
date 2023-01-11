import {
  LOGIN,
  LOGOUT,
  REGISTER,
  TOKENVALIDATE,
  UPLOADPRODUCT,
  GETPRODUCTSLIST,
  UPDATEPRODUCT,
  GETPRODUCTDETAIL,
  UPDATEACOUNT,
  GETUSERS,
  SEARCHUSER,
  DELETEUSER,
  VERIFYACOUNT,
  PEDIRVERIFICACION,
  GETMARCAS,
  GETCATEGORY,
  GETUSERCOPY,
} from "./action";

const initialState = {
  myAcount: {},
  isLogin: false,
  products: [],
  productDetail: {},
  users: [],
  usersCopy: [],
  marcas: [],
  categorys: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      localStorage.setItem("tokenUser", action.payload[1].token);
      localStorage.setItem("rol", action.payload[0].rol.name);
      return {
        ...state,
        myAcount: action.payload[0],
        isLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        myAcount: {},
        isLogin: false,
      };
    case LOGIN:
      localStorage.removeItem("tokenUser");
      localStorage.removeItem("rol");
      //================
      localStorage.setItem("tokenUser", action.payload.tokenUser);
      localStorage.setItem("rol", action.payload.usuario.rol.name);
      return {
        ...state,
        myAcount: action.payload.usuario,
        isLogin: true,
      };
    case UPDATEACOUNT:
      return {
        ...state,
      };
    case DELETEUSER:
      return {
        ...state,
      };
    case TOKENVALIDATE:
      localStorage.setItem("rol", action.payload.rol.name);
      return {
        ...state,
        myAcount: action.payload,
        isLogin: true,
      };
    case SEARCHUSER:
      let a = state.usersCopy;
      const userFiltro = a.filter((us) => us.username.includes(action.payload));
      return {
        ...state,
        users: userFiltro,
      };
    case GETUSERCOPY:
      return {
        ...state,
        users: state.usersCopy,
      };
    case PEDIRVERIFICACION:
      return {
        ...state,
      };
    case UPLOADPRODUCT:
      return {
        ...state,
      };
    case GETPRODUCTSLIST:
      return {
        ...state,
        products: action.payload,
      };
    case UPDATEPRODUCT:
      return {
        ...state,
      };
    case GETPRODUCTDETAIL:
      const producto = state.products.filter(
        (product) => product._id == action.payload
      );
      return {
        ...state,
        productDetail: producto[0],
      };
    case VERIFYACOUNT:
      return {
        ...state,
        myAcount: action.payload,
      };
    case GETUSERS:
      return {
        ...state,
        users: action.payload,
        usersCopy: action.payload,
      };
    case GETMARCAS:
      return {
        ...state,
        marcas: action.payload,
      };
    case GETCATEGORY:
      return {
        ...state,
        categorys: action.payload,
      };
    default:
      return state;
  }
}
