
import { loginHidden,registerHidden,register,login,loginInputUsername,loginInputPassword,loginBtn,registerBtn,registerInputName,registerInputPassword,registerInputUsername } from './elements';

const dashboard=document.querySelector("#dashboard")!;
const nav=document.querySelector("#nav")!;
const logOut=document.querySelector("#logOut")!;
const errorMessage=document.querySelector("#errorMessage")as HTMLParagraphElement;


login.addEventListener("click",()=>{
    registerHidden.classList.add("hidden");
    loginHidden.classList.remove("hidden");
});

register.addEventListener("click",()=>{
    loginHidden.classList.add("hidden");
    registerHidden.classList.remove("hidden");
});
logOut.addEventListener("click",()=>{
    registerHidden.classList.add("hidden");
    loginHidden.classList.remove("hidden");
    nav.classList.remove('hidden');
    loginInputPassword.value="";
    loginInputUsername.value="";
})

let truePassword="root123";
let truUsername="admin";

loginBtn.addEventListener("click",()=>{
    const enterPassword=loginInputPassword.value;
    const enterUsername=loginInputUsername.value;


    if(truUsername==enterUsername && truePassword==enterPassword){
        loginHidden.classList.add("hidden"); 
        registerHidden.classList.add("hidden");
        dashboard.classList.remove("hidden");
        nav.classList.add("hidden")
        errorMessage.classList.add("hidden")
    }
    else{
        
        errorMessage.textContent = "Username yoki parol noto‘g‘ri!";
        errorMessage.classList.remove("hidden");

        setTimeout(() => {
            errorMessage.classList.add("hidden");
        }, 3000);


    }

})


registerBtn.addEventListener("click",()=>{
    alert("sizning malumotlaringiz saqlandi.")
})


