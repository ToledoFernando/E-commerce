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
  SEARCHUSER
} from './action'

const initialState = {
  myAcount: {},
  isLogin: false,
  products: [],
  productDetail: {},
  users: []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      localStorage.setItem('tokenUser', action.payload[1].token)
      localStorage.setItem('rol', action.payload[0].rol)
      return {
        ...state,
        myAcount: action.payload[0],
        isLogin: true
      };
    case LOGOUT:
      return {
        ...state,
        myAcount: {},
        isLogin: false
      }
    case LOGIN:
      localStorage.clear();
      localStorage.setItem('tokenUser', action.payload.tokenUser)
      localStorage.setItem('rol', action.payload.usuario.rol)
      return {
        ...state,
        myAcount: action.payload.usuario,
        isLogin: true
      }
    case UPDATEACOUNT:
      return {
        ...state
      }
    case TOKENVALIDATE:
      localStorage.setItem('rol', action.payload.rol)
      return {
        ...state,
        myAcount: action.payload,
        isLogin: true
      }
    case SEARCHUSER:

      const userFiltro = state.users.filter((us => us.username.includes(action.payload)))
      return {
        ...state,
        users: userFiltro
      }
    case UPLOADPRODUCT:
      return {
        ...state
      }
    case GETPRODUCTSLIST:
      return {
        ...state,
        products: action.payload
      }
    case UPDATEPRODUCT:
      return {
        ...state
      }
    case GETPRODUCTDETAIL:
      const producto = state.products.filter((product) => product._id == action.payload)
      return {
        ...state,
        productDetail: producto[0]
      }
    case GETUSERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
}