import React, { useState }  from 'react';

const DownNav = () => {

    const categoryStyle = {
        width:"33.5%", 
        borderTop:"1px solid", 
        fontSize:20, 
        display:"flex", 
        justifyContent:"center",
        alignItems:"center",
        padding:"18.5px 0 18.5px 0",
        outline:"none",
        textDecoration:"none",
    }

    // const [isSubmit, setIsSubmit] = useState(false)
    // const submitForm =()=> {
    //     setIsSubmit(!isSubmit)
    //     props.history.push("./login")
    // }

    const ticket = localStorage.getItem("user")


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
                    <a href={'./login'} style={categoryStyle}><div>home</div></a>
                    <a href={'./login'} style={categoryStyle}><div>category</div></a>
                    <a href={'./login'} style={categoryStyle}><div>my</div></a>
                </>
            )}

            {ticket !== null &&(
                <>
                    {/* <a href={'./video'} style={categoryStyle}><div type="button">video</div></a> */}
                    <a href={'./'} style={categoryStyle}><div type="button">home</div></a>
                    <a href={'./category'} style={categoryStyle}><div type="button">category</div></a>
                    <a href={'./mypage'} style={categoryStyle}><div type="button">my</div></a>
                </>
            )}
            </div>
        </>
    );
};

export default DownNav;