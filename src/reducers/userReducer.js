import { REGISTER_USER, LOGIN_USER,LOGOUT } from "../actions/type";
//SWITCH대신해서 HandleAction사용하기??
//https://velopert.com/3358

export default function userReducer(state = {}, action, token){

    switch (action.type) {
    case REGISTER_USER:
        return { ...state, success: action.payload, token};
    case LOGIN_USER:
        // console.log(LOGIN_USER action)
        // console.log(action)
        return {...state, accountEntity: action.payload, token }

    case LOGOUT:
        console.log("LOGOUT_USER")
        console.log(action)
        return {...state, success: action.payload, token }
    default:
      return state;
  }
}


// import { 
//     REGISTER_SUCCESS,
//     REGISTER_FAIL,
//     LOGIN_SUCCESS, 
//     LOGIN_FAIL,
//     LOGOUT
// } from "../actions/type";

// //SWITCH대신해서 HandleAction사용하기??
// //https://velopert.com/3358


// const user = JSON.parse(localStorage.getItem("user"));

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

// export default function userReducer(state = initialState, action, token){

//     const {type, payload} = action

//     switch (type) {
//     // case REGISTER_USER:
//     case REGISTER_SUCCESS:
//         return { 
//             ...state, 
//             // success: action.payload, 
//             // token
//             isLoggedIn: false,
//         };

//     case REGISTER_FAIL:
//     return { 
//         ...state, 
//         // success: action.payload, 
//         // token
//         isLoggedIn: false,
//     };

//     // case LOGIN_USER:
//     case LOGIN_SUCCESS:
//         return {
//             ...state, 
//             // accountEntity: action.payload, 
//             // token 
//             isLoggedIn: true,
//             user: payload.user,
//         };

//     case LOGIN_FAIL:
//     return {
//         ...state, 
//         // accountEntity: action.payload, 
//         // token 
//         isLoggedIn: false,
//         user: null,
//     };

//     case LOGOUT:
//       return {
//         ...state,
//         isLoggedIn: false,
//         user: null,
//       };

//     default:
//       return state;
//   }

// }