// Set the url query to make an API call to get the eaerthquake 
// records with M4.5+ last 30 days on the earth 

var queryURL =" https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });
  