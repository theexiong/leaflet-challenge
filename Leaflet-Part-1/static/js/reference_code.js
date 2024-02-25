let coordinates = [];

// fetch json data
d3.json(url).then((data) => {

    // array of metadata
    let earthquakes = data.features;
    //console.log(earthquakes);

    /*Object.entries(earthquakes).forEach((earthquake) => { 
        /*let firstQuake = earthquakes[0];
        let properties = firstQuake.properties;
        let quakeId = firstQuake.id;
        let magValue = properties.mag;
        let geometry = firstQuake.geometry;
        let lat = geometry.coordinates[0];
        let lon = geometry.coordinates[1];

        console.log(quakeId, magValue, lat, lon);
        //console.log(earthquake);

        Object.entries(earthquake).forEach((quake) => {
            //let mag = earthquake.properties;
            //console.log(mag);
            let quakeInfo = quake[1];
            //console.log(quakeInfo);
                
            //const [key, value] = quake;
            //console.log(`${value}`);
            Object.entries(quake).forEach((info) => {
                //console.log(info[1]);
                let quakeData = info[1];
                console.log(quakeData);
                let geo = quakeData.geometry;
                //console.log(geo);
                //let coords = geo.coordinates;
                //console.log(coords);
                let quakeProps = quakeData.properties;
                //console.log(quakeProps);
            });
                
        });
    });*/

    //filter array 
    //let quake_filter = earthquakes.filter(result => result.id == data);
    //console.log(quake_filter);

    // set first entry to a variable
    let firstQuake = earthquakes[1];
    console.log(firstQuake);

    let Properties = firstQuake.properties;
    //console.log(Properties);

    let magValue = Properties.mag;
    console.log(magValue);

    let Geometry =  firstQuake.geometry;
    //console.log(Geometry);

    let coords = Geometry.coordinates;
    //console.log(Coords);

    let lat = coords[0];
    let lon = coords[1];
    //console.log(lat,lon);

    let lat_lon = (`${lat},${lon}`);
    console.log(lat_lon);
    coordinates.push(lat, lon);
});
console.log(coordinates);

let marker = L.marker([coordinates], {
    draggable: true,
    title: "Markers"
}).addTo(myMap);
marker.bindPopup("Hello There!");


/*// Define a markerSize() function that will give each earthquake a different radius based on magnitude.
function markerSize(mag) {
return Math.sqrt(magValue) * 50;
};

// Loop through the json, and create one marker for each earthquake.
for (let i = 0; i < earthquakes.length; i++) {
L.circle(earthquakes[i].lat_lon, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
    // Setting our circle's radius to equal the output of our markerSize() function:
    // This will make our marker's size proportionate to its population.
    radius: markerSize(earthquakes[i].magValue)
}).bindPopup(`<h1>${earthquakes[i].id}</h1> <hr> <h3>Population: ${earthquakes[i].magValue}</h3>`).addTo(myMap);
};*/


let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"    

function createMarkers(response) {

    d3.json(url).then((response) => {

        let mapMarkers = [];

        // array of metadata
        let earthquakes = data.features;
        //console.log(earthquakes);

        Object.entries(earthquakes).forEach((earthquake) => { 
        //console.log(earthquake);
        let earthquakeInfo = earthquake[1];
        //console.log(earthquakeInfo);
        let properties = earthquakeInfo['properties'];
        //console.log(properties)
        let magValues = properties.mag;
        //console.log(magValues);
        let coordinates = L.marker([earthquakeInfo['geometry']['coordinates']]);
        //console.log(coordinates);
        let lat = coordinates[0];
        let lon = coordinates[1];
        //console.log(lat, lon);
        let lat_lon = (`${lat}, ${lon}`);
        //console.log(lat_lon);
        mapMarkers.push(`'coordinates:' ${coordinates}`);

        console.log(mapMarkers);
        });

        createMap(L.layerGroup(mapMarkers));
    });
};



// Define a markerSize() function that will give each earthquake a different radius based on magnitude.
//function markerSize(mag) {
//return Math.sqrt(mapInfo[0]) * 50;
//};


  

  

