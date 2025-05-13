 
 const getServicegModelForm = document.querySelector("#booking-model-form")
 const CustomerFullName = document.querySelector("#cust-fullName")
 const customerNumber = document.querySelector("#cust-Number")
 const custAddress = document.querySelector("#customer-address")
 const DisplayServiceType = document.querySelector("#serviceSelection")
 const displaypriceService = document.querySelector("#price")
 const serviceDate = document.querySelector("#date-service")
 const serviceDescription= document.querySelector("#description-service")
 const customerNationality = document.querySelector("#cust-Nationality")
 
 
 fetchServices()
// fetch data 

async  function fetchServices(){
    const response = await fetch("../data/serviceDetails.json")
    const data = await response.json()
    // console.log("data", data)
displayServiceDetails(data)
}


// display service
function displayServiceDetails(data){
const serviceContainer = document.querySelector("#service-container");
const getservices = data.map(service =>{
 return `
 <h2 class="title-service">our best service</h2>
 <div class="serviceDetailasGrid">
 <div class="leftside">

<h2 class='service-1'> ${service.title1} </h2>
<h2 class='service-2'> ${service.title2} </h2>
<h2 class='service-3'> ${service.title3} </h2>
<h2 class='service-4'> ${service.title4} </h2>
 </div>

 <div class="rigth-side ">

 <div class='serviceimage'> 
<img src=" ${service.image1}" class='image1'> 
<img src=" ${service.image2}" class='image2'> 
<img src=" ${service.image3}" class='image3'> 
<img src=" ${service.image4}" class='image4'> 
 </div>


 <div class='titles'> 
 
 



 <!-- list 1 -->
 <ul class='lists1 lists'> 
<h3 class='title1   title' data-id = "${service.title1}"> ${service.title1} </h3> 
  
 <li data-id ="${service.lists1[0].list1}" >${service.lists1[0].list1} </li>
 <li >${service.lists1[0].list2} </li>
 <li >${service.lists1[0].list3} </li>

  

 <p class='price' data-id = "${service.price}"> price: $${service.price}</p>
   <button class="service-btn" data-id = "${service.lists1[0].id}" > Add service </button>
 
 </ul>


  <!-- list 2 -->
 <ul class='lists2 lists'> 
<h3 class='title2  title'  style= 'display: none;' data-id = "${service.title2}"> ${service.title2} </h3>
 <li >${service.lists2[0].list1} </li>
 <li >${service.lists2[0].list2} </li>
 <li>${service.lists2[0].list3} </li>
  <p class='price' data-id = "${service.price = 25}"> price: $${service.price = 25}</p>
   <button class="service-btn" data-id = "${service.lists2[0].id}" > Add service </button>
 </ul>

 <!-- list 3 -->
  <ul class='lists3 lists'> 
   <h3 class='title3 title'  style= 'display: none;' data-id = "${service.title3}"> ${service.title3} </h3>
 <li >${service.lists3[0].list1} </li>
 <li >${service.lists3[0].list2} </li>
 <li>${service.lists3[0].list3} </li>
  <p class='price' data-id ="${service.price = 15}"> price: $${service.price = 15}</p>
   <button class="service-btn" data-id = "${service.lists3[0].id}" > Add service </button>
 </ul>


  <!-- list 4 -->
  <ul class='lists4 lists'> 
   <h3 class='title4 title '  style= 'display: none;'data-id = "${service.title4}" > ${service.title4} </h3>
 <li >${service.lists4[0].list1} </li>
 <li >${service.lists4[0].list2} </li>
 <li>${service.lists4[0].list3} </li>
  <p class='price' data-id = "${service.price = 40}"> price: $${service.price = 40}</p>
    <button class="service-btn" data-id = "${service.lists4[0].id}" > Add service </button>

 </ul>



 </div>


 </div>

 </div>
 `;
})

serviceContainer.innerHTML = getservices

// working add service function
serviceContainer.querySelectorAll(".service-btn").forEach((button) =>
   button.addEventListener("click", (event)=>{
    const currentUser = JSON.parse(localStorage.getItem("onlineUser"))
    if(!currentUser){
      alert("please log in")
  window.location.href = '../html/autho.html'
      return
    } else{

      
 // get price
 const serviceInfo = event.target.closest('.lists');
 const priceElement = serviceInfo.querySelector('.price');

 const clickedPrice = priceElement.dataset.id; // or parseFloat if needed
 if(displaypriceService){
  displaypriceService.value = clickedPrice
 }
 console.log("price..", clickedPrice)

 //  get service type
 const serviceInfoserviceType = event.target.closest('.lists');
 const getServiceType  = serviceInfoserviceType.querySelector('.title');
 const selectServiceTpye = getServiceType.dataset.id
if( DisplayServiceType){
  DisplayServiceType.value = selectServiceTpye
}
 console.log("select", selectServiceTpye)

// display service model
const bookingModelContainer = document.querySelector('.booking-model-container')
bookingModelContainer.classList.add("active")
getServicegModelForm()



    }
}))

// service form
function getServicegModelForm(){
  bookingModelForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    
    // booking data
  
    const bookingData = {
      id: Date.now(),
      name: CustomerFullName.value.trim(),
      Number: customerNumber.value.trim(),
      address: custAddress.value.trim(),
      national: customerNationality.value.trim(),
      serviceType: DisplayServiceType.value,
      price: displaypriceService.value,
      date: serviceDate.value,
      description: serviceDescription.value.trim(),
        status: "processing",
        from: "online"
    }
    

  // validate Somali number
  if (!isValidSomaliNumber(customerNumber.value.trim())) {
    Swal.fire({
      title: "Invalid Number!",
      text: `Please enter a valid Somali phone number`,
      icon: "error",
      confirmButtonText: "Ok"
    });
    return;
  }
      // ✅ Name validation
    if (!isValidName(CustomerFullName.value.trim())) {
      Swal.fire({
        title: "Invalid Name",
        text: "Please enter a valid name (letters only)",
        icon: "warning",
        confirmButtonText: "OK",
      });
   
      return;
    }

    //validate date  
 const selectedDate = new Date(dateService.value); // assuming `dateService.value` is in "YYYY-MM-DD"
const today = new Date();

today.setHours(0, 0, 0, 0);
selectedDate.setHours(0, 0, 0, 0);


if (selectedDate.getTime() !== today.getTime()) {
  alert(" date must be today .");
  return
}   
   
    if(CustomerFullName.value.trim( ) === "" || customerNumber.value.trim() === "" || custAddress.value.trim() === "" || displaypriceService.value.trim() === "" || DisplayServiceType.value.trim() === "" || serviceDate.value.trim() === "" || customerNationality.value.trim( ) === "" || serviceDescription.value.trim() === ""){
      Swal.fire({
        title: "Error!",
        text: `please fill all Inputs`,
        icon: "error",
        confirmButtonText: "ok"
    });
    return

    }
  
    //   // get  old data stored 
    //   const getData = JSON.parse(localStorage.getItem("customers")) || [];
    // getData.push(bookingData)
    //   console.log("allData", getData)
    //  localStorage.setItem("customers", JSON.stringify(getData))

    //  show success pop swel
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
  

    //  custFullName.value = ""
    //  customerNumber.value = ""
    //  custAddress.value = ""
    //  customerNationality.value = ""
    //  displaypriceService.value = ""
    //  DisplayServiceType.value = ""
    //  serviceDate.value = ""
    //  serviceDescription.value = ""
    
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

// service one
const service1 = document.querySelector(".service-1")
service1.classList.add("active")
service1.addEventListener("click", ()=>{
  const rigthSide =document.querySelector(".rigth-side")
  rigthSide.classList.add("active")
    document.querySelector(".image1").style.display = 'block'
    document.querySelector(".image2").style.display = 'none'
    document.querySelector(".image3").style.display = 'none'
    document.querySelector(".image4").style.display = 'none'
  document.querySelector(".title1").style.display = 'block'
  document.querySelector(".title3").style.display = 'none'
  document.querySelector(".title4").style.display = 'none'
      document.querySelector(".title2").style.display = 'none'
      document.querySelector(".lists2").style.display = 'none'
     document.querySelector(".lists1").style.display = 'block'
     document.querySelector(".lists2").style.display = 'none'
     document.querySelector(".lists3").style.display = 'none'
     document.querySelector(".lists4").style.display = 'none'
     //service
     document.querySelector(".service-4").classList.remove("active")
     document.querySelector(".service-2").classList.remove("active")
     document.querySelector(".service-3").classList.remove("active")
     document.querySelector(".service-1").classList.add("active")
  
  
      
})

//service 2
const service2 = document.querySelector(".service-2")
service2.addEventListener("click", ()=>{
  const rigthSide =document.querySelector(".rigth-side")
  rigthSide.classList.add("active")
  document.querySelector(".image2").style.display = 'block'
  document.querySelector(".image1").style.display = 'none'
  document.querySelector(".image3").style.display = 'none'
  document.querySelector(".image4").style.display = 'none'
  document.querySelector(".service-1").classList.remove("active")

  // titles
      document.querySelector(".title1").style.display = 'none'
      document.querySelector(".title2").style.display = 'block'
        document.querySelector(".title3").style.display = 'none'
        document.querySelector(".title4").style.display = 'none'
      //lists
  document.querySelector(".lists1").style.display = 'none'
     document.querySelector(".lists2").style.display = 'block'
     document.querySelector(".lists3").style.display = 'none'
     document.querySelector(".lists4").style.display = 'none'

    //  service
    document.querySelector(".service-4").classList.remove("active")
    document.querySelector(".service-2").classList.add("active")
    document.querySelector(".service-3").classList.remove("active")
    document.querySelector(".service-1").classList.remove("active")
  
})

// service 3

const service3 = document.querySelector(".service-3")
service3.addEventListener("click", ()=>{
  const rigthSide =document.querySelector(".rigth-side")
  rigthSide.classList.add("active")
  document.querySelector(".image2").style.display = 'none'
  document.querySelector(".image1").style.display = 'none'
  document.querySelector(".image3").style.display = 'block'
  document.querySelector(".image4").style.display = 'none'

      document.querySelector(".title1").style.display = 'none'
      document.querySelector(".title2").style.display = 'none'
      document.querySelector(".title3").style.display = 'block'
      document.querySelector(".title4").style.display = 'none'
      //lists
  document.querySelector(".lists1").style.display = 'none'
     document.querySelector(".lists2").style.display = 'none'
     document.querySelector(".lists3").style.display = 'block'
     document.querySelector(".lists4").style.display = 'none'
//service
     document.querySelector(".service-1").classList.remove("active")
     document.querySelector(".service-4").classList.remove("active")
     document.querySelector(".service-2").classList.remove("active")
     document.querySelector(".service-3").classList.add("active")
     document.querySelector(".service-1").classList.remove("active")
  
})

// service 4
const service4 = document.querySelector(".service-4")
service4.addEventListener("click", ()=>{
  const rigthSide =document.querySelector(".rigth-side")
  rigthSide.classList.add("active")
  document.querySelector(".image2").style.display = 'none'
  document.querySelector(".image1").style.display = 'none'
  document.querySelector(".image3").style.display = 'none'
  document.querySelector(".image4").style.display = 'block'

      document.querySelector(".title1").style.display = 'none'
      document.querySelector(".title2").style.display = 'none'
      document.querySelector(".title3").style.display = 'none'
      document.querySelector(".title4").style.display = 'block'
      //lists
  document.querySelector(".lists1").style.display = 'none'
     document.querySelector(".lists2").style.display = 'none'
     document.querySelector(".lists3").style.display = 'none'
     document.querySelector(".lists4").style.display = 'block'
//service
document.querySelector(".service-4").classList.add("active")
document.querySelector(".service-2").classList.remove("active")
document.querySelector(".service-3").classList.remove("active")
document.querySelector(".service-1").classList.remove("active")
  
})





}

