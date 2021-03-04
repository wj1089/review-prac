import React from 'react';

const ChangeAdrs = () => {








    return (
        <>
            {/* / //신규번호 확인
            // const addDetailChange = (e) =>{
            //     console.log("isAddressDetail")
            //     setIsAddressDetail(e.target.value)
            //     console.log(isAddressDetail)
            // } */}
            {/* //validation check Passward
            // const validatePw = () =>{
            //     if(newPw.length < 9){
            //         return
            //     }
            //     // if(oldPw === newPw){
            //     //     alert("과거 비밀번호와 같습니다.")
            //     //     console.log("과거 비밀번호와 같습니다.")
            //     //     return
            //     // }
            //     if(checkPw !== newPw || checkPw.length < 9){
            //         alert("입력한 비밀번호가 틀립니다.")
            //         console.log("입력한 비밀번호가 틀립니다.")
            //         return
            //     }
            //     // else{
            //     //     setAgreeSign(true)
            //     //     console.log("통과")
            //     //     alert("통과")
            //     //     setNewPw(newPw)
            //     //     setPasswordClick(false)
            //     // }
            // }

            // const handleAddDetailSwitch = () =>{
            //     setAddDetail(!addDetail)
            //     console.log("addDetail")
            //     console.log(addDetail)
            // }

            // //비밀번호 변경 여부 버튼
            // const handlePwClick = () =>{
            //     setPasswordClick(!passwordClick)
            //     console.log(passwordClick)
            //     setAgreeSign(false)
            // } */}

            {/* // 신규 비밀번호 등록
                // const pwForm = (
                //     <>
                //         <p style={{textAlign:'left'}}>비밀번호 : </p>
                //         <div style={{width:250, border:"1px solid", textAlign:'left'}}>
                //             <p>기존 비밀번호</p>
                //             <input value={oldPw} onChange={oldPwChange} style={{width:"100%"}} type="text" placeholder="기존 비밀번호를 입력해주세요." />
                //             <p>새로운 비밀번호</p>
                //             <input value={newPw} onChange={newPwChange} style={{width:"100%"}} type="text" placeholder="새로운 비밀번호를 입력해주세요." />
                //             <input value={checkPw} onChange={checkPwChange} style={{width:"100%"}} type="text" placeholder="다시 한번 입력해주세요." />
                            
                //             <button type="button" onClick={handlePwClick}>취소</button>
                //             <button onClick={validatePw}>확인</button>
                //         </div>
                //     </>
                // )

                비밀번호 변경 전
                const beforeChange = (
                    <>
                        <div style={{display:"flex"}}>
                //</div>             <p>비밀번호</p>
                //             {agreeSign === false && (
                //                 <div 
                //                 value={oldPw}
                //                 type="text" 
                //                 placeholder="비밀번호" 
                //                 style={{border: "1px solid",height:30}} 
                //                 >
                //                 {oldPw}
                //                 </div>
                //             )}
                //             {agreeSign === true && (
                //                 <div 
                //                 value={newPw}
                //                 type="text" 
                //                 placeholder="비밀번호" 
                //                 style={{border: "1px solid",height:30}} 
                //                 >
                //                 {newPw}
                //                 </div>
                //             )}
                            
                //             <button type="button" onClick={handlePwClick}>변경하기</button>
                //         </div>
                //     </>
                // ) */}


                {/* // //주소지 신규등록 모달
                    // const AddresModal = () => {
                    //     return (
                    //         <Button variant="primary" onClick={handleAddShow}>
                    //             주소검색
                    //         </Button>
                    //     )
                    // } */}
            
            {/* <div className="user-infoContent">
                <div 
                    type="text" 
                    id="address" 
                    name="address"
                    placeholder="주소" 
                    value={isAddress}
                    selected={isAddress}
                    style={{border: "1px solid", maxWidth: 250}}
                >
                    {allow === true && (
                        isAddress
                    )}
                    {allow === false && (
                        userInfo.address
                    )}
                </div>
                <a href={`/adrsManage`}><button type="button">주소록관리</button></a>
                </div>
                <div className="user-infoContent">
                    {addDetail === true && (
                    <>
                        <input 
                            value={isAddressDetail}
                            type="text" 
                            placeholder="상세주소" 
                            style={{border: "1px solid",width: 100,height:30}}
                            onChange={addDetailChange}
                        />
                        <button onClick={handleAddDetailSwitch}>취소</button>
                    </>
                    )}
                    
                    {addDetail === false && (
                    <>
                        <div 
                            value={userInfo.addressDetail}
                            type="text" 
                            placeholder="상세주소" 
                            style={{border: "1px solid",width: 100,height:30}}
                            onChange={addDetailChange}
                        >
                            {userInfo.addressDetail}
                        </div>
                        <button onClick={handleAddDetailSwitch}>입력하기</button>
                    </>
                    )}
                </div> */}  

                
        {/* // //모달 등록번호입력
        // const beforeChangePn= (
        // <>
        //     <div>
        //         <input 
        //             value={phoneInput}
        //             type="text" 
        //             placeholder="번호를 입력해주세요." 
        //             onChange={phoneNumChange}
        //             style={{border: "1px solid", width:300, height:30}}
        //         />
        //         <button 
        //             type="button"
        //             style={{float:"right", width:100}}
        //             onClick={handleCodeSwitch}
        //         >
        //             인증요청
        //         </button>
        //     </div>
        //     <button style={{float:"right"}} onClick={handlePhoneClose}>취소</button>
        // </>
        // )
        
        // //모달 인증코드입력
        // const phoneForm = (
        //     <>
        //         <div style={{width:"100%"}}>
        //             <input 
        //                 value={codeInput}
        //                 type='text'
        //                 name="codeNum"
        //                 placeholder="인증번호" 
        //                 onChange={phoneCodeChange}
        //                 style={{border: "1px solid", width:300, height:30, float:"left"}}
        //             />
        //             <button 
        //                 type="button" 
        //                 style={{width:100}}
        //                 onClick={handleCodeSwitch}
        //             >
        //                 다시인증
        //             </button>
        //         </div>
        //         <div style={{height:100,width:300}}>
        //             <button style={{float:"right"}} onClick={handlePhoneCheck}>확인</button>
        //             <button style={{float:"right"}} onClick={handlePhoneClose}>취소</button>
        //         </div>
        //     </>
        // ) */}
        </>
    );
};

export default ChangeAdrs;