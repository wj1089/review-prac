import React, { useState } from 'react';

const OrderNav = ({history}) => {
    const [order,setOrder] = useState(false)

    const orderBtn = () =>{
        setOrder(!order)
        console.log(order)
        history.push("./payment")
    }

    return (
        <>
            <div style={{width:"100%", height:50, display:"flex", justifyContent:"center", border:"1px solid"}}>
                <button type="button" onClick={orderBtn}>주문버튼</button>
                {/* <a href="./payment"></a> */}
            </div>
        </>
    );
};

export default OrderNav;