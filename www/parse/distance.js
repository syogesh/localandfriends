function calculateDistance(lat1, lat2) {
	var radiusEarth = 6371; // km
	var distanceLat = (lat2-lat1).toRad();
	var distanceLon = (lon2-lon1).toRad();
	var lat1 = lat1.toRad();
	var lat2 = lat2.toRad();

	var a = Math.sin(distanceLat/2) * Math.sin(distanceLat/2) +
	    Math.sin(distanceLon/2) * Math.sin(distanceLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = radiusEarth * c;
	return d;
}