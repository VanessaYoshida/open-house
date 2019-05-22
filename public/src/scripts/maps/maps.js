$("#send-address").click(() => geocode(platform));

let geocode = (platform) => {
    let address = $('#address').val();
    
let geocoder = platform.getGeocodingService(),
geocodingParameters = {
    searchText: address,
    jsonattributes : 1
};

geocoder.geocode(
    geocodingParameters,
    onSuccess,
    onError
    );
}

let onSuccess = (result) => {
    let locations = result.response.view[0].result;
    addLocationsToMap(locations);
    showPlaces(locations[0].location.displayPosition.latitude, locations[0].location.displayPosition.longitude);
}

let onError = (error) => {
    console.log(error);
}

let platform = new H.service.Platform({
    app_id: 'A0an0Cy4CF1jmmOCpGBb',
    app_code: 'wIc8MPsnN0Ujx0gceJFuSg',
    useHTTPS: true,
    useCIT: true
});

let defaultLayers = platform.createDefaultLayers();

let map = new H.Map(document.getElementById('map'),
defaultLayers.normal.map,{
    center: {lat: localStorage.getItem('latitude'), lng:localStorage.getItem('longitude')},
    zoom: 14
});

let locationsContainer = document.getElementById('panel');

let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

let ui = H.ui.UI.createDefault(map, defaultLayers);

let bubble;

let openBubble = (position, text) => {
    if(!bubble){
        bubble =  new H.ui.InfoBubble(
            position,
            {content: text});
            ui.addBubble(bubble);
        } else {
            bubble.setPosition(position);
            bubble.setContent(text);
            bubble.open();
        }
    }
    
let addLocationsToPanel = (locations) => {
    let nodeOL = document.createElement('ul'),
    i;
    
    nodeOL.style.fontSize = 'small';
    nodeOL.style.marginLeft ='5%';
    nodeOL.style.marginRight ='5%';
    
    
    for (i = 0;  i < locations.length; i += 1) {
        let li = document.createElement('li'),
        divLabel = document.createElement('div'),
        address = locations[i].location.address,
        content =  '<strong style="font-size: large;">' + address.label  + '</strong></br>';
        position = {
            lat: locations[i].location.displayPosition.latitude,
            lng: locations[i].location.displayPosition.longitude
        };
        
        content += '<strong>Rua:</strong> '  + address.street + '<br/>';
        content += '<strong>Número:</strong> ' + address.houseNumber + '<br/>';
        content += '<strong>Bairro:</strong> '  + address.district + '<br/>';
        content += '<strong>Cidade:</strong> ' + address.city + '<br/>';
        content += '<strong>Estado:</strong> ' + address.county + '<br/>';
        content += '<strong>CEP:</strong> ' + address.postalCode + '<br/>';
        content += '<strong>País:</strong> ' + address.country + '<br/>';
        content += '<br/><strong>position:</strong> ' +
        Math.abs(position.lat.toFixed(4)) + ((position.lat > 0) ? 'N' : 'S') +
        ' ' + Math.abs(position.lng.toFixed(4)) + ((position.lng > 0) ? 'E' : 'W');
        
        divLabel.innerHTML = content;
        li.appendChild(divLabel);
        
        nodeOL.appendChild(li);
    }
    
    locationsContainer.appendChild(nodeOL);
}

let addLocationsToMap = (locations) => {
    let group = new  H.map.Group(),
    position,
    i;
    
    for (i = 0;  i < locations.length; i += 1) {
        position = {
            lat: locations[i].location.displayPosition.latitude,
            lng: locations[i].location.displayPosition.longitude
        };
        marker = new H.map.Marker(position);
        marker.label = locations[i].location.address.label;
        group.addObject(marker);
}
    
group.addEventListener('tap', function (evt) {
    map.setCenter(evt.target.getPosition());
    openBubble(
        evt.target.getPosition(), evt.target.label);
    }, false);
    
    map.addObject(group);
    map.setCenter(group.getBounds().getCenter());
}

let database = firebase.database();

$("#exit").click((event) => {
    event.preventDefault();
    firebase.auth().signOut().then(() =>{
        window.location = 'index.html';
    }).catch((error) => {
        alert("Erro: " + error);
    });
});
    
    
