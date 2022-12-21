import { LOGIN, LOGOUT, REGISTER, TOKENVALIDATE, UPLOADPRODUCT, GETPRODUCTSLIST, UPDATEPRODUCT } from './action'

const initialState = {
  myAcount: {},
  isLogin: false,
  products: [],
  productDetail: {}
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
    case TOKENVALIDATE:
      localStorage.setItem('rol', action.payload.rol)
      return {
        ...state,
        myAcount: action.payload,
        isLogin: true
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
    default:
      return state;
  }
}