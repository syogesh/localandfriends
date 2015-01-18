var PARSE_APP = "3I2hDxytg8b7LF5DcCinCG4capoEk8AV3ZqeUdn5";
var PARSE_JS = "C6p0uiovPgsGlwjdLbWh04xLwJrln4wmdpilij6n";
Parse.initialize(PARSE_APP, PARSE_JS);

var myLat, myLong, allUsers, map, placesList, closestFriends;

function onSuccess(position) {
/*    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/

    //Grab the note details, no real validation for now
    myLat = position.coords.latitude;
    myLong = position.coords.longitude;

    var mobile = "Unknown OS";
    var OSName = "Unknown OS";
    //var username = Parse.getUsername;
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

    if (navigator.userAgent.indexOf("Mozilla")!=-1) mobile="Mozilla";
    if (navigator.userAgent.indexOf("Safari")!=-1) mobile="Safari";
    if (navigator.userAgent.indexOf("Explorer")!=-1) mobile="Explorer";
    if (navigator.userAgent.indexOf("Chrome")!=-1) mobile="Chrome";
    if (navigator.userAgent.indexOf("iPad")!=-1) mobile="iPad";
    if (navigator.userAgent.indexOf("iPhone")!=-1) mobile="iPhone";
    if (navigator.userAgent.indexOf("iPod")!=-1) mobile="iPod";
    if (navigator.userAgent.indexOf("Android")!=-1) mobile="Android";
    if (navigator.userAgent.indexOf("webOS")!=-1) mobile="webOS";
    /*
    var note = new LocationObject();
    note.save({OSName:OSName, mobile:mobile, latitude:latitude, longitude:longitude, username:username}, {
      success:function(object) {
        console.log("mobile = " + mobile);
        console.log("Saved the object!");
      },
      error:function(object,error) {
        console.dir(error);
        alert("Sorry, I couldn't save it.");
      }
    });
    */
  getClosestUsers(position);
};
// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

function initialize(position) {
  //alert(allUsers[0].id + ' - ' + allUsers[0].get('name'));
  var latitude = (position.coords.latitude + closestFriends[0].get('latitude'))/2;
  var longitude = (position.coords.longitude + closestFriends[0].get('longitude'))/2;
  var location = new google.maps.LatLng(latitude, longitude);
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: location,
    zoom: 17
  });

  var request = {
    location: location,
    radius: 1000,
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
    for (var i = 0, places; places = placesList[i]; i++) {
      console.log(places.name + " " + places.geometry.location);
    }
    createMarkers(results);

    if (pagination.hasNextPage) {
      var moreButton = document.getElementById('more');

      moreButton.disabled = false;

      google.maps.event.addDomListenerOnce(moreButton, 'click',
          function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }
  }
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();

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
  map.fitBounds(bounds);
}

function getClosestUsers(position) {
    Parse.Cloud.run('closestFriends', { latitude: myLat, longitude: myLong}, {
    success: function(response) {
      for(var i = 0; i < response.length; i++){
        console.log(response[i].get("name"));
      }
      closestFriends = response;
      initialize(position);
    },
    error: function(error) {
      console.log(error.message);
    }
  });
}