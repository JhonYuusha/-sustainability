document.addEventListener("DOMContentLoaded", () => {
  const btnAgendar = document.querySelector(".btn-confirmar-agendamento");

  const dataInput = document.getElementById("data");
  const horarioInput = document.getElementById("horario");
  const logradouroInput = document.getElementById("logradouro");
  const cepInput = document.getElementById("cep");
  const numeroInput = document.getElementById("numero");

  btnAgendar?.addEventListener("click", (e) => {
    e.preventDefault();
    removeMessages();

    const data = dataInput.value.trim();
    const horario = horarioInput.value.trim();
    const logradouro = logradouroInput.value.trim();
    const cep = cepInput.value.trim();
    const numero = numeroInput.value.trim();

    if (!logradouro || !numero || !cep || !data || !horario) {
      showError("Preencha todos os campos obrigatórios.");
      return;
    }

    const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const horarioRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    const dataMatch = data.match(dataRegex);
    const horarioValido = horarioRegex.test(horario);

    if (!dataMatch) {
      showError("Data inválida. Use o formato DD/MM/AAAA.");
      return;
    }

    if (!horarioValido) {
      showError("Horário inválido. Use o formato HH:MM.");
      return;
    }

    const dia = parseInt(dataMatch[1], 10);
    const mes = parseInt(dataMatch[2], 10) - 1;
    const ano = parseInt(dataMatch[3], 10);
    const dataDigitada = new Date(ano, mes, dia);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataDigitada < hoje) {
      showError("A data não pode ser no passado.");
      return;
    }

    const visitas = JSON.parse(localStorage.getItem("visitasAgendadas")) || [];
    visitas.push({ data, horario, logradouro, cep, numero });
    localStorage.setItem("visitasAgendadas", JSON.stringify(visitas));

    showSuccess("Visita agendada com sucesso!");

    // Limpa campos
    [dataInput, horarioInput, logradouroInput, cepInput, numeroInput].forEach(i => i.value = "");

    setTimeout(() => window.location.href = "dashboard.html", 1000);
  });

  function showError(mensagem) {
    const box = document.createElement("div");
    box.className = "error-box";
    box.innerHTML = `<span>${mensagem}</span><button class="close-error">&times;</button>`;
    document.body.appendChild(box);
    box.querySelector(".close-error").addEventListener("click", () => box.remove());
    setTimeout(() => box.remove(), 5000);
  }

  function showSuccess(mensagem) {
    const box = document.createElement("div");
    box.className = "success-box";
    box.innerHTML = `<span>${mensagem}</span><div class="loader"></div><button class="close-msg">&times;</button>`;
    document.body.appendChild(box);
    box.querySelector(".close-msg").addEventListener("click", () => box.remove());
    setTimeout(() => box.remove(), 5000);
  }

  function removeMessages() {
    document.querySelectorAll(".error-box, .success-box").forEach(e => e.remove());
  }
});