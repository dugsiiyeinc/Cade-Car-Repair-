const closeSidebar = document.querySelector("#closeSidebar");
const openSideToggle = document.querySelector("#open-side-toggle");
const sideBar = document.querySelector(".side-bar");
const userActive = document.querySelector("#user-active");
const userIcon = document.querySelector(".user-icon");
const sidebarLinks = document.querySelectorAll(".side-bar-links > *");

// dashboard changes tab handling
const dashboardTab = document.querySelector("#dashboard-tab");
const addCustTab = document.querySelector("#addCust-tab");
const CustomerTab = document.querySelector("#Customer-tab");
const cashTab = document.querySelector("#cash-tab");

const mainDashboard = document.querySelector("#dash-overveiw");
const addcustomerContainer = document.querySelector("#addcustomer-container");
const updatecustomerContainer = document.querySelector(
  "#updatecustomer-container"
);
const customerListContainer = document.querySelector(
  "#customer-list-container"
);
const cashContainer = document.querySelector("#cash-container");

// cash section handaling

let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
// const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

let showService = document.querySelector("#showService");
let showCustomer = document.querySelector("#showCustomer");
let showBalance = document.querySelector("#show-balance");

//form handaling
const customerForm = document.querySelector("#add-customer-form");
const custFullName = document.querySelector("#cust-fullName");
const custNumber = document.querySelector("#cust-Number");
const customerAddress = document.querySelector("#customer-address");
const custNationality = document.querySelector("#cust-Nationality");
const serviceType = document.querySelector("#service-type");
const price = document.querySelector("#price");
let dateService = document.querySelector("#date-service");
const ServiceDescription = document.querySelector("#description-service");

let editCustomerId = null;

// functions calling
window.onload = () => {
  showCustomerLists();
};

// calling addCustomerForm
customerForm.addEventListener("submit", addCustomerForm);

// openSideToggle functina

openSideToggle.addEventListener("click", () => {
  sideBar.classList.add("active");
});

// close-side-bar functionalty
closeSidebar.addEventListener("click", () => {
  sideBar.classList.remove("active");
});

// user Show
userIcon.addEventListener("click", () => {
  userActive.classList.toggle("active");
});

// sidebar links
sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebarLinks.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
  });
});

// create add customer data

