
saveCurrentMonthIncome()
function saveCurrentMonthIncome() {
  // Get the total income from localStorage
  const serviceCustomers = JSON.parse(localStorage.getItem("customers")) || 0;
  console.log("serviceCustomers, ", serviceCustomers.length)
  // serviceCustomers.forEach(cust =>{
  //   console.log("cus, ", cust)
  // })

  // Retrieve or initialize the monthly income data
  const monthlyIncome = JSON.parse(localStorage.getItem("monthlyService")) || {};

  // Get the current month
  const currentDate = new Date();
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const currentMonth = monthNames[currentDate.getMonth()];

  // Update the current month's income with the new totalIncome
  monthlyIncome[currentMonth] = serviceCustomers.length;

  // Save updated monthly income back to localStorage
  localStorage.setItem("monthlyService", JSON.stringify(monthlyIncome));
}



const serviceChart = document.getElementById('service-chart');

// Fetch saved monthly income
const monthlyService = JSON.parse(localStorage.getItem("monthlyService")) || {};

// List of months
const Months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// Prepare the balance for the chart by getting monthly income for each month
const Services = Months.map(month => monthlyService[month] || 0);

// Create the chart
new Chart(serviceChart, {
  type: 'bar',
  data: {
    labels: Months,
    datasets: [{
      label: 'Monthly register services',
      data: Services,
      borderWidth: 1,
      backgroundColor: '#587ef4'
    }]
  },
  // options: {
  //   responsive: true
  // }
});




