
saveCurrentMonthIncome()
function saveCurrentMonthIncome() {
  // Get the total income from localStorage
  const totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
  console.log("total", totalIncome);

  // Retrieve or initialize the monthly income data
  const monthlyIncome = JSON.parse(localStorage.getItem("monthlyIncome")) || {};

  // Get the current month
  const currentDate = new Date();
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const currentMonth = monthNames[currentDate.getMonth()];

  // Update the current month's income with the new totalIncome
  monthlyIncome[currentMonth] = totalIncome;

  // Save updated monthly income back to localStorage
  localStorage.setItem("monthlyIncome", JSON.stringify(monthlyIncome));
}



const Earning = document.getElementById('Earning-chart');

// Fetch saved monthly income
const monthlyIncome = JSON.parse(localStorage.getItem("monthlyIncome")) || {};

// List of months
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// Prepare the balance for the chart by getting monthly income for each month
const balance = months.map(month => monthlyIncome[month] || 0);

// Create the chart
new Chart(Earning, {
  type: 'bar',
  data: {
    labels: months,
    datasets: [{
      label: 'Monthly Income',
      data: balance,
      borderWidth: 1,
      backgroundColor: '#587ef4'
    }]
  },
  options: {
    responsive: true
  }
});
