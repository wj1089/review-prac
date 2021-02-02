import React from 'react';
import { withRouter } from "react-router-dom";

const Logout = (props) => {

    const onClickHandler = () =>{

    }

    return (
        <div>
            <h1>Welcome to <span>Park</span></h1>
            <button type="button" onClick={onClickHandler}>Logout</button>
        </div>
    );
};

export default withRouter(Logout);