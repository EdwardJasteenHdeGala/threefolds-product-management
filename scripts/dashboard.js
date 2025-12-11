document.addEventListener("DOMContentLoaded", () => {
  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {
      const topProducts = products
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 8);

      const labels = topProducts.map(p => p.name);
      const data = topProducts.map(p => p.quantity);

      const ctx = document.getElementById("stockChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Stock Quantity",
            data: data,
            backgroundColor: "#6A0F1A",
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Top Dog Food Products by Stock"
            }
          }
        }
      });
    })
    .catch(err => console.error("Error loading dashboard data:", err));
});
