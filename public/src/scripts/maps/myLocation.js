window.onload = function () {
    getLocation();
}

const locationUser = $("#location");

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showSP);
    } else {
        locationUser.innerHTML = "A geolocalização não é suportada neste browser.";
    }
}

const showPosition = (position) => {
    localStorage.setItem("latitude", position.coords.latitude);
    localStorage.setItem("longitude", position.coords.longitude);
}

function showSP(error) {
    showPlaces(-23.5507, -46.6333)
}

// function showPosition(position) {
//     showPlaces(position.coords.latitude, position.coords.longitude)
// }

// function showSP(error) {
//     showPlaces(-23.5507, -46.6333)
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