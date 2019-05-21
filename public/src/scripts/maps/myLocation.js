const locationUser = document.getElementById("demo");

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        locationUser.innerHTML = "A geolocalização não é suportada neste browser.";
    }
}

const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lng);
}

getLocation();