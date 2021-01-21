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
    var Place = FeaturesArray[i].properties.place
    var Time = FeaturesArray[i].properties.time
    var Magnitude = FeaturesArray[i].properties.mag
    var Size = Magnitude*10000
    var color = "";
    if (Size > 10000) {
         color = " #ffff33"
    }
    else if (Size > 20000) {
         color = " #e6e600"
    }
    else if (Size > 30000) {
        color = " #b3b300"
    }
    else if (Size > 40000) {
         color = "  #808000"
    }
    else { color = "#4d4d00"}    
   
    L.circle([Coordinates[1], Coordinates[0]], {
        fillOpacity: 0.75,
        color: "white",
        stroke: True,
        weight: 0.5,
        fillColor: color,
        radius: Size 
       }). bindPopup("<h3>" + Place+
      "</h3><hr><p>" + new Date(Time) + "</p>").addTo(myMap);
   

  }
});

