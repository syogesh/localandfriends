var PARSE_APP = "3I2hDxytg8b7LF5DcCinCG4capoEk8AV3ZqeUdn5";
var PARSE_JS = "C6p0uiovPgsGlwjdLbWh04xLwJrln4wmdpilij6n";
Parse.initialize(PARSE_APP, PARSE_JS);

function getUsers() {
    var User = Parse.Object.extend("Friend");

    var query = new Parse.Query(User);
    query.equalTo("city", "Ann Arbor");
    query.find({
        success: function(results) {
        for (var i = 0; i < results.length; ++i) {
            var object = results[i];
            alert(object.id + ' - ' + object.get('name'));
        }
        }, error: function(error) {
            alert('Error: ' + error.code + ' ' + error.message);
        }
    });
}

getUsers();
