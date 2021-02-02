import { REGISTER_USER, LOGIN_USER } from "../actions/type";
//SWITCH대신해서 HandleAction사용하기??
//https://velopert.com/3358

export default function userReducer(state = {}, action){

    switch (action.type) {
    case REGISTER_USER:
        return { ...state, success: action.payload };
    case LOGIN_USER:
        return {...state, accountentity: action.payload }
    default:
      return state;
  }
}