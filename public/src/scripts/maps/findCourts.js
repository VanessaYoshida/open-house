
const url = "https://places.cit.api.here.com/places/v1/browse?app_id=A0an0Cy4CF1jmmOCpGBb&app_code=wIc8MPsnN0Ujx0gceJFuSg";
const search = "futebol"

function showPlaces(latitude, longitude){
    fetch(`${url}&in=${latitude},${longitude};r=5000&q=${search}&pretty`)
    .then(response => response.json())
    .then((response) => {
        var result = response.results.items.map(i => i.title);
        document.getElementById('panel').innerHTML = `<p>${result}</p>`});
}

// showPlaces(-23.5507, -46.6333)
showPlaces(localStorage.getItem("latitude"), localStorage.getItem("longitude"));

