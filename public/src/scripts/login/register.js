$('#register-button').click(registerUser);

function registerUser (event) {
    event.preventDefault();

    let name = $('#register-user-name').val();
    let email = $('#register-user-email').val();
    let password = $('#register-user-password').val();
    let confirmPass = $('#confirm-user-password').val();

     if (password === confirmPass) {
       firebase.auth().createUserWithEmailAndPassword(email, password)
         .then(function (response) {
           let userId = response.user.uid;
           firebase.database().ref(`users/${userId}`).set({
             name,
             email
           }).then(function () {
             window.location = `places.html?id=${userId}`;
           })
         })
         .catch(function (error) {
           let errorMessage = error.message;
           if (errorMessage == 'auth/weak-password') {
             alert('Erro: a senha é muito fraca.');
           } else {
             alert(`Erro: ${errorMessage}`);
           }
         })
     } else {
       alert('Senhas digitadas não correspondem entre si. Digite novamente.');
     }
}

