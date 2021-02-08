export default function validationInfo(signInput){

    let error = {}
    console.log("val-signInput")
    console.log(signInput)
//수정
    if (!signInput.name) {
        error.name = '성함을 정확히 입력해주세요.';
      }

//수정
    if (!/\S+@\S+\.\S+/.test(signInput.email)) {
        error.email = 'Email 주소를 정확히 입력해주세요';
    }
    // if (signInput.email === "") {
    //     error.email = 'Email 전달';
    //   } else if (!/\S+@\S+\.\S+/.test(signInput.email)) {
    //     error.email = 'Email 주소를 정확히 입력해주세요';
    //   }

    if (signInput.password.length < 6){
        console.log("signInput.password")
        console.log(signInput.password)
        error.password = '비밀번호 6자 이상 설정해주세요!'
    }

    if (signInput.phone.length === 10 || signInput.phone.length === 11) {
        console.log("전화번호 입력 성공!")
    }else{
        error.phone = '전화번호를 정확히 입력해주세요!'
    }

    if(signInput.address !== false){
        error.address = '주소를 정확히 입력해주세요!'
    }

    //라이브러리 데이트 피커
    if(signInput.birthday === ""){
        error.birthday = '생년월일을 정확히 입력해주세요!'
    }

    if(signInput.pswcheck !== signInput.password){
        console.log("pswcheck")
        error.pswcheck = "비밀번호가 맞지 않습니다 다시 입력해주세요!"
    }

    return error;

    
};