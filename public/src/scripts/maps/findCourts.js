const url = 'https://places.cit.api.here.com/places/v1/browse?app_id=A0an0Cy4CF1jmmOCpGBb&app_code=wIc8MPsnN0Ujx0gceJFuSg';
const templatePlaces = document.querySelector('.places');
String.prototype.stripHTML = function() {
  return this.replace(/<.*?>/g, ' - ');
};
const showPlaces = (latitude, longitude) => {
  fetch(`${url}&in=${latitude},${longitude};r=5000&q=futebol&pretty`)
    .then(response => response.json())
    .then(response => {
      response.results.items.forEach(item => {
        $(".places").prepend(`
          <li class='li-favorites'>
            <br>
            <strong>Local: ${item.title}</strong><br>
            Endereço: ${item.vicinity.stripHTML()}<br>
            Distância: ${item.distance / 1000} km
          </li>
          `);
        window.marker = new H.map.Marker({ lat: item.position[0],
          lng: item.position[1] });
        window.map.addObject(marker);
      });
    })    
    .catch(() => {
      $('#panel').html('Não foi encontrado nenhum resultado.');
    });     
};    