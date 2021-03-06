console.log("working");

// // Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

L.tileLayer("https://api.mapbox.com/");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

L.control.layers(baseMaps).addTo(map)

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/ChristopheGarcia1/Mapping_Earthquakes/main/majorAirports.json";

// GeoJSON data for san fran airport
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};


// // function for creating a map object of geoJSON
// L.geoJSON(sanFranAirport, {
//     onEachFeature: (feature, layer) => {
//         console.log(feature);
//         console.log(layer);
//         layer.bindPopup(`<h2>${feature.properties.name}</h2><hr><h4>${feature.properties.city}, ${feature.properties.country}</h4>`);
//     }
// }).addTo(map);

// geojson data from github
d3.json(airportData).then(data => {
    console.log(data);
    L.geoJson(data, {
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<h2>${feature.properties.name}</h2><hr><h4>${feature.properties.city}, ${feature.properties.country}</h4>`);
        }
    }).addTo(map);
});
