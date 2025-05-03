
const bookingModelForm = document.querySelector("#booking-model-form")
const custFullName = document.querySelector("#cust-fullName")
const custNumber = document.querySelector("#cust-Number")
const customerAddress = document.querySelector("#customer-address")
const showServiceType = document.querySelector("#serviceSelection")
const ShowpriceService = document.querySelector("#price")
const dateService = document.querySelector("#date-service")
const descriptionService = document.querySelector("#description-service")
const custNationality = document.querySelector("#cust-Nationality")


//  user login in allow to make service
const currentUser = JSON.parse(localStorage.getItem("onlineUser"))
console.log("cure,", currentUser)

if(currentUser && currentUser.isAdmin){
  const usericon=  document.querySelector(".usericon")

    document.querySelector(".Disktop-dashboardShowLogIN").style.display = 'block'
    document.querySelector(".mobile-dashboardShowLogIN").style.display = 'block'


}
if(currentUser && currentUser.firstName ){
const usericon=  document.querySelector(".usericon").textContent = `${currentUser.firstName}`
console.log("usericon", usericon)
 document.querySelector("#login").style.display = 'none'
document.querySelector(".logOut").textContent = 'Log Out'
document.querySelector(".logOut").style.display = 'block'
document.querySelector(".logOut").style.fontSize = '16px'
document.querySelector(".logOut").style.width = '80px'
document.querySelector(".logOut").style.height = '35px'
document.querySelector(".lights").style.display = 'block'
  
document.querySelector(".logOut").style.backgroundColor = "#c0392b"

document.querySelector(".mobile-logOut").style.backgroundColor = "#c0392b"
document.querySelector("#mobileLOgIn").style.display = 'none'
 document.querySelector(".mobile-usericon").textContent = `${currentUser.firstName}`

} else{
  //  document.querySelector(".logOut").style.display = 'none'
   document.querySelector(".mobile-logOut").style.display = 'none'
     document.querySelector("#mobileLOgIn").style.display = 'block'
   document.querySelector(".fa-user").style.display = "none"
   document.querySelector(".mobilUserIcon").style.display = "none"

}

