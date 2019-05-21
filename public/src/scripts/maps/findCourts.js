const url = "https://places.cit.api.here.com/places/v1/discover/search?app_id=A0an0Cy4CF1jmmOCpGBb&app_code=wIc8MPsnN0Ujx0gceJFuSg";
const search = "futebol"

function showPlaces(latitude, longitude){
    fetch(`${url}&at=${latitude},${longitude}&q=${search}`)
    .then(response => response.json())
    .then((response) => {
        console.log(response.results.items.map(i => i.alternativeNames))});
        // panel.innerHTML = response.results.items[0].alternativeNames[0].name
    // })
}

showPlaces(localStorage.getItem("latitude"), localStorage.getItem("longitude"));

