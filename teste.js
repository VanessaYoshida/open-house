window.onload = function () {
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorPosition)
    } else {
        showMap(-23.5507, -46.6333);
    }
}

function showPosition(position) {
    showMap(position.coords.latitude, position.coords.longitude)
}

function errorPosition(error) {
    showMap(-23.5507, -46.6333)
}

let platform = new H.service.Platform({
    'app_id': '0FuHpdUPSk8DjovzG8a3',
    'app_code': '6YNHGglOpSTAE513hPercA',
    useHTTPS: true,
    useCIT: true
});

let defaultLayers = platform.createDefaultLayers();

const showMap = function (latitude, longitude) {
    var map = new H.Map(
        document.getElementById('map'),
        defaultLayers.normal.map,
        {
            zoom: 15,
            center: { lat: latitude, lng: longitude }
        });

    let mapEvents = new H.mapevents.MapEvents(map);
    let behavior = new H.mapevents.Behavior(mapEvents);
    let ui = H.ui.UI.createDefault(map, defaultLayers);
    window.marker = new H.map.Marker({ lat: latitude, lng: longitude });
    map.addObject(marker);
}


