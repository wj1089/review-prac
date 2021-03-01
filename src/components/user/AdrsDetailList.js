import React, { useState } from 'react';

const AdrsDetailList = ({
    data,history
}) => {
    // const [isAdd, setIsAdd] = useState([])

    // const modifyAdrs =()=>{
    //     console.log("배송지 수정버튼 클릭")

    // }

    const selectAdrs =()=>{
        console.log(" 선택 버튼 클릭")
        // history.push("./payment")
    }

    return (
        <>
        
            {data.map((adrs)=>(
                <div style={{border:"1px solid"}}>
                    <div>기본배송지</div>
                    <p>수령인 : {adrs.name}</p>
                    <p>연락처 : {adrs.phone}</p>
                    <p>주소 : {adrs.address + "("+adrs.addressDetail+")"}</p>
                    <div>
                        <a href={`/addressForm?id=${adrs.receiverId}`}><button type="button" style={{width:"50%", backgroundColor:"white"}}>배송지 수정</button></a>
                        <button onClick={selectAdrs} style={{width:"50%", backgroundColor:"lightpink"}}>기본배송지로 선택</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AdrsDetailList;