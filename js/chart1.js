
let serviceChartInstance; // Global variable to hold the chart

function saveCurrentMonthService() {
  const serviceCustomers = JSON.parse(localStorage.getItem("customers")) || [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();



  const newThisMonth = serviceCustomers.filter(cust => {
    if (!cust.createdAt) return false;
    const createdAtDate = new Date(cust.createdAt);
    return createdAtDate.getMonth() === currentMonth && createdAtDate.getFullYear() === currentYear;
  });

  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const monthKey = monthNames[currentMonth];

  const monthlyIncome = JSON.parse(localStorage.getItem("monthlyService")) || {};
  monthlyIncome[monthKey] = newThisMonth.length;

  localStorage.setItem("monthlyService", JSON.stringify(monthlyIncome));

  // Update chart after saving data
  updateServiceChart();
}

function updateServiceChart() {
  const ctx = document.getElementById('service-chart').getContext('2d');
  const monthlyService = JSON.parse(localStorage.getItem("monthlyService")) || {};
  const Months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const Services = Months.map(month => monthlyService[month] || 0);

  // Destroy the previous chart if it exists
  if (serviceChartInstance) {
    serviceChartInstance.destroy();
  }

  serviceChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Months,
      datasets: [{
        label: 'Monthly Register Services',
        data: Services,
        backgroundColor: '#587ef4',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      animation: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        zoom: {
          pan: { enabled: false },
          zoom: { enabled: false }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}






function saveCurrentMonthIncome() {
  const totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
  const monthlyIncome = JSON.parse(localStorage.getItem("monthlyIncome")) || {};
  const currentDate = new Date();
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const currentMonth = monthNames[currentDate.getMonth()];
  monthlyIncome[currentMonth] = totalIncome;
  localStorage.setItem("monthlyIncome", JSON.stringify(monthlyIncome));
}

function renderIncomeChart() {
  const ctx = document.getElementById('Earning-chart').getContext('2d');
  const monthlyIncome = JSON.parse(localStorage.getItem("monthlyIncome")) || {};
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const balance = months.map(month => monthlyIncome[month] || 0);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: 'Monthly Income',
        data: balance,
        backgroundColor: '#587ef4',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      animation: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        zoom: {
          pan: { enabled: false },
          zoom: { enabled: false }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


 saveCurrentMonthService();
  saveCurrentMonthIncome();
  updateServiceChart();
  renderIncomeChart();

// window.onload = function () {
//   saveCurrentMonthService();
//   saveCurrentMonthIncome();
//   updateServiceChart();
//   renderIncomeChart();
// };