// desktop lougOut
const logOut = document.body.querySelector(".logOut")
logOut.addEventListener("click", ()=>{

Swal.fire({
  title: "Confirm Logout",
  text: "Are you sure you want to log out?",
  icon: "warning",
  confirmButtonColor: "#4880ff",
  cancelButtonColor: "#C13739",
  showCancelButton: true,
  confirmButtonText: "Yes, Logout !",
  cancelButtonText: "No, cancel!",
  reverseButtons: true,
}).then((result) => {
  if (result.isConfirmed) {
    localStorage.removeItem("onlineUser");


    Swal.fire({
      title: "You’ve Logged Out!",
      text: "You’ve successfully logged out. ",
      icon: "success",
    }).then(() => {
  window.location.href = '../html/autho.html'
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    Swal.fire({
      title: "Logout Canceled",
      text: "You’re still logged in, ",
      icon: "error",
    });
  }
});


})

//mobile logout
const  mobileLogOut = document.querySelector(".mobile-logOut")
mobileLogOut.addEventListener("click", ()=>{
  console.log("md")
  Swal.fire({
    title: "Confirm Logout",
    text: "Are you sure you want to log out?",
    icon: "warning",
    confirmButtonColor: "#4880ff",
    cancelButtonColor: "#C13739",
    showCancelButton: true,
    confirmButtonText: "Yes, Logout !",
    cancelButtonText: "No, cancel!",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("onlineUser");
  
  
      Swal.fire({
        title: "You’ve Logged Out!",
        text: "You’ve successfully logged out. ",
        icon: "success",
      }).then(() => {
    window.location.href = '../html/autho.html'
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire({
        title: "Logout Canceled",
        text: "You’re still logged in, ",
        icon: "error",
      });
    }
  });
  
})




fetchSevices()


// get service

async  function fetchSevices(){
   try {
    const response = await fetch("../data/service.json")
   const result =  await response.json();
   console.log("result", result)
   showServiseToDom(result)
   } catch (error) {
    console.error("srvice error", error)
   }
}
const services = document.querySelector("#services")
 function showServiseToDom(data){
    console.log("data from",data)
   
  const newservice = data.map(service =>{
   
 return`<div class="serviceGrid">

<div class="sericeImage"> 
<img src="${service.image}" > 
<div class="service-info">
<h3 class="service-title" data-id = " ${service.title} ">${service.title} </h3>
<p class="description"> ${service.description} </p>
<h5 class="price" data-id ="${service.price}"> price: $${service.price} </h5>
<button class="bookinBtn" data-id ="${service.id}"> Get Now </button>
</div>

 </div>

 </div>

`;
 

    }).join(" ")
   
   services.innerHTML = newservice

   // servicebooking

 services.querySelectorAll('.bookinBtn').forEach(button => {

  button.addEventListener("click", (event)=>{
    const currentUser = JSON.parse(localStorage.getItem("onlineUser"))
    if(!currentUser){
      alert("please log in")
  window.location.href = '../html/autho.html'
      return
    } else{
      // get price
      const serviceInfo = event.target.closest('.service-info');
      const priceElement = serviceInfo.querySelector('.price');
     
      const clickedPrice = priceElement.dataset.id; // or parseFloat if needed
   if(ShowpriceService){
    ShowpriceService.value = clickedPrice;
   }else{
    alert("no exist price")
    return
   }

  //  get service type
  const serviceInfoserviceType = event.target.closest('.service-info');
  const getServiceType  = serviceInfoserviceType.querySelector('.service-title');
  const selectServiceTpye = getServiceType.dataset.id
 if(showServiceType){
  showServiceType.value = selectServiceTpye
 }else{
  alert("no exist service type")
 }
// console.log("selectServiceTpye", selectServiceTpye)
      // console.log("clicked", clickedPrice)

     const bookingModelContainer = document.querySelector('.booking-model-container')
     bookingModelContainer.classList.add("active")
bookingModelFormFunction()

    }
  })
 });


 }

// booking service form

function bookingModelFormFunction(){
bookingModelForm.addEventListener("submit", (event)=>{
  event.preventDefault()
  
  // booking data

  const bookingData = {
    id: Date.now(),
    name: custFullName.value.trim(),
    Number: custNumber.value.trim(),
    address: customerAddress.value.trim(),
    national: custNationality.value.trim(),
    serviceType: showServiceType.value,
    price: ShowpriceService.value,
    date: dateService.value,
    description: descriptionService.value.trim()
  }
  
 // validate Somali number
 if (!isValidSomaliNumber(custNumber.value.trim())) {
  Swal.fire({
    title: "Invalid Number!",
    text: `Please enter a valid Somali phone number`,
    icon: "error",
    confirmButtonText: "Ok"
  });

  return;
}
   //  Name validation
   if (!isValidName(custFullName.value.trim())) {
    Swal.fire({
      title: "Invalid Name",
      text: "Please enter a valid name (letters only)",
      icon: "warning",
      confirmButtonText: "OK",
    });
 
    return;
  }  
  if(custFullName.value.trim( ) === "" || custNumber.value.trim() === "" || customerAddress.value.trim() === "" || showServiceType.value.trim() === "" || ShowpriceService.value.trim() === "" || dateService.value.trim() === "" || custNationality.value.trim( ) === ""){
    Swal.fire({
      title: "Error!",
      text: `please fill all Inputs`,
      icon: "error",
      confirmButtonText: "ok"
     
  });
  return
  }else{
   
   
   Swal.fire({
    title: "booking service",
    text: "Are you sure you want to  confirm?",
  
    confirmButtonColor: "#4880ff",
    cancelButtonColor: "#C13739",
    showCancelButton: true,
    confirmButtonText: "confirm!",
    cancelButtonText: "Cancel!",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
     // get  old data stored 
      const getData = JSON.parse(localStorage.getItem("customers")) || [];
      getData.push(bookingData)
        console.log("allData", getData)
       localStorage.setItem("customers", JSON.stringify(getData))
        // clear inputs
  custFullName.value = ""
  custNumber.value = ""
  customerAddress.value = ""
  custNationality.value = ""
  showServiceType.value = ""
  ShowpriceService.value = ""
  dateService.value = ""
  descriptionService.value = ""
  
      Swal.fire({
        title: "confirmed successful!",
        text: "your data saved ",
        icon: "success",
      })
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire({
        title: "comfirmed Canceled",
        text: "no data saved ",
        icon: "error",
      });
    }
  });
  
  


 
  }
  // console.log("bookingData", bookingData)
})
}

// valid number
function isValidSomaliNumber(number) {
  const regex = /^(?:252|0)?(61|62|63|64|65|66|67|68|69)\d{7}$/;
  return regex.test(number);
}

// valid name
function isValidName(name) {
  const regex = /^[a-zA-Z\s'-]{4,}$/;
  return regex.test(name);
}


//  close booking model
document.querySelector("#closeBookingModel").addEventListener("click", ()=>{
  const bookingModelContainer = document.querySelector('.booking-model-container')
  bookingModelContainer.classList.remove("active")
})
// or 
document.body.addEventListener("click", (event)=>{
  const bookingModelContainer = document.querySelector('.booking-model-container')
if(event.target === bookingModelContainer){
  bookingModelContainer.classList.remove("active")
}
})




