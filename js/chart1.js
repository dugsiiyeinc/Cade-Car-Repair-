
// saveCurrentMonthService()
// function saveCurrentMonthService () {
//   const serviceCustomers = JSON.parse(localStorage.getItem("customers")) || [];
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth(); // 0 - 11
//   const currentYear = currentDate.getFullYear();

//   const newThisMonth = serviceCustomers.filter(cust => {
//     if (!cust.createdAt) return false;
//     const createdAtDate = new Date(cust.createdAt);
//     return createdAtDate.getMonth() === currentMonth && createdAtDate.getFullYear() === currentYear;
//   });
// //
//   const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
//   const monthKey = monthNames[currentMonth];

//   const monthlyIncome = JSON.parse(localStorage.getItem("monthlyService")) || {};
//   monthlyIncome[monthKey] = newThisMonth.length;

//   localStorage.setItem("monthlyService", JSON.stringify(monthlyIncome));
// }

// const serviceChart = document.getElementById('service-chart');
// const monthlyService = JSON.parse(localStorage.getItem("monthlyService")) || {};
// const Months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
// const Services = Months.map(month => monthlyService[month] || 0);

// new Chart(serviceChart, {
//   type: 'bar',
//   data: {
//     labels: Months,
//     datasets: [{
//       label: 'Monthly register services',
//       data: Services,
//       borderWidth: 1,
//       backgroundColor: '#587ef4'
//     }]
//   },
//     options: {
//     responsive: true,
//     animation: false,
//     transitions: {
//       active: { animation: false },
//       show: { animation: false },
//       hide: { animation: false }
//     }
//   }
// });

let serviceChartInstance; // Global variable to hold the chart

function saveCurrentMonthService() {
  const serviceCustomers = JSON.parse(localStorage.getItem("customers")) || [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
=======


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


  // Create a new chart
  serviceChartInstance = new Chart(ctx, {
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
     options: {
        animation: false,
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    drag: {
                        enabled: true,
                    },
                    mode: 'xy',
                    animation: {
                        duration: 0, // disable zoom animation
                    }
                }
            }
        }
    }
  });
}

// Initialize on first load
saveCurrentMonthService();

window.onload = function() {
  saveCurrentMonthService();
};

