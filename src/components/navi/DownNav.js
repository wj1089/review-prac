import React, { useState }  from 'react';
import "./navi.css"
const DownNav = () => {

    // const categoryStyle = {
    //     width:"33.5%", 
    //     borderTop:"1px solid", 
    //     fontSize:20, 
    //     display:"flex", 
    //     justifyContent:"center",
    //     alignItems:"center",
    //     padding:"18.5px 0 18.5px 0",
    //     outline:"none",
    //     textDecoration:"none",
    // }

    // const [isSubmit, setIsSubmit] = useState(false)
    // const submitForm =()=> {
    //     setIsSubmit(!isSubmit)
    //     props.history.push("./login")
    // }
    const [clickMenu, setClickMenu] = useState(0)
    const ticket = localStorage.getItem("user")

    const onClickMenu = (index) =>{
        console.log(index)
        setClickMenu(index)
    }

    return (
        <>
            <div style={{
                display:"flex",
                width:"100%",
                bottom:0, 
                position:'fixed', 
                }}>
            { ticket === null &&(
                <>
                    {/* <a href={'./login'} style={categoryStyle}><div>video</div></a> */}
                    <a href={'./login'} className="menuStyle"><div>home</div></a>
                    <a href={'./login'} className="menuStyle"><div>category</div></a>
                    <a href={'./login'} className="menuStyle"><div>my</div></a>
                </>
            )}

            {ticket !== null &&(
                <>
                    {/* <a href={'./video'} style={categoryStyle}><div type="button">video</div></a> */}
                    <a href={'./'} className="menuStyle"><div type="button"><i class="fas fa-home"></i></div></a>
                    <a href={'./category'} className="menuStyle"><div type="button"><i class="fas fa-th-large"></i></div></a>
                    <a href={'./mypage'} className="menuStyle"><div type="button"><i class="fas fa-user"></i></div></a>
                </>
            )}
            </div>
        </>
    );
};
    {/* <div style={{width:100}}  type="button" id="productExplain" className={clickMenu === 0?"menuStyle":"notrun"} onClick={()=>clickMenu(1)}>
    <a href={'./login'} className="menuStyle"><div>home</div></a>
    </div>
    <div style={{width:100}}  type="button" id="productInfo" className={clickMenu === 1?"menuStyle":"notrun"} onClick={()=>clickMenu(2)}>
    <a href={'./login'} className="menuStyle"><div>category</div></a>
    </div>
    <div style={{width:100}}  type="button" id="review"  className={clickMenu === 2?"menuStyle":"notrun"} onClick={()=>clickMenu(3)}>
    <a href={'./login'} className="menuStyle"><div>my</div></a>
    </div> */}
export default DownNav;