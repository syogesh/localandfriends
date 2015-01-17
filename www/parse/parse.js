//Parse related keys
var PARSE_APP = "3I2hDxytg8b7LF5DcCinCG4capoEk8AV3ZqeUdn5";
var PARSE_JS = "C6p0uiovPgsGlwjdLbWh04xLwJrln4wmdpilij6n";

$(document).ready(function() {
	Parse.initialize(PARSE_APP, PARSE_JS);

	NoteObject = Parse.Object.extend("LocationObject");

	$("#addNoteBtn").on("touchend", function(e) {
		e.preventDefault();
		
		//Grab the note details, no real validation for now
		var latitude = $("#noteTitle").val();
		var longitude = $("#noteBody").val();

		var note = new NoteObject();
		note.save({latitude:latitude, longitude:longitude}, {
			success:function(object) {
				console.log("Saved the object!");
			}, 
			error:function(object,error) {
				console.dir(error);
				alert("Sorry, I couldn't save it.");
			}
		});
	});
});