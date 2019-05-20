const url = "https://geocoder.api.here.com/6.2/geocode.json?app_id=A0an0Cy4CF1jmmOCpGBb&app_code=wIc8MPsnN0Ujx0gceJFuSg&searchtext=425+W+Randolph+Chicago";

fetch (url)
.then (response => response.json())
.then (response => console.log(response));

document.getElementById("send-address").addEventListener("click", function( event ) {
    geocode(platform);
}, false);

function geocode(platform) {
    const address = document.getElementById('address').value;
    const geocoder = platform.getGeocodingService(),
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

    function onSuccess(result) {
        const locations = result.response.view[0].result;
        addLocationsToMap(locations);
        addLocationsToPanel(locations);
    }
    
    function onError(error) {
        alert('Ooops!');
    }

    function searchPlaces(platform) {
        const search = new H.places.Search(platform.getPlacesService());

        const params = {
            'q': 'quadras',
            'at': '-23.5505,-46.6333'
        };
        search.request(params, {}, onResult, onError);
    }
    
    const platform = new H.service.Platform({
        app_id: 'A0an0Cy4CF1jmmOCpGBb',
        app_code: 'wIc8MPsnN0Ujx0gceJFuSg',
        useHTTPS: true,
        useCIT: true
    });
    
    const defaultLayers = platform.createDefaultLayers();
    
    const map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map,{
        center: {lat:-23.5505, lng:-46.6333},
        zoom: 15
    });
    
    const locationsContainer = document.getElementById('panel');
    
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    
    let bubble;
    
    function openBubble(position, text){
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
        
        function addLocationsToPanel(locations){
            
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
                
                content += '<strong>houseNumber:</strong> ' + address.houseNumber + '<br/>';
                content += '<strong>street:</strong> '  + address.street + '<br/>';
                content += '<strong>district:</strong> '  + address.district + '<br/>';
                content += '<strong>city:</strong> ' + address.city + '<br/>';
                content += '<strong>postalCode:</strong> ' + address.postalCode + '<br/>';
                content += '<strong>county:</strong> ' + address.county + '<br/>';
                content += '<strong>country:</strong> ' + address.country + '<br/>';
                content += '<br/><strong>position:</strong> ' +
                Math.abs(position.lat.toFixed(4)) + ((position.lat > 0) ? 'N' : 'S') +
                ' ' + Math.abs(position.lng.toFixed(4)) + ((position.lng > 0) ? 'E' : 'W');
                
                divLabel.innerHTML = content;
                li.appendChild(divLabel);
                
                nodeOL.appendChild(li);
            }
            
            locationsContainer.appendChild(nodeOL);
        }
        
        function addLocationsToMap(locations){
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
            