import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({
    data,
    containerLayout,
    contentLayout,
    imgLayout
}) => {

    // const [checkAll, setCheckAll] = useState(false)

    // const productRef = React.useRef(false)
    // //아이템 전체 체크
    // useEffect(()=>{
    //     if(checkAll===true){
    //         console.log("ref")
    //         console.log(productRef.current.children)
    //         // productRef.current.children[0] === true
    //         // productRef = <input type={'checkbox'} onChange={() => handleItemListCheck} checked={true} />
    //         // productRef.current.input(true)
    //     }else{
            
    //     }
    //     console.log(productRef.current.children[0])
    // }, [checkAll])

    // const handleItemListCheck = (e) =>{
    //     setCheckAll(e.target.checked)
    // }

    
    return (
        <>
            <div>
                <p>carItem</p>   
                <div>
                    {data.map((cartItem)=>(
                        <div className={containerLayout} alt={cartItem.id}>
                            <div className={contentLayout}>
                            <div style={{border:"1px solid",display: "flex"}}>
                                <img className={imgLayout} src={cartItem.img} alt={cartItem.id} />
                                {cartItem.content}
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CartItem;
CartItem.propTypes ={
    data: PropTypes.arrayOf(PropTypes.object),
    containerLayout : PropTypes.string,
    contentLayout : PropTypes.string,
    imgLayout: PropTypes.string,
}

PropTypes.defaultType = {
    data :[],
    containerLayout : 'cartContainer',
    contencontentLayouttCss : 'cartContent',
    imgLayout : 'cartImg'
}
