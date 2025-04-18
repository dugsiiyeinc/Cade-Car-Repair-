
const switchForm = document.querySelector("#switchForm")
const authButton = document.querySelector("#authButton")
const comformPassword = document.querySelector("#comform-password")
const firstName = document.querySelector("#firstName")
const LastName = document.querySelector("#LastName")
const Number = document.querySelector("#number")
const formTitle = document.querySelector("#formTitle")
const authSwitch = document.querySelector("#authSwitch")
const authoForm = document.querySelector("#autho-form")



document.body.addEventListener("click", (e)=>{
if(e.target.id !== "switchForm") return
    switchFormFunction()

})

// create swhitchfrom
let isSignIn = true






function switchFormFunction (){
 
    isSignIn = !isSignIn

 if(isSignIn){
formTitle.textContent = "sign In";
authButton.textContent = "Sign In";
authSwitch.innerHTML = 
`   
i don't have  an account? <a href="#" id="switchForm">Register now</a>
              `;
comformPassword.style.display= "none"
firstName.style.display= "none"
LastName.style.display= "none"
number.style.display= "none"
email.value =""
password.value = ""

 } else{
    formTitle.textContent = "sign Up";
    authButton.textContent = "Sign Up";
    authSwitch.innerHTML = `Already have an account? <a href="#" id="switchForm">Sign In</a>`
    comformPassword.style.display= "block"
    firstName.style.display= "block" 
    LastName.style.display= "block" 
    number.style.display= "block" 
    firstName.value = "";
    LastName.value = "";
    number.value = "";
    password.value = "";
    email.value = "";
    comformPassword.value = "";
 }
 
}


// fet form

authoForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const adminUser = [
        {
            id: Date.now(),
            firstName:  "admin2025",
            LastName: "admin2025",
            email: "admin@gmail.com",
            Number: 2526191199354,
            password: 'Admin2025',
            comformPassword: "Admin2025",
            isAdmin: true
    
        }
    ]

    const adminData = JSON.parse(localStorage.getItem("userData", )) || []
    // if( password.value !== comformPassword.value){
    //     alert("password do not mutch")
    //     return
    // }
adminUser.forEach(user =>{
    const existUser = adminData.find(currentUser => currentUser.firstName === user.firstName || currentUser.email === user.email)
    if(existUser){
        return
    }else{
        adminData.push(user)
    } localStorage.setItem("userData", JSON.stringify(adminData))
})

  
const users = {
    id: Date.now(),
    firstName: isSignIn? undefined: firstName.value.trim(),
    LastName: isSignIn? undefined: LastName.value.trim(),
        email: email.value,
        number: isSignIn? undefined: number.value.trim(),
        password: password.value,
        isAdmin: false
}
console.log(users)

if(!isSignIn){

    if(firstName.value.trim() === "" || LastName.value.trim() === "" || email.value ==="" || password.value.trim()=== "" || comformPassword.value.trim()=== "" ){
        Swal.fire({
            title: "Error!",
            text: `please fill all Inputs`,
            icon: "error",
            confirmButtonText: "ok"
        });
        return
    }
}

if(isSignIn){
    const userData = JSON.parse(localStorage.getItem("userData", )) || []
const existUser = userData.find((user) => user.email === users.email && user.password=== users.password)
    if(existUser && existUser.isAdmin){
        localStorage.setItem("onlineUser", JSON.stringify(existUser));

        Swal.fire({
            title: "click ok go to the dashboard!",
            icon: "success",
            ConfirmedButtonText: "ok"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "./dashboard.html";
            }
        });

    }else if(existUser && !existUser.isAdmin){
        localStorage.setItem("onlineUser", JSON.stringify(existUser));
        Swal.fire({
            title: "verified successfully!",
            icon: "success",
            ConfirmedButtonText: "ok"
            
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "../index.html";
            }
        });
    }else{
        Swal.fire({
            title: "invalid credentails!",
            icon: "error",
            ConfirmedButtonText: "ok"
        })
    }

}else{

    // validate Somali number
 if (!isValidSomaliNumber(number.value.trim())) {
    Swal.fire({
      title: "Invalid Number!",
      text: `Please enter a valid Somali phone number`,
      icon: "error",
      confirmButtonText: "Ok"
    });
    return;
  }


   //  Name1 validation
   if (!isValidName(firstName.value.trim())) {
    Swal.fire({
      title: "Invalid firstName",
      text: "Please enter a valid name (letters only)",
      icon: "warning",
      confirmButtonText: "OK",
    });
 
    return;
  } 
  if (!isValidName(LastName.value.trim())) {
    Swal.fire({
      title: "Invalid lastName",
      text: "Please enter a valid name (letters only)",
      icon: "warning",
      confirmButtonText: "OK",
    });
 
    return;
  } 
  
  

    if( password.value !== comformPassword.value){
        alert("password do not mutch")
        return
    }



    // valid number
function isValidSomaliNumber(number) {
    const regex = /^(?:252|0)?(61|62|63|64|65|66|67|68|69|90)\d{7}$/;
    return regex.test(number);
  }

// valid name
function isValidName(name) {
    const regex = /^[a-zA-Z\s'-]{4,}$/;
    return regex.test(name );
  }

  



    // save to local storage
    const userData = JSON.parse(localStorage.getItem("userData", )) || []
const existUser = userData.find((user) => user.firstName === users.firstName && user.email=== users.email)

if(existUser){
    Swal.fire({
        title: 'credentails!',
        with: 200,
        text: `Already username ${existUser.firstName } exists.`,
        icon: 'error',
      
      });
    return
}
userData.push(users)
localStorage.setItem("userData", JSON.stringify(userData))
Swal.fire({
    title: "regestration seccussfully !",
    icon: "success",
    ConfirmedButtonText: "ok"
})
switchFormFunction()
}












})

