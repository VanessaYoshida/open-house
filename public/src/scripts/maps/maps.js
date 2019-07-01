
let loadMap = () => {

  document.getElementById("send-address").addEventListener("click", function (event) {
    for (let obj of window.map.getObjects() )  {
      window.map.removeObject(obj);
    }
    geocode(platform);
  }, false);

  let geocode = (platform) => {
    let address = $('#address').val();

    let geocoder = platform.getGeocodingService(),
      geocodingParameters = {
        searchText: address,
        jsonattributes: 1
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
    let icon = new H.map.Icon('./assets/img/home.png');
    window.marker = new H.map.Marker({ lat: locations[0].location.displayPosition.latitude, lng: locations[0].location.displayPosition.longitude }, { icon: icon });
    map.addObject(marker);
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

  window.map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map, {
      center: { lat: localStorage.getItem('latitude'), lng: localStorage.getItem('longitude') },
      zoom: 14
    });

  let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  let ui = H.ui.UI.createDefault(map, defaultLayers);

  let icon = new H.map.Icon('./assets/img/home.png');
  window.marker = new H.map.Marker({ lat: localStorage.getItem('latitude'), lng: localStorage.getItem('longitude') }, { icon: icon });
  map.addObject(marker);

  let bubble;

  let openBubble = (position, text) => {
    if (!bubble) {
      bubble = new H.ui.InfoBubble(
        position,
        { content: text });
      ui.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(text);
      bubble.open();
    }
  }

  let addLocationsToMap = (locations) => {
    let group = new H.map.Group(),
      position;

    for (let loc of locations) {
      position = {
        lat: loc.location.displayPosition.latitude,
        lng: loc.location.displayPosition.longitude
      };
      marker = new H.map.Marker(position);
      marker.label = loc.location.address.label;
      group.addObject(marker);
    }

    group.addEventListener('click', function (evt) {
      debugger;
      map.setCenter(evt.target.getPosition());
      openBubble(
        evt.target.getPosition(), evt.target.label);
    }, false);

    map.addObject(group);
    map.setCenter(group.getBounds().getCenter());
  }


}