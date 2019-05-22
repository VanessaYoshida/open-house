window.onload = function () {
    getLocation();
}

const templatePlaces = document.querySelector(".places");

String.prototype.stripHTML = function() {return this.replace(/<.*?>/g, ' - ');}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorPosition)
    } else {
        showMap(-23.5507, -46.6333);
    }
}

function showPosition(position) {
    showMap(position.coords.latitude, position.coords.longitude);
}

function errorPosition(error) {
    showMap(-23.5507, -46.6333);
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
            zoom: 14,
            center: { lat: latitude, lng: longitude }
        });

    let mapEvents = new H.mapevents.MapEvents(map);
    let behavior = new H.mapevents.Behavior(mapEvents);
    let ui = H.ui.UI.createDefault(map, defaultLayers);
    var icon = new H.map.Icon('src/home.png');
    window.marker = new H.map.Marker({ lat: latitude, lng: longitude }, { icon: icon });
    map.addObject(marker);
    const domain = 'https://places.cit.api.here.com/places/v1/discover/'
    const routes = {
        q: 'futebol',
        in: latitude + '%2C' + longitude + '%3Br%3D2000',
        language: 'pt-BR%2Cpt%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7',
        app_id: '0FuHpdUPSk8DjovzG8a3',
        app_code: '6YNHGglOpSTAE513hPercA',
    }

    fetch(`
    ${domain}search?q=${routes.q}&in=${routes.in}&Accept-Language=${routes.language}
    &app_id=${routes.app_id}&app_code=${routes.app_code}
    `)
        .then(response => response.json())
        .then(response => {
            response.results.items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <br>
                    <strong>Local: ${item.title}</strong><br>
                    Endereço: ${item.vicinity.stripHTML()}<br>
                    Distância: ${item.distance / 1000} km
                `;
                templatePlaces.appendChild(li);
                window.marker = new H.map.Marker({ lat: item.position[0], lng: item.position[1] });
                map.addObject(marker);
            });
        })
}

