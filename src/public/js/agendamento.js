document.addEventListener("DOMContentLoaded", function () {
  const dataInput = document.getElementById("data");
  const formulario = document.getElementById("formulario");
  const mensagem = document.getElementById("mensagem");

  function pegarDataDeHoje() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  }

  function getDayFromInputDate(value) {
    const partes = value.split("-");
    return new Date(partes[0], partes[1] - 1, partes[2]).getDay();
  }

  if (dataInput) {
    dataInput.min = pegarDataDeHoje();
    dataInput.value = pegarDataDeHoje();
  }

  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      if (!dataInput.value) return; // se vazio, não valida aqui

      const ano = Number(dataInput.value.split("-")[0]);
      const diaSemana = getDayFromInputDate(dataInput.value);

      if (ano > 2025 || diaSemana === 0) {
        e.preventDefault();
        mensagem.textContent = "Data inválida. Escolha um dia útil até o ano de 2025.";
      } else {
        mensagem.textContent = "";
      }
    });
  }
});

// Exibe mensagem de sucesso ou erro no agendamento
document.addEventListener('DOMContentLoaded', () => {
  const sucessoMsg = document.getElementById('sucesso-msg');
  const erroMsg = document.getElementById('erro-msg');

  // Desaparece após 5 segundos
  if (sucessoMsg) {
    setTimeout(() => {
      sucessoMsg.classList.add('fade-out');
    }, 5000);
  }

  if (erroMsg) {
    setTimeout(() => {
      erroMsg.classList.add('fade-out');
    }, 5000);
  }
});