function addCustomerForm(event) {
  event.preventDefault();

 
  const addCustomerData = {
    id: Date.now(),
    name: custFullName.value.trim(),
    Number: custNumber.value.trim(),
    address: customerAddress.value.trim(),
    national: custNationality.value.trim(),
    serviceType: serviceType.value.trim(),
    price: price.value.trim(),
    date: dateService.value.trim(),
    description: ServiceDescription.value.trim(),
    status: "processing",
    from: "manual",
  };
  console.log("addCustomerData..", addCustomerData);

  //   validate price
  if (price.value.trim() < 0) {
    const resultPrice = document.getElementById("resultPrice");

    resultPrice.innerHTML = "invalid price";
    resultPrice.style.color = "red";
    return;
  } else {
    //     resultPrice.innerHTML = ''
    // resultPrice.style.color = ''
  }

  // validate Somali number
  if (!isValidSomaliNumber(custNumber.value.trim())) {
    Swal.fire({
      title: "Invalid Number!",
      text: `Please enter a valid Somali phone number`,
      icon: "error",
      confirmButtonText: "Ok",
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
 //validate date  
 const selectedDate = new Date(dateService.value); // assuming `dateService.value` is in "YYYY-MM-DD"
const today = new Date();

today.setHours(0, 0, 0, 0);
selectedDate.setHours(0, 0, 0, 0);


if (selectedDate.getTime() !== today.getTime()) {
  alert(" date must be today .");
  return
}   
  saveTolocalStorage(addCustomerData);
}

//save tolocalstorage
function saveTolocalStorage(addCustomerData) {
  const getCustomer = getCustomerDataFromLocalStorage();
  console.log(" Before getCusPush", getCustomer);

  getCustomer.push(addCustomerData);
  console.log("after getCusPush", getCustomer);

  localStorage.setItem("customers", JSON.stringify(getCustomer));
  Swal.fire({
    title: "Add Customer successefuly!",
    // text: `Please enter a valid Somali phone number`,
    icon: "success",
    confirmButtonText: "Ok",
    cancelButtonText: "cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
      document.getElementById("customer-list-section").style.display = "block";
      showCustomerLists();
      recentCustmores();
    }
  });
  updateBalance();
  custFullName.value = "";
  custNumber.value = "";
  customerAddress.value = "";
  custNationality.value = "";
  serviceType.value = "";
  price.value = "";
  dateService.value = "";
  ServiceDescription.value = "";
}

// get data fromlocalstoraeg

function getCustomerDataFromLocalStorage() {
  const getCustomer = JSON.parse(localStorage.getItem("customers")) || [];

  return getCustomer;
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
const currentUser = JSON.parse(localStorage.getItem("onlineUser"));
console.log("cure,", currentUser);

if (currentUser && currentUser.firstName) {
  const userActive = (document.querySelector(
    "#user-active"
  ).textContent = `${currentUser.firstName}`);
}

const DashBoardlogOut = document.body.querySelector(".dash-logOut");
DashBoardlogOut.addEventListener("click", () => {
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
        window.location.href = "../html/autho.html";
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
});

// when click dashboad tab
dashboardTab.addEventListener("click", () => {
  console.log("cliked");
  changeTabs(dashboardTab, mainDashboard);
});

// when cliked addcustomer
addCustTab.addEventListener("click", () => {
  const currentUser = JSON.parse(localStorage.getItem("onlineUser"));
  if (!currentUser) {
    alert("please log in");
    window.location.href = "../html/autho.html";
    return;
  }
  changeTabs(addCustTab, addcustomerContainer);
});

// when cliked customer tab
CustomerTab.addEventListener("click", () => {
  const currentUser = JSON.parse(localStorage.getItem("onlineUser"));
  if (!currentUser) {
    alert("please log in");
    window.location.href = "../html/autho.html";
    return;
  }
  changeTabs(CustomerTab, customerListContainer);
});

// when cliked

// when cliked cash tab

cashTab.addEventListener("click", () => {
  const currentUser = JSON.parse(localStorage.getItem("onlineUser"));
  if (!currentUser) {
    alert("please log in");
    window.location.href = "../html/autho.html";
    return;
  }
  changeTabs(cashTab, cashContainer);
});

// change tabs function
function changeTabs(tab, container) {
  const tabs = [dashboardTab, addCustTab, CustomerTab, cashTab];
  const containers = [
    mainDashboard,
    addcustomerContainer,
    updatecustomerContainer,
    customerListContainer,
    cashContainer,
  ];

  tabs.forEach((currentTab) => {
    if (currentTab === tab) {
      containers.forEach((currentCon) => {
        if (currentCon == container) {
          container.style.display = "block";
          // headerTitle.textContent = tabTitle
        } else {
          currentCon.style.display = "none";
        }
      });
    } else {
      return;
    }
  });
}

// show customer lists

function showCustomerLists(searchKeyword = "") {
  const getData = JSON.parse(localStorage.getItem("customers")) || [];
  const tbody = document.querySelector("#table-body");
  tbody.innerHTML = "";
  const filteredData = getData.filter((customer) => {
    const nameMatch = customer.name
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    const numberMatch = customer.Number.includes(searchKeyword);
    return nameMatch || numberMatch;
  });
  //  let totalServices = 0;
  let totalPrice = 0;
  showCustomer.innerHTML = getData.length;

  filteredData.forEach((customer) => {
  

    // console.log("getd", customer)
    const currentUser = JSON.parse(localStorage.getItem("onlineUser"));
    // let status = "processing"
    //  showService.innerHTML = customer.serviceType.length

    const row = document.createElement("tr");

    const statusText =
      customer.status === "completed" ? "completed" : "processing";
    const isProcessing = customer.status === "processing";
    // totalPrice +=  parseFloat(customer.price) || 0;

    row.innerHTML = `
  
 <td>${currentUser.firstName}</td>
      <td>${customer.id}</td>
      <td>${customer.name}</td>
      <td>${customer.Number}</td>
      <td>${customer.address}</td>
      <td>${customer.national}</td>
     
      <td>${customer.serviceType}</td>
      <td <td class="${customer.from === 'online' ? 'from-online' : customer.from === 'manual' ? 'from-manual' : ''}">
  ${customer.from}
</td>

      <td  class="price-col">${customer.price}</td>
      <td>${customer.date}</td>
      <td>${customer.description}</td>

   <td 
  class="status-cell ${
    isProcessing ? "status-processing" : "status-completed"
  }" 
  data-id="${customer.id}"
>
  ${statusText}
</td>
    <td>
    <div class="flex-buttons">
      <button class="edit-btn edit" data-id="${customer.id}">Edit</button>
      <button class="delete-btn delete" data-id="${customer.id}">Delete</button>
    </div>
  </td>

      
   
     
  `;

    // Add click event to toggle status
    row.querySelector(".status-cell").addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");

      const updatedCustomers = getData.map((cust) => {
        if (cust.id == id) {
          cust.status =
            cust.status === "completed" ? "processing" : "completed";
        }
        return cust;
      });

      localStorage.setItem("customers", JSON.stringify(updatedCustomers));
      showCustomerLists(searchKeyword); // re-render the table
    });

    row.querySelector(".edit-btn").addEventListener("click", () => {
      document.getElementById("updatecustomer-container").style.display =
        "block";

      document.querySelector(".updatecustomer-container #cust-fullName").value =
        customer.name;
      document.querySelector(".updatecustomer-container #cust-Number").value =
        customer.Number;
      document.querySelector(
        ".updatecustomer-container #customer-address"
      ).value = customer.address;
      document.querySelector(
        ".updatecustomer-container #cust-Nationality"
      ).value = customer.national;
      document.querySelector(".updatecustomer-container #service-type").value =
        customer.serviceType;
      document.querySelector(".updatecustomer-container #price").value =
        customer.price;
      document.querySelector(" .updatecustomer-container #date-service").value =
        customer.date;
      document.querySelector(
        ".updatecustomer-container #description-service"
      ).value = customer.description;

      editCustomerId = customer.id; // save which customer is being edited

      document.getElementById("customer-list-container").style.display = "none";
    });

    // Handle delete button click
    row.querySelector(".delete-btn").addEventListener("click", (e) => {
      const idToDelete = e.target.getAttribute("data-id");

      // Filter out the customer with the matching ID
      const updatedData = getData.filter(
        (customer) => customer.id != idToDelete
      );

      // Save the new list to localStorage
      localStorage.setItem("customers", JSON.stringify(updatedData));
      window.location.reload();
      // Re-render the table
      showCustomerLists();
    });

    tbody.appendChild(row);
  });

  console.log("total price", totalPrice);
}

document
  .getElementById("search-input")
  .addEventListener("input", function (event) {
    const searchTerm = this.value;
    showCustomerLists(searchTerm);
  });

document
  .querySelector(".update-customer-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("upade ");
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    const updatedCustomer = {
      id: editCustomerId || Date.now(), // if new, assign ID
      name: document.querySelector(".updatecustomer-container #cust-fullName")
        .value,
      Number: document.querySelector(".updatecustomer-container #cust-Number")
        .value,
      address: document.querySelector(
        ".updatecustomer-container #customer-address"
      ).value,
      national: document.querySelector(
        ".updatecustomer-container #cust-Nationality"
      ).value,
      serviceType: document.querySelector(
        ".updatecustomer-container #service-type"
      ).value,
      price: document.querySelector(".updatecustomer-container #price").value,
      date: document.querySelector(".updatecustomer-container #date-service")
        .value,
      description: document.querySelector(
        ".updatecustomer-container #description-service"
      ).value,
      status: "processing", // keep status or fetch from previous if needed
    };

    let updatedList;

    if (editCustomerId) {
      // We're in edit mode – replace only the customer with the matching ID
      updatedList = customers.map((cust) => {
        return cust.id === editCustomerId
          ? { ...cust, ...updatedCustomer }
          : cust;
      });
    } else {
      // Add mode
      updatedList = [...customers, updatedCustomer];
    }

    localStorage.setItem("customers", JSON.stringify(updatedList));

    // Reset
    editCustomerId = null;
    this.reset();
    document.getElementById("updatecustomer-container").style.display = "none";
    showCustomerLists(); // Refresh table
    document.getElementById("customer-list-container").style.display = "block";
  });

