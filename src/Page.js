import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signin';
import ForgotId from './components/ForgotId';
import ForgotPw from './components/ForgotPw';


const Page = () => {
    return (
        <>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signin" component={Signin} />
            <Route path="/forgotid" component={ForgotId} />
            <Route path="/forgotpw" component={ForgotPw} />
        </Switch>
        </>
    );
};

export default Page;