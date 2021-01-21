// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Create a tile layer 
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
// Set the url query to make an API call to get the eaerthquake 
// records with M4.5+ last 30 days on the earth 

var queryURL =" https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    console.log(data)
    var FeaturesArray = data.features
    for (var i = 0; i < FeaturesArray.length; i++) {
    var Coordinates = FeaturesArray[i].geometry.coordinates
    var Time = FeaturesArray[i].properties.time
    var Magnitude = FeaturesArray[i].properties.mag

        

