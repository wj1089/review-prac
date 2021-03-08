import React from 'react';
import "../remote.css"

const Point = () => {
    



    return (
        <>
            <div className="info-lightTopicArea">
                <a href="./mypage">
                    <div>
                        <i class="fas fa-arrow-left" 
                            style={{outline:"none", textDecoration:"none"}}
                        />
                    </div>
                </a>
                <div className="info-topic">포인트</div>
                <div type="button" />
            </div>
            <div className="info-bigContentArea" style={{textAlign:"center"}}>
                <p>원</p>
                <p>당월 소멸 예정 포인트 ~원</p>
                <p>(img)포인트 사용안내(img2)</p>
            </div>

            <div style={{padding:"0 16px 0 16px"}}>
                <div className="info-insideContent" style={{ borderBottom: "1px solid rgb(224, 224, 224)"}}>
                    <div>2021~~</div>
                    <div style={{ display:"flex"}}>
                        <div style={{width:"60%", border:"1px solid"}}>
                            <p>포인트 사용내역</p>
                            <p>유효기간</p>
                        </div>
                        <div style={{width:"40%", border:"1px solid"}}>
                            포인트 사용 액수+-                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Point;