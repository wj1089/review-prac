import { REGISTER_USER, LOGIN_USER,LOGOUT } from "../actions/type";
//SWITCH대신해서 HandleAction사용하기??
//https://velopert.com/3358

export default function userReducer(state = {}, action, token){

    switch (action.type) {

    case REGISTER_USER:
        return { ...state, success: action.payload};

    case LOGIN_USER:
        return {...state, accountEntity: action.payload, token}

    case LOGOUT:
        console.log("LOGOUT")
        console.log(action)
        return {...state, success: action.payload }

    default:
      return state;
  }
}