let searchBtn = document.getElementById("search-btn");
let inputs = document.getElementById("ip-address");
let bodySectionEL = document.querySelector(".data-response__row");
const invalidIp = document.getElementById("error");
let map = document.getElementById("mapid");
const api =
  "https://geo.ipify.org/api/v1?apiKey=at_GnhJdDAPqlVUV7mRv0ByMpExF5vI7";
const mapboxToken =
  "pk.eyJ1IjoiYXJtaW5kZXJzaW5naCIsImEiOiJjanlsc2xxczgwYXM0M2Nub24zMjNwNmoyIn0.nc0JX8EcIw4CIgBQPAqG2Q";

function MakeMap(data) {
  const location = [data.location.lat, data.location.lng];
  console.log(location);
  const myMap = L.map("mapid").setView(location, 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      style_id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      maxZoom: 18,
      accessToken: mapboxToken
    }
  ).addTo(myMap);
  var marker = L.marker(location).addTo(myMap);
  var circle = L.circle(location, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500
  }).addTo(myMap);
}

//validating ip address
function validateIpAddress(data) {
  if (data.code) {
    invalidIp.classList.remove("close");
  } else {
    invalidIp.classList.contains("close")
      ? ""
      : invalidIp.classList.add("close");
    document.querySelector(".ip").textContent = data.ip;
    document.querySelector(
      ".location"
    ).textContent = `${data.location.city}, ${data.location.region} ${data.location.country}`;
    document.querySelector(".timezone").textContent = data.location.timezone;
    document.querySelector(".isp").textContent = data.isp;
    bodySectionEL.classList.remove("close");
    MakeMap(data);
    map.classList.remove("close");
  }
}

// fetching data from api
function fetchData(ipAddres) {
  fetch(`${api}&ipAddress=${ipAddres}`)
    .then(response => response.json())
    .then(data => {
      validateIpAddress(data);
    });
}

// handling input click
function handleSearch() {
  const ipAddres = inputs.value;
  bodySectionEL.classList.contains("close")
    ? ""
    : bodySectionEL.classList.add("close");
  // map.classList.contains("close") ? "" : map.classList.add("close");
  fetchData(ipAddres);
  inputs.value = "";
}

//Adding events
searchBtn.addEventListener("click", handleSearch);
