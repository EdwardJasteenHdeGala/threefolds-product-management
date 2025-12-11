let products = [];

fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    populateSuggestions();
    filterProducts();
  });

function renderProducts(list) {
  const table = document.getElementById("productTable");
  table.innerHTML = "";

  list.forEach(p => {
    const row = document.createElement("tr");
    const logoPath = `assets/logos/${p.brand}/logo.png`;

    row.innerHTML = `
      <td><img src="${logoPath}" alt="${p.brand} logo" style="height:32px; margin-right:8px;"> ${p.name}</td>
      <td>${p.sku}</td>
      <td>${p.category}</td>
      <td>${p.quantity}</td>
      <td>₱${p.price.toLocaleString()}</td>
      <td>${p.manufacture}</td>
      <td>${p.expiration}</td>
      <td><a href="product.html" onclick='localStorage.setItem("selectedProduct", JSON.stringify(${JSON.stringify(p)}))'>View</a></td>
    `;
    table.appendChild(row);
  });
}

function filterProducts() {
  const query = document.getElementById("search")?.value.toLowerCase() || "";
  const sortValue = document.getElementById("sort")?.value;

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.sku.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query)
  );

  if (sortValue === "nameAZ") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "nameZA") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortValue === "skuAZ") {
    filtered.sort((a, b) => a.sku.localeCompare(b.sku));
  } else if (sortValue === "skuZA") {
    filtered.sort((a, b) => b.sku.localeCompare(a.sku));
  } else if (sortValue === "quantityLowHigh") {
    filtered.sort((a, b) => a.quantity - b.quantity);
  } else if (sortValue === "quantityHighLow") {
    filtered.sort((a, b) => b.quantity - a.quantity);
  } else if (sortValue === "priceLowHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "priceHighLow") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === "manufactureNewest") {
    filtered.sort((a, b) => new Date(b.manufacture) - new Date(a.manufacture));
  } else if (sortValue === "expirationSoonest") {
    filtered.sort((a, b) => new Date(a.expiration) - new Date(b.expiration));
  }

  renderProducts(filtered);
}

function populateSuggestions() {
  const datalist = document.getElementById("productSuggestions");
  datalist.innerHTML = "";

  const names = products.map(p => p.name).sort((a, b) => a.localeCompare(b));
  names.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  });
}

document.getElementById("search")?.addEventListener("input", filterProducts);
document.getElementById("sort")?.addEventListener("change", filterProducts);
