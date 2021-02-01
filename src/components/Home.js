import React from 'react';
import Signin from './Signin';
import Login from './Login';


const Home = () => {
    return (
        <>
            <div className="full-screen">
                <h1>Welcome to Home!</h1>
                <a href="/login"><button>로그인</button></a>
            </div>
        </>
    );
};

export default Home;