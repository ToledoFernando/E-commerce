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
  NEWIMG,
  DELETEIMG,
  SEARCHPRODUCT,
  GETPRODUCTCOPY,
  FILTROCATEGORY,
} from "./action";

const initialState = {
  myAcount: {},
  isLogin: false,
  products: [],
  productsCopy: [],
  productDetail: {},
  users: [],
  usersCopy: [],
  marcas: [],
  categorys: [],
  img: {},
  filtro: "",
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
    case SEARCHPRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case GETPRODUCTCOPY: {
      return {
        ...state,
        products: state.productsCopy,
        filtro: "",
      };
    }
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
        productsCopy: action.payload,
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
    case NEWIMG:
      return {
        ...state,
        img: action.payload,
      };
    case DELETEIMG:
      return {
        ...state,
        img: {},
      };
    case FILTROCATEGORY:
      const copy = state.productsCopy;

      const result = copy.filter((producto) => {
        const xd = producto.categories.filter(
          (c) => c.name.toLowerCase() == action.payload.toLowerCase()
        );
        if (xd.length) return true;
      });

      if (!result.length) throw Error("");

      return {
        ...state,
        products: result,
        filtro: action.payload,
      };
    default:
      return state;
  }
}
