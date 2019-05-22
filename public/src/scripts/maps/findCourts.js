
const url = "https://places.cit.api.here.com/places/v1/browse?app_id=A0an0Cy4CF1jmmOCpGBb&app_code=wIc8MPsnN0Ujx0gceJFuSg";

const search = "futebol";
const templatePlaces = document.querySelector(".places");
String.prototype.stripHTML = function() {return this.replace(/<.*?>/g, ' - ');}

const showPlaces = (latitude, longitude) => {
    fetch(`${url}&in=${latitude},${longitude};r=5000&q=futebol&pretty`)
    .then(response => response.json())
    .then((response) => {
        response.results.items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <br>
                    <strong>Local: ${item.title}</strong><br>
                    Endereço: ${item.vicinity.stripHTML()}<br>
                    Distância: ${item.distance / 1000} km
                `;
                templatePlaces.appendChild(li);
                window.marker = new H.map.Marker({ lat: item.position[0], lng: item.position[1] });
                map.addObject(marker);
       })
      .catch(() => {
          $('#panel').prepend(`Não foi encontrado nenhum resultado.`)
       });    
 });     
      
    // showPlaces(-23.5507, -46.6333)
    // showPlaces(localStorage.getItem("latitude"), localStorage.getItem("longitude"));