document.addEventListener("DOMContentLoaded", () => {
  // Load product from localStorage or fallback
  const product = JSON.parse(localStorage.getItem("selectedProduct")) || {
    name: "Pedigree Adult Complete Nutrition",
    sku: "DOG-PED-001",
    brand: "Pedigree",
    category: "Dog Food",
    quantity: 100,
    price: 1250,
    description: "Complete nutrition for adult dogs."
  };

  // Populate fields
  document.getElementById("name").value = product.name;
  document.getElementById("sku").value = product.sku;
  document.getElementById("brand").value = product.brand;
  document.getElementById("category").value = product.category;
  document.getElementById("quantity").value = product.quantity;
  document.getElementById("price").value = product.price;
  document.getElementById("description").value = product.description;

  // Function to update logo
  function updateLogo(brand) {
    const logoPath = `assets/logos/${brand}/logo.png`;
    document.getElementById("product-logo").src = logoPath;
  }

  // Initial logo
  updateLogo(product.brand);

  // Update logo when brand field changes
  document.getElementById("brand").addEventListener("input", e => {
    updateLogo(e.target.value);
  });

  // Save changes
  document.getElementById("saveBtn").addEventListener("click", () => {
    const updatedProduct = {
      name: document.getElementById("name").value,
      sku: document.getElementById("sku").value,
      brand: document.getElementById("brand").value,
      category: document.getElementById("category").value,
      quantity: parseInt(document.getElementById("quantity").value),
      price: parseFloat(document.getElementById("price").value),
      description: document.getElementById("description").value
    };

    localStorage.setItem("selectedProduct", JSON.stringify(updatedProduct));
    updateLogo(updatedProduct.brand);
    alert("Product saved locally!");
  });
});
