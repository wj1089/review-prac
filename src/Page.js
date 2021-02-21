import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/main/Home';
import Signin from './components/log/Signin';
import Login from './components/log/Login';
import Logout from './components/log/Logout';
import ForgotId from './components/log/ForgotId';
import ForgotPw from './components/log/ForgotPw';
import ProductDetail from './components/products/ProductDetail'
import Cart from './components/cart/Cart';
import ServiceCenter from './components/user/ServiceCenter';
import UserInfo from './components/user/UserInfo';
import MyPage from './components/user/MyPage';
import Notice from './components/user/Notice';
import OrderHistory from './components/user/OrderHistory';
import RvCenter from './components/review/RvCenter';
import EventCenter from './components/event/EventCenter';
import Coupon from './components/user/Coupon';
import Category from './components/categorys/Category';



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
                <Route path="/productDetail" component={ProductDetail} />
                <Route path="/cart" component={Cart} />
                <Route path="/notice" component={Notice} />
                <Route path="/orderHistory" component={OrderHistory} />
                <Route path="/reCenter" component={RvCenter} />
                <Route path="/eventCenter" component={EventCenter} />
                <Route path="/coupon" component={Coupon} />
                <Route path="/category" component={Category} />

            </Switch>
        </>
    );
};

export default Page;