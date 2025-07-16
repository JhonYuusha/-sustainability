document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaHistorico");
  const visitas = JSON.parse(localStorage.getItem("visitasAgendadas")) || [];

  if (visitas.length === 0) {
    lista.innerHTML = "<p style='color:white;'>Nenhuma visita agendada até o momento.</p>";
    return;
  }

  visitas.forEach((visita, index) => {
    const div = document.createElement("div");
    div.className = "card-visita";
    div.innerHTML = `
      <div>
        <strong>Data:</strong> ${visita.data} <br/>
        <strong>Horário:</strong> ${visita.horario} <br/>
        <strong>Endereço:</strong> ${visita.logradouro}, nº ${visita.numero} - CEP: ${visita.cep}
      </div>
      <button class="cancelar-btn" title="Cancelar" data-index="${index}">&times;</button>
    `;
    lista.appendChild(div);
  });

  document.querySelectorAll(".cancelar-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      visitas.splice(index, 1);
      localStorage.setItem("visitasAgendadas", JSON.stringify(visitas));
      showSuccess("Visita cancelada com sucesso!");
      setTimeout(() => location.reload(), 600);
    });
  });

  function showSuccess(mensagem) {
    const box = document.createElement("div");
    box.className = "success-box";
    box.innerHTML = `
      <span>${mensagem}</span>
      <div class="loader"></div>
      <button class="close-msg">&times;</button>
    `;
    document.body.appendChild(box);
    box.querySelector(".close-msg").addEventListener("click", () => box.remove());
    setTimeout(() => box.remove(), 5000);
  }
});