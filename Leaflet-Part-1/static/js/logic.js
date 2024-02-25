// query URL
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

// d3 get request
d3.json(url).then(function (data) {
  console.log(data);
  // create feature object of data
  createFeatures(data.features);
});

// function to determine size based on magnitude 
function markerSize(magnitude) {
  return magnitude * 5000;
};

// function to determine colors based on depths
function markerColor(depth){
    switch(true) {
        case depth > 90:
            return "red";
        case depth > 70:
            return "orangered";
        case depth > 50:
            return "darkorange";
        case depth > 30:
            return "orange";
        case depth > 10:
            return "greenyellow";
        default:
            return "lawngreen";
    };
};

function createFeatures(earthquakeInfo) {

  // function for each feature
  // bind popup to each feature that displays place, time, magnitude and coordinates
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  // create a GeoJSON layer from createFeatures function(earthquakeInfo)
  let earthquakes = L.geoJSON(earthquakeInfo, {
    onEachFeature: onEachFeature,

    // layer to change features and their latlng
    pointToLayer: function(feature, latlng) {

      // create variable for markers and its properties
      let markers = {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.75,
        color: "white",
        stroke: true,
        weight: 1
      }
      return L.circle(latlng,markers);
    }
  });

  // run createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // create tile layer
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // create map, define center, zoom and layers
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // add legend variable
  let legend = L.control({position: "bottomright"});

  legend.onAdd = function(map) {

    let div = L.DomUtil.create("div", "info legend");
        depth = [-10,10,30,50,70,90],
        labels = [];

    for (let i = 0; i < depth.length; i++) {
        div.innerHTML += 
            '<i style="background:' + markerColor(depth[i] + 1) +'"></i> ' + '&nbsp' + '&nbsp' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }

    return div;
  };

legend.addTo(myMap);
};