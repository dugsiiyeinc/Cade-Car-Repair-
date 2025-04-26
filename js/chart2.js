
saveCurrentMonthIncome()
function saveCurrentMonthIncome() {
  const totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
console.log("total", totalIncome)
  const monthlyIncome = JSON.parse(localStorage.getItem("monthlyIncome")) || {};

  const currentDate = new Date();
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const currentMonth = monthNames[currentDate.getMonth()];

  if (!monthlyIncome[currentMonth]) {
    monthlyIncome[currentMonth] = totalIncome;
    localStorage.setItem("monthlyIncome", JSON.stringify(monthlyIncome));
  }
}


const Earning = document.getElementById('Earning-chart');

// Fetch saved monthly income
const monthlyIncome = JSON.parse(localStorage.getItem("monthlyIncome")) || {};

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// Prepare the balance for the chart
const balance = months.map(month => monthlyIncome[month] || 0);

// Create Chart
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
