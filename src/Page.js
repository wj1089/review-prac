import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/main/Home';
import Signin from './components/log/Signin';
import Login from './components/log/Login';
import Logout from './components/log/Logout';
import ForgotId from './components/log/ForgotId';
import ForgotPw from './components/log/ForgotPw';
import MyPage from './components/user/MyPage';
import UserInfo from './components/user/UserInfo';
import ServiceCenter from './components/user/ServiceCenter';

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