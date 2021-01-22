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
  
// Set the url query to make an API call to get the eaerthquake records happened last week

var queryURL =" https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(queryURL, function(data) {
    console.log(data)
    var FeaturesArray = data.features
    for (var i = 0; i < FeaturesArray.length; i++) {
    var Coordinates = FeaturesArray[i].geometry.coordinates
    var Place = FeaturesArray[i].properties.place
    var Time = FeaturesArray[i].properties.time
    var Magnitude = FeaturesArray[i].properties.mag


   // Define a markerSize function that will give each record a different radius based on magnitude degree
    function markerSize(magnitude) {
    return magnitude * 10000;
   }
  
 
    // Determine color options for each magnitude segment
    function markerColor(magnitude){
    if (magnitude >5) {
        return " ForestGreen"
    }
    else if (magnitude >4) {
         return  " Olive"
    }
    else if (magnitude > 3) {
        return " LimeGreen"
    }
    else if (magnitude >2) {
         return " Lime"
    }
    else if (magnitude >1) {
        return " GreenYellow"
   }
    else { return "PaleGreen"}    

  } 
   
    L.circle([Coordinates[1], Coordinates[0]], {
        fillOpacity: 0.75,
        color: "white",
        stroke: true,
        weight: 0.5,
        fillColor: markerColor(Magnitude),
        radius: markerSize(Magnitude)
       }). bindPopup("<h3>" + Place+
      "</h3><hr><p>" + new Date(Time) + "</p><hr><h3>Magnitude: " + Magnitude + "</h3>").addTo(myMap);
   
  // Set up the legend
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "info legend");
    var magRange = [0,1,2,3,4,5];
    var labels = ['<strong>Magnitude</strong>']
 
    // Loop through the intervals and generate a label 
    for (var i = 0; i < magRange.length; i++) {
      div.innerHTML +=
      '<i style="background:' + markerColor(magRange[i]) + '"></i> ' +
      magRange[i] + (magRange[i+1] ? '&ndash;' + magRange[i+1] + '<br>': '+');
      
    }
      return div;

  };

  // Adding legend to the map
  legend.addTo(myMap);

  }
});

