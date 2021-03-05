import axios from 'axios';
import React,{useEffect,useState} from 'react';
import authHeader from "../../actions/userAction"
import { useDispatch } from 'react-redux';
import { loginUser } from "../../actions/userAction"
import "./userinfo.css"
import "../remote.css"

const CheckPw = ({history}) => {

    const infoAcount ="https://childsnack-test.appspot.com/_ah/api/user/v1/getAccount"
   
    const [password, setPassword] = useState('')
    const [infoBox, setInfoBox] = useState('')

    const goBack = ()=>{
        history.goBack()
    }
    const dispatch = useDispatch();

    const changePw = e =>{
        setPassword(e.currentTarget.value)
    }

    useEffect(()=>{
        axios
        .get(infoAcount, {headers: authHeader()})
        .then((response)=>{
            console.log("get inside")
            console.log(response)
            const accountId =  response.data.email
            setInfoBox(accountId)
        })
    },[])

    const os = "ios"
    const uuid = "uuid"

    const checkInfo = ()=>{
        console.log("비밀번호 확인")
        
        const body = {
            email : infoBox,
            password : password,
            os : os,
            uuid : uuid,
        }
        dispatch(loginUser(body))
        .then((response) => {
        if(response.payload.accountEntity !== false){
            console.log("계정확인완료")
            localStorage.setItem("user", JSON.stringify(response.payload.token));
            history.push("./changeProfile")
        }
        })
        .catch((error)=>{
            alert(error.response.data.error.message)
        })
    }

    return (
        <>
            <div className="info-topicArea">
                <button onClick={goBack}>뒤로</button>
                <div className="info-topic">회원정보수정</div>
            </div>
            <div style={{textAlign:"left",padding :"0 16px 0 16px"}}>
                <div className="check-title">비밀번호 확인</div>
                <p className="info-descrip">회원님은 정보를 보호하기 위해 비밀번호를 다시 한 번 확인해주세요.</p>
                
                <div className="user-infoContent">
                    <div 
                        type="text" 
                        placeholder="이메일" 
                        className="user-textbox"
                    >
                        {infoBox}
                    </div>
                </div>

                <div className="user-blankContent">
                    <input 
                        style={{ outline:"none", border:"none", font: "small-caption", width:"100%"}}
                        value={password}
                        type="password"
                        name="password"
                        placeholder="비밀번호" 
                        className="user-textbox"
                        onChange={changePw}
                    />
                </div>

                <div className="user-infoBtn">
                    <div onClick={checkInfo}  type="button" className="user-btnbox">
                        확인
                    </div>
                </div>

            </div>
        </>
    );
};

export default CheckPw;