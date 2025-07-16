document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const userInput = document.getElementById("user").value.trim().toLowerCase();
      const password = document.getElementById("password").value.trim();

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const validUser = users.find(user =>
        (user.email.toLowerCase() === userInput || formatarCPF(user.cpf) === formatarCPF(userInput)) &&
        user.password === password
      );

      if (validUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        window.location.href = "dashboard.html";
      } else {
        showError("Email/CPF ou senha inválidos!");
      }
    });
  }

  function formatarCPF(cpf) {
    return cpf.replace(/\D/g, '').padStart(11, "0");
  }

  function showError(message) {
    const existing = document.querySelector(".error-box");
    if (existing) existing.remove();

    const box = document.createElement("div");
    box.className = "error-box";
    box.innerHTML = `
      <span>${message}</span>
      <button class="close-error">&times;</button>
    `;
    document.body.appendChild(box);

    document.querySelector(".close-error").onclick = () => {
      box.remove();
    };

    setTimeout(() => {
      box.remove();
    }, 5000);
  }
});