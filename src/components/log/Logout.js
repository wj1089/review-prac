import React from 'react';
import { withRouter } from "react-router-dom";

const Logout = (props) => {
    //첫번째 파라미터 = "state=> state.out" = map state같은 
    //두번재 파라미터 = "[]"  = useMemo와 같은 
    // const findState = useSelector(state=> state);
    // const dispatch = useDispatch();

    const onClickHandler = () =>{
        localStorage.removeItem("user");
        props.history.push("/")
        console.log("localStorage-logout")
        console.log(localStorage)
    }
    return (
        <>
            <div>
                <button 
                    type="button" 
                    style={{
                        borderRadius: 24, 
                        width:"100%",
                        border:"none",
                        backgroundColor:"#ffffff",
                        padding:"8px 0 8px 0",
                        fontSize: 16,
                        color: '#000000',
                        // margin:"0 10px 0 10px",
                    }} 
                    onClick={onClickHandler}
                >
                    로그아웃
                </button>
            </div>
        </>
    );
};

export default withRouter(Logout);