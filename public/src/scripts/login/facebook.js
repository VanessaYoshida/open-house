$(document).ready(function() {
	$("#facebook-button").click((event) => {
		event.preventDefault();
		
		const provider = new firebase.auth.FacebookAuthProvider().addScope('user_friends');
		const url = `https://graph.facebook.com/v2.11/`;

		firebase.auth().signInWithPopup(provider)
		.then((response) => {
			const access_token = "";
			console.log("login ", response);
			fetch (`${url}/${response.user.uid}/?fields=friends{name,id}&access_token=${access_token}`)
			.then ((response) => { 
				window.location = "post.html?id="+ response.user.uid;
			})
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = error.credential;
			alert(errorCode, errorMessage, email, credential);
		});
	})
});		

