
const url = "https://places.cit.api.here.com/places/v1/browse?app_id=A0an0Cy4CF1jmmOCpGBb&app_code=wIc8MPsnN0Ujx0gceJFuSg";

const showPlaces = (latitude, longitude) => {
    fetch(`${url}&in=${latitude},${longitude};r=5000&q=futebol&pretty`)
    .then(response => response.json())
    .then((response) => {
        console.log(response);
        var courts = response.results.items.map(result => result.title);
        $('#panel').prepend(`<p>${courts}</p>`)
    })
    .catch(() => {
        $('#panel').prepend(`Não foi encontrado nenhum resultado.`)
    })    
}
    
    // showPlaces(-23.5507, -46.6333)
    // showPlaces(localStorage.getItem("latitude"), localStorage.getItem("longitude"));
    
