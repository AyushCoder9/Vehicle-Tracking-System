let map, vehicleMarker, routePolyline;

async function initMap() {
    const routeResponse = await fetch('/api/route');
    const routeData = await routeResponse.json();
    
    const firstPoint = [routeData[0].latitude, routeData[0].longitude];
    map = L.map('map').setView(firstPoint, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const routeCoords = routeData.map(p => [p.latitude, p.longitude]);
    routePolyline = L.polyline(routeCoords, { color: 'blue' }).addTo(map);

    const carIcon = L.icon({
        iconUrl: '/images/car.png',
        iconSize: [40, 40]
    });
    vehicleMarker = L.marker(firstPoint, { icon: carIcon }).addTo(map);

    setInterval(updatePosition, 1000);
}

async function updatePosition() {
    const response = await fetch('/api/current-location');
    const { latitude, longitude } = await response.json();
    vehicleMarker.setLatLng([latitude, longitude]);
    map.panTo([latitude, longitude]);
}

initMap();
