
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("closestFriends", function(request, response) {
	var query = new Parse.Query ("Friend");
	query.equalTo("city", "Ann Arbor");
	var distance = function(latitude, longitude) {
		return Math.sqrt(Math.pow(latitude - request.params.latitude, 2) + Math.pow((longitude - request.params.longitude), 2));
	}
	query.find({
		success: function(results) {
			var minDistance = 10000000;
			results.sort(function(a, b) {
				return distance(a.get("latitude"), a.get("longitude")) - 
					distance(b.get("latitude"), b.get("longitude"));
			});
			results.length = 5;
			response.success(results);
		},
		error: function(error) {

		}
	});
	
});