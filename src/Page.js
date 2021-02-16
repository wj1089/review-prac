import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import Login from './components/Login';
import Logout from './components/Logout';
import ForgotId from './components/ForgotId';
import ForgotPw from './components/ForgotPw';
import MyPage from './components/MyPage';
import UserInfo from './components/UserInfo';
import ServiceCenter from './components/ServiceCenter';

const Page = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signin" component={Signin} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/forgotid" component={ForgotId} />
                <Route path="/forgotpw" component={ForgotPw} />
                <Route path="/myPage" component={MyPage} />
                <Route path="/userInfo" component={UserInfo} />
                <Route path="/serviceCenter" component={ServiceCenter} />
            </Switch>
        </>
    );
};

export default Page;