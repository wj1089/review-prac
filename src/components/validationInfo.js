export default function validationInfo(signInput){

    let error = [];
    // error.success : true, false
    // error.message : {
    // name : email
    // content : '성함을 정확히 입력해주세요.'
    // }

    console.log("validation SignInput")
    console.log(signInput)

    // console.log("forgotInfo")
    // console.log(forgotInfo)

    let check = true;

//회원가입
    if (!signInput.name) {
        error.success= false;
        error.message = {
            name : "name",
            content : "성함을 정확히 입력해주세요."
        }
        return error;
      }

//아이디찾기
    // if(!forgotInfo.name){
    //     error.success= false
    //     error.message={
    //         name : "name",
    //         content : "성함을 정확히 입력해주세요.(아이디찾기)"
    //     }
    //     return error;
    // }


    if (!/\S+@\S+\.\S+/.test(signInput.email)) {
        error.success= false;
        error.message = {
            name : "email",
            content : "Email 주소를 정확히 입력해주세요"
        }
        return error;
    }

    if (signInput.password.length < 6){
        error.success= false
        error.message = {
            name : "password",
            content : "비밀번호 6자 이상 설정해주세요!"
        }
        return error;
    }

//회원가입
    if (signInput.phone.length < 10 || signInput.phone.length > 11) {
        error.success= false
        error.message={
            name : "phone",
            content : "전화번호를 정확히 입력해주세요!"
        }
        return error;
    }

//아이디찾기 인증번호
    // if (forgotInfo.phone.length < 10 || forgotInfo.phone.length > 11) {
    //     error.success= false
    //     error.message={
    //         name : "phone",
    //         content : "전화번호를 정확히 입력해주세요!"
    //     }
    //     return error;
    // }


    if(signInput.address === ''){
        error.success= false
        error.message={
            name : "address",
            content : "주소를 입력해주세요!"
        }
        return error;
    }

    if(signInput.addressDetail === ''){
        error.success= false
        error.message={
            name : "addressDetail",
            content : "상세주소를 입력해주세요!"
        }
        return error;
    }
    
    //라이브러리 데이트 피커
    if(signInput.birthday === ''){
        error.success= false
        error.message={
            name : "birthday",
            content : "생년월일을 입력해주세요!"
        }
        return error;
    }

    if(signInput.pswcheck !== signInput.password){
        error.success= false
        error.message={
            name : "pswcheck",
            content : "비밀번호가 맞지 않습니다 다시 입력해주세요!"
        }
        return error;
    }

    if(signInput.gender === ''){
        error.success= false
        error.message={
            name : "gender",
            content : "성별 체크칸을 체크해주세요!"
        }
        return error;
    }





    error.success = check;

    return error;

    
};