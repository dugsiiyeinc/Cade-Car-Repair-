
const closeSidebar = document.querySelector("#closeSidebar")
const openSideToggle = document.querySelector("#open-side-toggle")
const sideBar = document.querySelector(".side-bar")
const userActive = document.querySelector("#user-active")
const userIcon = document.querySelector(".user-icon")
const sidebarLinks = document.querySelectorAll(".side-bar-links > *");

// dashboard changes tab handling
const dashboardTab = document.querySelector("#dashboard-tab")
const addCustTab = document.querySelector("#addCust-tab")
const CustomerTab = document.querySelector("#Customer-tab")
const cashTab = document.querySelector("#cash-tab")
const mainDashboard= document.querySelector("#dash-overveiw")
const addcustomerContainer = document.querySelector("#addcustomer-container")
const updatecustomerContainer = document.querySelector("#updatecustomer-container")
const customerListContainer = document.querySelector("#customer-list-container")
const cashContainer = document.querySelector("#cash-container")



//form handaling
const customerForm = document.querySelector("#add-customer-form")
const custFullName = document.querySelector("#cust-fullName")
const custNumber = document.querySelector("#cust-Number")
const customerAddress = document.querySelector("#customer-address")
const custNationality = document.querySelector("#cust-Nationality")
const serviceType = document.querySelector("#service-type")
const price = document.querySelector("#price")
let dateService = document.querySelector("#date-service")
const ServiceDescription = document.querySelector("#description-service")




// calling addCustomerForm
customerForm.addEventListener("submit", addCustomerForm)


// openSideToggle functina

openSideToggle.addEventListener("click", ()=>{
 sideBar.classList.add("active")
})

// close-side-bar functionalty
closeSidebar.addEventListener("click", ()=>{
    sideBar.classList.remove("active")
})

// user Show
userIcon.addEventListener("click", ()=>{
    userActive.classList.toggle("active")
})

// sidebar links
sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
        sidebarLinks.forEach(link => link.classList.remove("active"));
        link.classList.add("active");
    })
})


// create add customer data 

function addCustomerForm(event){
   
       event.preventDefault()

    //    date formating
//      const now =new Date();
// const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
// console.log(formatted); // Example: "2025-03-28 14:45:30"

     const addCustomerData ={
        id: Date.now(),
        name: custFullName.value.trim(),
        number: custNumber.value.trim(),
        address: customerAddress.value.trim(),
        national: custNationality.value.trim(),
        serviceType: serviceType.value.trim(),
        price: price.value.trim(),
        date: dateService.value.trim(),
        description: ServiceDescription.value.trim()
     }
     console.log("addCustomerData..", addCustomerData)

//   validate price
if(price.value.trim() <0){
    const resultPrice = document.getElementById('resultPrice')

resultPrice.innerHTML = 'invalid price'
resultPrice.style.color = 'red'
    return
}else{
//     resultPrice.innerHTML = ''
// resultPrice.style.color = ''
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



     saveTolocalStorage(addCustomerData)

}

//save tolocalstorage
 function saveTolocalStorage(addCustomerData){
    const getCustomer  = getCustomerDataFromLocalStorage()
    console.log(" Before getCusPush", getCustomer)

    getCustomer.push(addCustomerData)
    console.log("after getCusPush", getCustomer)

    localStorage.setItem("customers",JSON.stringify(getCustomer)) 
    Swal.fire({
        title: "confirmed successefuly!",
        // text: `Please enter a valid Somali phone number`,
        icon: "success",
        confirmButtonText: "Ok",
        cancelButtonText: "cancel"
      });
    custFullName.value = ""
    custNumber.value = ""
    customerAddress.value = ""
    custNationality.value = ""
    serviceType.value = ""
    price.value = ""
    dateService.value = ""
    ServiceDescription.value = ""
 }

// get data fromlocalstoraeg

function getCustomerDataFromLocalStorage(){
    const getCustomer = JSON.parse(localStorage.getItem("customers")) || []

    return getCustomer
}

// valid number
function isValidSomaliNumber(number) {
    const regex = /^(?:252|0)?(61|62|63|64|65|66|67|68|69|90)\d{7}$/;
    return regex.test(number);
  }

// valid name
function isValidName(name) {
    const regex = /^[a-zA-Z\s'-]{4,}$/;
    return regex.test(name);
  }


  //  user login in allow to make service
const currentUser = JSON.parse(localStorage.getItem("onlineUser"))
console.log("cure,", currentUser)

if(currentUser && currentUser.firstName){
    const userActive = document.querySelector("#user-active").textContent = `${currentUser.firstName}`
}

const DashBoardlogOut = document.body.querySelector(".dash-logOut")
DashBoardlogOut.addEventListener("click", ()=>{
localStorage.removeItem("onlineUser")

window.location.href = '../html/autho.html'

})

// when click dashboad tab
dashboardTab.addEventListener("click", ()=>{
  console.log("cliked")
 changeTabs(dashboardTab , mainDashboard)
})

// when cliked addcustomer
addCustTab.addEventListener("click", ()=>{

  changeTabs(addCustTab, addcustomerContainer)
})

// when cliked customer tab
CustomerTab.addEventListener("click", ()=>{
  changeTabs(CustomerTab, customerListContainer)
})

// when cliked cash tab

cashTab.addEventListener("click", ()=>{
  changeTabs(cashTab , cashContainer)
})


// change tabs function
function changeTabs(tab, container) {
  const tabs = [dashboardTab, addCustTab, CustomerTab, cashTab ];
  const containers = [mainDashboard, addcustomerContainer, updatecustomerContainer, customerListContainer, cashContainer];

  tabs.forEach(currentTab => {

      if (currentTab === tab) {

          containers.forEach(currentCon => {
              if (currentCon == container) {
                  container.style.display = "block";
                  // headerTitle.textContent = tabTitle

              } else {
                  currentCon.style.display = "none";
              }

          })
      } else {
          return;
      }
  });
}



       
  









