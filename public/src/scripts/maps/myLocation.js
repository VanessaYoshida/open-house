window.onload = function () {
    getLocation();
}

const locationUser = document.getElementById("demo");

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        locationUser.innerHTML = "A geolocalização não é suportada neste browser.";
    }
}

const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lng);
}

// function showError(error)
//   {
//   switch(error.code)
//     {
//     case error.PERMISSION_DENIED:
//       x.innerHTML="Usuário rejeitou a solicitação de Geolocalização."
//       break;
//     case error.POSITION_UNAVAILABLE:
//       x.innerHTML="Localização indisponível."
//       break;
//     case error.TIMEOUT:
//       x.innerHTML="A requisição expirou."
//       break;
//     case error.UNKNOWN_ERROR:
//       x.innerHTML="Algum erro desconhecido aconteceu."
//       break;
//     }


// Read more: http://www.linhadecodigo.com.br/artigo/3653/usando-geolocalizacao-com-html5.aspx#ixzz5oYQeRuwt

// function showPosition(position) {
//     showMap(position.coords.latitude, position.coords.longitude)
// }

// function showSP(error) {
//     showMap(-23.5507, -46.6333)
// }

// const idapi = '0FuHpdUPSk8DjovzG8a3';
// const codapi = '6YNHGglOpSTAE513hPercA';

// const platform = new H.service.Platform({
//     'app_id': idapi,
//     'app_code': codapi
// });

// const defaultLayers = platform.createDefaultLayers();

// function showMap(latitude, longitude){
//     const map = new H.Map(
//         document.getElementById('map'),
//         defaultLayers.normal.map,
//         {
//             zoom: 14,
//             center: { lat: latitude, lng: longitude}
//         });
// }