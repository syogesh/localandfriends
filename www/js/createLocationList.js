var map, placesList;

function initialize() {
  var latitude = 42.2926668;
  var longitude = -83.7165474;
  var location = new google.maps.LatLng(latitude, longitude);
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: location,
    zoom: 17
  });

  var request = {
    location: location,
    radius: 2000,
    types: ['food']
  };
  placesList = document.getElementById('places');

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status, pagination) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    return;
  } else {
    placesList = results;
    console.log("test");
    for (var i = 0, places; places = placesList[i]; i++) {
      console.log(places.name + " " + places.geometry.location);
    }
    return placesList;
/*    createMarkers(results);

    if (pagination.hasNextPage) {
      var moreButton = document.getElementById('more');

      moreButton.disabled = false;

      google.maps.event.addDomListenerOnce(moreButton, 'click',
          function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }*/
  }
}

function createMarkers(places) {
/*  var bounds = new google.maps.LatLngBounds();

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    placesList.innerHTML += '<li>' + place.name + '</li>';

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);*/
}
function startFunction() {
  google.maps.event.addDomListener(window, 'load', initialize);
}