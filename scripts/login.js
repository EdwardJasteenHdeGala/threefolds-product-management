document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      alert("Login successful!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials!");
    }
  });
});
