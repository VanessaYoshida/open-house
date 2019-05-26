$(document).ready(function() {
  function login(event) {
    event.preventDefault();
    let email = $('#user-email').val();
    let password = $('#user-password').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        window.location = `places.html?id=${response.user.uid}`;
      })
      .catch(() => {
        if (email === '') {
          $('#invalid-email').html('O campo não pode ficar vazio.');
        } else if (email.search('@') === -1) {
          $('#invalid-email').html('O formato de e-mail está inválido. \n Exemplo: usuario@gmail.com');      
        } else {
          $('#invalid-email').html('');
        } 
        if (password === '') {
          $('#invalid-email-password').html('O campo não pode ficar vazio.');
        } else {
          $('#invalid-email-password').html('E-mail ou senha inválidos.');
        }
      });   
  }
  $('#enter-button').click(login);
  $('#forget-password').click(() => {
    window.location = 'password.html';
  });
  $('#exit').click(event => {
    event.preventDefault();
    firebase.auth().signOut().then(() =>{
      window.location = 'index.html';
    }).catch(error => {
      alert('Erro: ' + error);
    });
  });
});