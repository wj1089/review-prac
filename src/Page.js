import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Signin from './components/Signin';
import ForgotId from './components/ForgotId';
import ForgotPw from './components/ForgotPw';
// import Auth from './hoc/Auth';

const Page = () => {
    return (
        <>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signin" component={Signin} />
            <Route path="/forgotid" component={ForgotId} />
            <Route path="/forgotpw" component={ForgotPw} />
            <Route path="/Logout" component={Logout} />
        </Switch>
        </>
    );
};

export default Page;