import React from 'react';
import { withRouter } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../actions/userAction'

const Logout = (props) => {
    //첫번째 파라미터 = "state=> state.out" = map state같은 
    //두번재 파라미터 = "[]"  = useMemo와 같은 
    // const findState = useSelector(state=> state);
    // const dispatch = useDispatch();

    const onClickHandler = () =>{
        // dispatch(logoutUser())
        localStorage.removeItem("user");
        props.history.push("/login")

        console.log("localStorage-logout")
        console.log(localStorage)
        // .then((response)=>{
        //     if(response.payload.success !== false){
        //     }
        // })
        // .catch((error)=>{
        //     alert(error.response.data.error.message)
        // })
    }

    return (
        <>
            <div>
                <button type="button" onClick={onClickHandler}>Logout</button>
            </div>
        </>
    );
};

export default withRouter(Logout);