// get incomes

function updateIncome() {
  const getData = JSON.parse(localStorage.getItem("customers")) || [];
  let totalPrice = 0;
  getData.forEach((customer) => {
    totalPrice += parseFloat(customer.price) || 0;
  });
  localStorage.setItem("totalIncome", totalPrice.toFixed(2));

  return totalPrice;
}

// Fetch DOM elements
let incomePrice = document.querySelector("#totlAmount");
let blance = document.querySelector("#balance-amount");
let expenditureValue = document.querySelector("#expenditure-value");



// Update balance function
updateBalance();
function updateBalance() {

  if(expenditureValue.value > blance.value){
  alert("innfeincet balance")
}
  const income = parseFloat(localStorage.getItem("totalIncome")) || 0;

  console.log("incomePrice", income);
  const expensesTotal = parseFloat(localStorage.getItem("currentExpense")) || 0;
  const balance = income - expensesTotal;

  incomePrice.innerText = income.toFixed(2);

  const showIcomeToDashoard = document.querySelector("#showIcome");
  showIcomeToDashoard.innerText = income.toFixed(2);

  expenditureValue.innerText = expensesTotal.toFixed(2);
  blance.innerText = balance.toFixed(2);

  localStorage.setItem("currentBalance", balance.toFixed(2));
}

