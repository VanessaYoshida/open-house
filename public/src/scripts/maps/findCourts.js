const url = "https://places.cit.api.here.com/places/v1/discover/search?app_id=A0an0Cy4CF1jmmOCpGBb&app_code=wIc8MPsnN0Ujx0gceJFuSg&at=52.531,13.3843&q=Brandenburg+Gate";

fetch (url)
.then (response => response.json())
.then (response => console.log(response))