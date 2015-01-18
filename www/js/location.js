// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
/*
var PARSE_APP = "3I2hDxytg8b7LF5DcCinCG4capoEk8AV3ZqeUdn5";
var PARSE_JS = "C6p0uiovPgsGlwjdLbWh04xLwJrln4wmdpilij6n";
Parse.initialize(PARSE_APP, PARSE_JS);
LocationObject = Parse.Object.extend("LocationObject");
*/
var onSuccess = function(position) {
    // alert('Latitude: '          + position.coords.latitude          + '\n' +
    //       'Longitude: '         + position.coords.longitude         + '\n' +
    //       'Altitude: '          + position.coords.altitude          + '\n' +
    //       'Accuracy: '          + position.coords.accuracy          + '\n' +
    //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    //       'Heading: '           + position.coords.heading           + '\n' +
    //       'Speed: '             + position.coords.speed             + '\n' +
    //       'Timestamp: '         + position.timestamp                + '\n');

    //Grab the note details, no real validation for now
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var mobile = "Unknown OS";
    var OSName = "Unknown OS";
    var username = Parse.getUsername;
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
};
// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

//navigator.geolocation.getCurrentPosition(onSuccess, onError);
