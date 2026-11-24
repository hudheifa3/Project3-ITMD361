"use strict";
// Shared unobtrusive JavaScript for all four pages.
const contactEmail = "habdirizak@hawk.illinoistech.edu";
document.addEventListener("DOMContentLoaded", () => {
  const questionsButton = document.getElementById("questions-button");
  if (questionsButton) {
    questionsButton.addEventListener("click", () => {
      window.alert(`If you have questions, contact me at:\n${contactEmail}`);
    });
  }
  const chicagoButton = document.getElementById("chicago-button");
  if (chicagoButton) {
    chicagoButton.addEventListener("click", () => {
      if (window.projectMap) {
        window.projectMap.setCenter({ lat: 41.8781, lng: -87.6298 });
        window.projectMap.setZoom(11);
      }
    });
  }
});

// Callback used by the Google Maps JavaScript API.
function initMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement || !window.google || !google.maps) return;
  const chicago = { lat: 41.8781, lng: -87.6298 };
  const map = new google.maps.Map(mapElement, { center: chicago, zoom: 11, mapTypeControl: true });
  window.projectMap = map;
  // Three visible features, as shown in the instructor's full-credit example.
  const locations = [
    { position: chicago, title: "Downtown Chicago", description: "Chicago city center" },
    { position: { lat: 41.8349, lng: -87.6270 }, title: "Illinois Institute of Technology", description: "IIT campus" },
    { position: { lat: 41.8676, lng: -87.6167 }, title: "Museum Campus", description: "Chicago Museum Campus" }
  ];
  const info = new google.maps.InfoWindow();
  locations.forEach((location, index) => {
    const marker = new google.maps.Marker({
      position: location.position,
      map,
      title: location.title,
      // A different marker color makes each feature easy to identify.
      icon: index === 0 ? undefined : {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: index === 1 ? "#1e73be" : "#2d8b57",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2
      }
    });
    marker.addListener("click", () => {
      info.setContent(`<strong>${location.title}</strong><p>${location.description}</p>`);
      info.open({ anchor: marker, map });
    });
  });
  const status = document.getElementById("map-status");
  if (status) status.textContent = "Click the marker to learn about Chicago. Use the reset button to recenter the map.";
}
window.initMap = initMap;
