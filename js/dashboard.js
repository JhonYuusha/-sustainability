document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const saldoEl = document.getElementById("saldo");
  const nameEl = document.getElementById("username");
  const cpfEl = document.getElementById("cpf");

  if (!user || !user.email || !user.cpf) {
    alert("Você precisa estar logado.");
    window.location.href = "index.html";
    return;
  }
  const nomeUsuario = user.email.split("@")[0];
  nameEl.textContent = formatarNome(nomeUsuario);

  const saldo = typeof user.saldo === "number" ? user.saldo : 0;
  saldoEl.textContent = `R$ ${saldo.toFixed(2).replace(".", ",")}`;

  if (cpfEl) {
    cpfEl.textContent = formatarCPF(user.cpf);
  }

  function formatarNome(nome) {
    if (!nome) return "";
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  }

  function formatarCPF(cpf) {
    const clean = cpf.replace(/\D/g, "").padStart(11, "0");
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  document.querySelectorAll(".bottom-nav button")[1]?.addEventListener("click", () => {
  window.location.href = "agendar.html";
});
  const historicoBtn = document.querySelector(".history-btn");
  if (historicoBtn) {
    historicoBtn.addEventListener("click", () => {
      window.location.href = "historico.html";
    });
  }
});