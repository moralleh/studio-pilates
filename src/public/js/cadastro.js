//Validação de CPF
function validarCPF() {
  let cpf = document.getElementById('cpf').value;
  let digitsOnly = '';

  // Verifica se dentro do cpf só tem números
  for (let i = 0; i < cpf.length; i++) {
    if (!isNaN(cpf[i]) && cpf[i] !== ' ') {
      digitsOnly += cpf[i];
    }
  }
  cpf = digitsOnly;

  // Verifica se cpf tem 11 números
  if (cpf.length !== 11) {
    mostrarErro('CPF deve ter 11 números');
    return false;
  }

  // Verifica se os números são tds iguais
  function todosDigitosIguais(cpf) {
    for (let i = 1; i < cpf.length; i++) {
      if (cpf[i] !== cpf[0]) {
        return false;
      }
    }
    return true;
  }
  if (todosDigitosIguais(cpf)) {
    mostrarErro('CPF inválido (todos os dígitos são iguais)');
    return false;
  }

  let soma = 0;
  let resto;
  
  // Algoritmo de validação de cpf 
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== parseInt(cpf.charAt(9))) {
    mostrarErro('CPF inválido');
    return false;
  }

  soma = 0;

  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== parseInt(cpf.charAt(10))) {
    mostrarErro('CPF inválido');
    return false;
  }

  esconderErro();
  return true;
}

function mostrarErro(mensagem) {
  let cpfError = document.getElementById('cpfError');
  cpfError.style.display = 'block';
  cpfError.textContent = mensagem;
}

function esconderErro() {
  let cpfError = document.getElementById('cpfError');
  cpfError.style.display = 'none';
}

// Máscara para CPF ao digitar
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#cpf');

  input.addEventListener('keypress', (e) => {
    if (input.value.length >= 14) {
      e.preventDefault();
      return;
    }
    let inputLength = input.value.length;

    if (inputLength === 3 || inputLength === 7) {
      input.value += '.';
    } else if (inputLength === 11) {
      input.value += '-';
    }
  });
});

// Máscara para Celular ao digitar
document.addEventListener('DOMContentLoaded', () => {
  const inputCelular = document.querySelector('#celular');

  inputCelular.addEventListener('input', () => {
    let value = inputCelular.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    // Aplica a máscara passo a passo com base no valor puro
    if (value.length > 0 && value.length <= 2) {
      value = '(' + value;
    } else if (value.length > 2 && value.length <= 7) {
      value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
    } else if (value.length > 7) {
      value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7, 11);
    }

    // Limita a 15 caracteres formatados: (00) 00000-0000
    inputCelular.value = value.slice(0, 15);
  });
});
function validarFormularioCompleto() {
  return validarCPF();
}

function enviarFormulario() {
  const form = document.getElementById('formCadastro');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validarFormularioCompleto()) {
      return; // para o envio se CPF inválido
    }

    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());

    fetch('/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    })
    .then(res => {
      if (res.ok) {
        alert('Cadastro realizado com sucesso!');
        form.reset();
        window.location.href = '/login';  // redireciona para a tela de login
      } else {
        alert('Erro no cadastro.');
      }
    })
    .catch(() => alert('Erro na conexão.'));
  });
}

// Chama para ativar o envio via fetch
document.addEventListener('DOMContentLoaded', () => {
  enviarFormulario();
});