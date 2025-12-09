function mostrarSenha() {
  const senhaInput = document.getElementById('exampleInputPassword1');
  senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
}
