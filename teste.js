window.onload = function () {
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showSP);
    }
    else {
        x.innerHTML = "Seu browser não suporta Geolocalização.";
    }
}

function showPosition(position) {
    showMap(position.coords.latitude, position.coords.longitude)
}

function showSP(error) {
    showMap(-23.5507, -46.6333)
}

const idapi = '0FuHpdUPSk8DjovzG8a3';
const codapi = '6YNHGglOpSTAE513hPercA';

const platform = new H.service.Platform({
    'app_id': idapi,
    'app_code': codapi
});

// Obtain the default map types from the platform object:
const defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
function showMap(latitude, longitude){
    const map = new H.Map(
        document.getElementById('map'),
        defaultLayers.normal.map,
        {
            zoom: 14,
            center: { lat: latitude, lng: longitude}
        });
}
