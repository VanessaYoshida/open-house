function searchPlaces(platform) {
    var search = new H.places.Search(platform.getPlacesService());
    var params = {
        'q': 'quadra',
        'at': '-23,55,-46,63'
    };
    search.request(params, {}, onResult, onError);
}

function onResult(result) {
    var places = result.results.items;
    addPlacesToMap(places);
    addPlacesToPanel(places);
}

function onError(error) {
    error = data;
}

var bubble;

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
    
    function addPlacesToMap(places) {
        var group = new  H.map.Group();
        group.addEventListener('tap', function (evt) {
            map.setCenter(evt.target.getPosition());
            openBubble(
                evt.target.getPosition(), evt.target.content);
            }, false);
            
            group.addObjects(places.map(function (place) {
                var marker = new H.map.Marker({lat: place.position[0], lng: place.position[1]})
                marker.content = '<div style="font-size: 10px" ><h3>' + place.title +
                '</h3><h4>' + place.category.title + '</h4>' + place.vicinity + '</div>';
                return marker;
            }));
            
            map.addObject(group);
            
            map.setViewBounds(group.getBounds());
        }
        
        function addPlacesToPanel(places){
            
            var nodeOL = document.createElement('ul'),
            i;
            
            nodeOL.style.fontSize = 'small';
            nodeOL.style.marginLeft ='5%';
            nodeOL.style.marginRight ='5%';
            
            
            for (i = 0;  i < places.length; i += 1) {
                var li = document.createElement('li'),
                divLabel = document.createElement('div'),
                content =  '<strong style="font-size: large;">' + places[i].title  + '</strong>';
                content += '&nbsp;<span style="font-size:smaller">(' +  places[i].category.title + ')</span></br>';
                content +=  places[i].vicinity + '</br>';
                content += '<strong>distance:</strong>' +  places[i].distance + 'm</br>';
                
                divLabel.innerHTML = content;
                li.appendChild(divLabel);
                nodeOL.appendChild(li);
            }
            
            placesContainer.appendChild(nodeOL);
        }
        
        var platform = new H.service.Platform({
            app_id: 'A0an0Cy4CF1jmmOCpGBb',
            app_code: 'wIc8MPsnN0Ujx0gceJFuSg',
            useHTTPS: true,
            useCIT: true
        });

        var defaultLayers = platform.createDefaultLayers();
        
        // const mapCurrentLocation = (latitude, longitude) => {
            // if (!latitude || !longitude){
            //     latitude = -37.7942;
            //     longitude = -122.4070;
            // }
            
            var map = new H.Map(document.getElementById('map'),
            defaultLayers.normal.map, {
                center: {lat: -37.7942, lng: -122.4070},
                zoom: 15
            });
            
            var placesContainer = document.getElementById('panel');
            
            var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
            
            var ui = H.ui.UI.createDefault(map, defaultLayers);
            
        // }

        searchPlaces(platform);

        
        