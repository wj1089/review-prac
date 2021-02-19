import React from 'react';
import Logout from '../log/Logout';

const MyPage = () => { 

    return (
        <>
            <h1>Welcome to My Page</h1>
            <div >
                <a href="/userInfo"><button type="button">회원정보</button></a>
                <a href="/coupon"><button>쿠폰함</button></a>
                <a href="/orderHistory"><button>주문내역</button></a>
            </div>

            <div>
                <a href="/reCenter"><button>리뷰관리</button></a>
                <a href="/eventCenter"><button>이벤트</button></a>
                <a href="/notice"><button>공지사항</button></a>
                <a href="/serviceCenter"><button>고객센터</button></a>
            </div>
            <Logout />
        </>
    );
};

export default MyPage;