// Modify element (edit or delete)
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let id = parseInt(parentDiv.getAttribute("data-id"));
  let name = parentDiv.querySelector(".product").innerText;
  let amount = parseFloat(parentDiv.querySelector(".amount").innerText);

  if (edit) {
    productTitle.value = name;
    userAmount.value = amount;
  }
  

  parentDiv.remove();

  // Get fresh expenses from localStorage
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = expenses.filter((exp) => exp.id !== id);

  // Update totals
  const existingExpense = parseFloat(expenditureValue.innerText) || 0;
  const newExpense = existingExpense - amount;

  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("currentExpense", newExpense.toFixed(2));

  updateBalance();
};

// Create expense item
function listCreator(
  expenseName,
  expenseValue,
  expenseId = Date.now(),
  save = true
) {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  sublistContent.setAttribute("data-id", expenseId);

  sublistContent.innerHTML = `
    <p class="product">${expenseName}</p>
    <p class="amount">${expenseValue}</p>`;

  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => modifyElement(editButton, true));

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => modifyElement(deleteButton));

  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);

  if (save) {
    // Get latest expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({
      id: expenseId,
      name: expenseName,
      value: parseFloat(expenseValue),
    });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    //  window.location.reload();
  }
}

// Add expense
checkAmountButton.addEventListener("click", () => {
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }

  const expenditure = parseFloat(userAmount.value);
   const currentBalance = parseFloat(localStorage.getItem("currentBalance")) || 0;

  // Check if expense is greater than current balance
  if (expenditure > currentBalance) {
    alert("you have insufficient funds");
    return false;
  }
  const existingExpense =
    parseFloat(localStorage.getItem("currentExpense")) || 0;
  const newExpense = existingExpense + expenditure;

  localStorage.setItem("currentExpense", newExpense.toFixed(2));

  listCreator(productTitle.value, userAmount.value);

  updateBalance();

  productTitle.value = "";
  userAmount.value = "";
});

// On page load
window.addEventListener("DOMContentLoaded", () => {
  const totalIncome = updateIncome(); // Recalculate and store totalIncome
  incomePrice.innerText = totalIncome.toFixed(2);

  const savedExpense = parseFloat(localStorage.getItem("currentExpense")) || 0;
  expenditureValue.innerText = savedExpense.toFixed(2);
  const showExpenses = document.querySelector("#show-online-booking");
  showExpenses.innerText = savedExpense.toFixed(2);

  const balance = totalIncome - savedExpense;
  blance.innerText = balance.toFixed(2);
  showBalance.innerHTML = blance.innerText;
  localStorage.setItem("currentBalance", balance.toFixed(2));

  // 💥💥 Re-fetch expenses inside DOMContentLoaded!
  const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  storedExpenses.forEach((exp) => {
    listCreator(exp.name, exp.value, exp.id, false);
  });
  updateBalance();
});

// 10 last recent customer function
recentCustmores();

function recentCustmores() {
  const getCustomer = JSON.parse(localStorage.getItem("customers"));

  const displayRecentCustmers = document.querySelector("#RecentCutomer-tbody");
  const recentCustmer = getCustomer.slice(-5).reverse();
  console.log("recentCustomer, ", recentCustmer);

  recentCustmer.forEach((cust) => {
    const tbody = document.createElement("tr");
    const statusText = cust.status === "completed" ? "completed" : "processing";
    const isProcessing = cust.status === "processing";

    tbody.innerHTML = `
   <td>${cust.id}</td>
      <td>${cust.name}</td>
      <td>${cust.Number}</td>
      <td>${cust.address}</td>
      <td>${cust.national}</td>
      <td>${cust.serviceType}</td>
      <td>${cust.from}</td>
      <td  class="price-col">${cust.price}</td>
      <td>${cust.date}</td>
   <td 
  class="status-cell ${
    isProcessing ? "status-processing" : "status-completed"
  }" 
  data-id="${cust.id}"
>
  ${statusText}
</td>
   

 `;

    displayRecentCustmers.appendChild(tbody);
  });
}
