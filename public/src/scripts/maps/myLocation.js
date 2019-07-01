window.onload = function() {
  getLocation();
};
const locationUser = $('#location');
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, error);
  } else {
    locationUser.innerHTML = "A geolocalização não é suportada neste browser.";
  }
};
const showPosition = (position) => {
  localStorage.setItem('latitude', position.coords.latitude);
  localStorage.setItem('longitude', position.coords.longitude);
  showPlaces(position.coords.latitude, position.coords.longitude);
  loadMap();
};
const error = (error) => {
  if (error.code == error.PERMISSION_DENIED) {
    localStorage.setItem('latitude', -23.5507);
    localStorage.setItem('longitude', -46.6333);
    showPlaces(-23.5507, -46.6333);
    loadMap();
  }
}