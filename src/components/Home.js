import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userAction'
import Login from './Login';

const Home = (props) => {
    // const adminUser = {
    //     email:"wj1089@naver.com",
    //     password:"dnwns123"
    // }
    // const [user, setUser] = useState({email: "", password : ""}) 
    // const [error, setError] = useState("")

    // const login = detail =>{
    //     console.log(detail)
    // }

    // const logout = () =>{
    //     console.log("logout");
    // }

    //첫번째 파라미터 = "state=> state.out" = map state같은 
    //두번재 파라미터 = "[]"  = useMemo와 같은 
    const findState = useSelector(state=> state);
    const dispatch = useDispatch();

    console.log("findState")
    console.log(findState)

    const onClickHandler = () =>{
        dispatch(logoutUser())
        .then((response)=>{
            if(response.payload.success !== false){
                props.history.push("/login")
            }
        })
        .catch((error)=>{
            alert(error.response.data.error.message)
        })
    }
    return (
        <>
            <div className="full-screen">
                {/* {(user.email !== "") ? (
                    <div>
                    <h1>Welcome <span>{user.name}</span></h1>
                    <button type="button" onClick={onClickHandler}>Logout</button>
                    </div>
                ) :(
                    <Login>
                        <h1>Welcome to Home!</h1>
                        <a href="/login"><button>로그인</button></a>
                    </Login>
                )} */}
                <h1>Welcome to website</h1>
                <a href="/login"><button>로그인</button></a>
            </div>
        </>
    );
};

export default withRouter(Home);