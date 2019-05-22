window.onload = function () {
    getLocation();
}

const locationUser = $("#location");

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        locationUser.innerHTML = "A geolocalização não é suportada neste browser.";
    }
}

const showPosition = (position) => {
    localStorage.setItem("latitude", position.coords.latitude);
    localStorage.setItem("longitude", position.coords.longitude);
}
