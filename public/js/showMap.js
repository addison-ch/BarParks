
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v9', // style URL
    center: park.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom


});
map.addControl(new mapboxgl.NavigationControl());

const marker1 = new mapboxgl.Marker()
    .setLngLat(park.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${park.title}<h3><p>${park.address}<p>`
        )
    )
    .addTo(map);