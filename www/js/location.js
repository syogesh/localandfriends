// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var PARSE_APP = "3I2hDxytg8b7LF5DcCinCG4capoEk8AV3ZqeUdn5";
var PARSE_JS = "C6p0uiovPgsGlwjdLbWh04xLwJrln4wmdpilij6n";
Parse.initialize(PARSE_APP, PARSE_JS);
LocationObject = Parse.Object.extend("LocationObject");

var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
//Grab the note details, no real validation for now
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var note = new LocationObject();
    note.save({latitude:latitude, longitude:longitude}, {
      success:function(object) {
        console.log("Saved the object!");
      }, 
      error:function(object,error) {
        console.dir(error);
        alert("Sorry, I couldn't save it.");
      }
    });

};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);
