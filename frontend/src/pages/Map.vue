<template>
  <div id="map"></div>
  <Filter @apply-filters="onApplyFilters" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BASE_URL } from "@/config";
import Filter from "@/components/Filter.vue";

const latitude = ref(0);
const longitude = ref(0);
const stationsData = ref([]);
const filteredStations = ref([]);

let map;
let markers = []; 

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const typeMap = {
  ac_level_1: "AC Level 1",
  ac_level_2: "AC Level 2",
  dc_ccs: "DC CCS",
  "dc_GB/T": "DC GB/T",
};

// Lifecycle
onMounted(async () => {
  map = L.map("map").setView([28.6815, 77.2228], 13);

  // Tile layer
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  try {
    const coords = await getCurrentLocation();
    latitude.value = coords.latitude;
    longitude.value = coords.longitude;

    const userMarker = L.marker([latitude.value, longitude.value], { icon: redIcon }).addTo(map);
    userMarker.bindPopup("You are here.");
    map.setView([latitude.value, longitude.value], 13);
  } catch (err) {
    console.warn("Geolocation failed:", err.message);
  }

  try {
    const response = await fetch(`${BASE_URL}/charger`);
    if (!response.ok) {
      alert("Failed to load chargers data.");
      return;
    }

    const { chargers } = await response.json();
    stationsData.value = chargers;
    filteredStations.value = chargers;

    updateMapMarkers(); 
  } catch (error) {
    alert("Error fetching charger data.");
    console.error(error);
  }
});

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      alert("Turn on your GPS to use this feature.");
      return reject(new Error("Geolocation not supported"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        alert("Unable to access location. Please enable GPS.");
        reject(error);
      }
    );
  });
}

function updateMapMarkers() {
  markers.forEach((m) => map.removeLayer(m));
  markers = [];

  filteredStations.value.forEach((charger) => {
    if (Array.isArray(charger.location) && charger.location.length === 2) {
      const [lat, lng] = charger.location;

      const marker = L.marker([lat, lng], { icon: defaultIcon }).addTo(map);

      let distance = "";
      if (latitude.value && longitude.value) {
        const dx = lat - latitude.value;
        const dy = lng - longitude.value;
        const distKm = Math.sqrt(dx * dx + dy * dy) * 111;
        distance = `<br>Distance: ${distKm.toFixed(2)} km`;
      }

      marker.bindPopup(`
        <b>${charger.name}</b><br>
        Power: ${charger.poweroutput} kW<br>
        Type: ${typeMap[charger.type] || "Unknown"}<br>
        Status: ${charger.status}<br>
        Location: ${charger.stateName || "N/A"}${distance}
      `);

      markers.push(marker);
    }
  });
}

const onApplyFilters = (filterRef) => {
  filteredStations.value = stationsData.value.filter((station) => {
    const statusMatch = filterRef.status === 'all' || station.status.toLowerCase() === filterRef.status.toLowerCase();
    const typeMatch = filterRef.type === 'all' || station.type.toLowerCase() === filterRef.type.toLowerCase();
    const outputMatch = 
      (filterRef.min_output === null || station.poweroutput >= filterRef.min_output) &&
      (filterRef.max_output === null || station.poweroutput <= filterRef.max_output);
    
    return statusMatch && typeMatch && outputMatch;
  });

  updateMapMarkers(); 
};
</script>

<style scoped>
#map {
  height: calc(100vh - 64px);
  width: 100%;
  z-index: 0;
}
</style>
