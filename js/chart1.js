const service = {
  jan: 2,
  feb: 100,
  mar: 20,
  apr: 30,

}





const ctx = document.getElementById('service-chart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(service),
    datasets: [{
      label: ' services',
      data: Object.values(service),
    
    }]
  },
  options: {
  responsive: true
  }
});




