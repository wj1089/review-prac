export default function validationInfo(signInput){

    let error = [];
    // error.success : true, false
    // error.message : {
    // name : email
    // content : '성함을 정확히 입력해주세요.'
    // }
    console.log("val-signInput")
    console.log(signInput)
    
    let check = true;

    if (!signInput.name) {
        // error.name = '성함을 정확히 입력해주세요.';
        error.success= false;
        error.message = {
            name : "name",
            content : "성함을 정확히 입력해주세요."
        }
        
        return error;
      }

//수정
    if (!/\S+@\S+\.\S+/.test(signInput.email)) {
        error.email = 'Email 주소를 정확히 입력해주세요';
        // error.name = '성함을 정확히 입력해주세요.';
        check= false;
        error.push({
            name : "email",
            content : "Email 주소를 정확히 입력해주세요"
        }) 
    }
    // if (signInput.email === "") {
    //     error.email = 'Email 전달';
    //   } else if (!/\S+@\S+\.\S+/.test(signInput.email)) {
    //     error.email = 'Email 주소를 정확히 입력해주세요';
    //   }

    if (signInput.password.length < 6){
        error.password = '비밀번호 6자 이상 설정해주세요!'
        check= false;
        error.push({
            name : "password",
            content : "비밀번호 6자 이상 설정해주세요!"
        }) 
        console.log("password")
        console.log(error.password)
    }

    if (signInput.phone.length < 10 || signInput.phone.length > 11) {
        error.phone = '전화번호를 정확히 입력해주세요!'
        check= false;
        error.push({
            name : "phone",
            content : "전화번호를 정확히 입력해주세요!"
        }) 
        console.log("전화번호")
        console.log(error.phone)
    }

    if(signInput.address === ''){
        error.address = '주소를 입력해주세요!'
        console.log("주소 입력 성공!")
        console.log(error.address)

    }

    if(signInput.addressDetail === ''){
        error.addressDetail = '상세주소를 입력해주세요!'
        console.log("상세주소")
        console.log(error.addressDetail)
    }
    
    //라이브러리 데이트 피커
    if(signInput.birthday === ''){
        error.birthday = '생년월일을 정확히 입력해주세요!'
        console.log("생년월일")
        console.log(error.birthday)
    }

    if(signInput.pswcheck !== signInput.password){
        error.pswcheck = "비밀번호가 맞지 않습니다 다시 입력해주세요!"
        console.log("pswcheck")
        console.log(error.pswcheck)
    }

    if(signInput.gender === ''){
        error.gender = "성별 체크칸을 체크해주세요!"
        console.log("gender")
        console.log(error.gender)
    }

    error.success = check;

    return error;

    
};