// //  user login in allow to make service
// const currentUser = JSON.parse(localStorage.getItem("onlineUser"))
// console.log("cure,", currentUser)

// if(currentUser && currentUser.isAdmin){
//   const usericon=  document.querySelector(".usericon")

//     document.querySelector(".Disktop-dashboardShowLogIN").style.display = 'block'
//     document.querySelector(".mobile-dashboardShowLogIN").style.display = 'block'


// }
// if(currentUser && currentUser.firstName ){
// const usericon=  document.querySelector(".usericon").textContent = `${currentUser.firstName}`
// console.log("usericon", usericon)
//  document.querySelector("#login").style.display = 'none'
// document.querySelector(".logOut").textContent = 'logOut'
// document.querySelector(".logOut").style.display = 'block'
// document.querySelector(".lights").style.display = 'block'
  
// document.querySelector(".logOut").style.backgroundColor = "#c0392b"

// document.querySelector(".mobile-logOut").style.backgroundColor = "#c0392b"
// document.querySelector("#mobileLOgIn").style.display = 'none'
//  document.querySelector(".mobile-usericon").textContent = `${currentUser.firstName}`

// } else{
//    document.querySelector(".logOut").style.display = 'none'
//    document.querySelector(".mobile-logOut").style.display = 'none'
//      document.querySelector("#mobileLOgIn").style.display = 'block'
//    document.querySelector(".fa-user").style.display = "none"
//    document.querySelector(".mobilUserIcon").style.display = "none"

// }

// // desktop lougOut
// const logOut = document.body.querySelector(".logOut")
// logOut.addEventListener("click", ()=>{
// localStorage.removeItem("onlineUser")

// window.location.href = '../html/autho.html'

// })

// //mobile logout
// const  mobileLogOut = document.querySelector(".mobile-logOut")
// mobileLogOut.addEventListener("click", ()=>{
//   console.log("md")
//   localStorage.removeItem("onlineUser")
//   window.location.href = '../html/autho.html'
// })
