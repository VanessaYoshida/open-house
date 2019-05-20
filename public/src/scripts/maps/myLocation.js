const locationUser = document.getElementById("demo");

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        locationUser.innerHTML = "A geolocalização não é suportada neste browser.";
    }
}

const showPosition = (position) => {
    const myLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
}
    localStorage.setItem(myLocation)
}

getLocation();