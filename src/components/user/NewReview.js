import React, { useState } from 'react';

const NewReview = () => {

    const [clickSave,setClickSave] = useState(false)

    const handleSaveBtn = () =>{
        setClickSave(!clickSave)
        console.log(clickSave)
    }

    return (
        <>
            <div className="info-lightTopicArea">
                <a href="./reviewCenter">
                    <div>
                        <i class="fas fa-arrow-left" 
                            style={{outline:"none", textDecoration:"none"}}
                        />
                    </div>
                </a>
                <div className="info-topic">리뷰작성</div>
                <div type="button" />
            </div>
            <div style={{padding:"28px 16px 82px 16px", borderBottom:"1px solid"}}>
                <div style={{borderLeft:"3px solid #cccccc"}}>
                    <div style={{paddingLeft:10}}><b>이린이 간식 상품 상세 정보</b></div>
                    <div style={{paddingLeft:10}}>옵션이름</div>
                </div>
                <div style={{margin:"24px 0 16px 0"}}>리뷰 포인트 </div>
                <input style={{
                    width:"100%", 
                    height: 220,
                    borderRadius: 4,
                    border:" solid 1px #cccccc",
                    backgroundColor: "#ffffff",
                    textDecoration:"none",
                    outline:"none",
                    marginBottom:16,
                    display:"flex",
                    alignItems:"flex-start"
                    }} 
                    placeholder="최소 20자이상의 상품에 대한 후기를 남겨주세요" />
                <div>리뷰작성시 상품이 구매확정이 되며 교환 및 환불처리가 불가합니다</div>
            </div>
            <div 
                type="button" 
                style={{ 
                    height: 52,
                    display:"flex", 
                    justifyContent:"center", 
                    alignItems:"center", 
                    borderRadius: 6, 
                    backgroundColor: "#ec9281",
                    fontSize: 17,
                    color: "#ffffff",
                    margin:"8px 10px 6px 10px"
                }}
                onClick={handleSaveBtn}
            >
                저장하기
            </div>
        </>
    );
};

export default NewReview;