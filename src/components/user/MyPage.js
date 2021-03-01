import React from 'react';
import Logout from '../log/Logout';

const MyPage = ({history}) => { 
   //뒤로가기
   const goBack = () =>{
    history.push("./");
}
    return (
        <>
            <div style={{height: 600, paddingTop:150}}>
                <h1>Welcome to My Page</h1>
                <button type="button" onClick={goBack}>뒤로가기</button>
                <div >
                    <a href="/userInfo"><button type="button">회원정보</button></a>
                    <a href="/coupon"><button>쿠폰함</button></a>
                    <a href="/orderHistory"><button>주문내역</button></a>
                </div>

                <div>
                    <a href="/reviewCenter"><button>리뷰관리</button></a>
                    <a href="/eventCenter"><button>이벤트</button></a>
                    <a href="/notice"><button>공지사항</button></a>
                    <a href="/serviceCenter"><button>고객센터</button></a>
                </div>
                <Logout />
            </div>
        </>
    );
};

export default MyPage;