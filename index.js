'use strict';
const got = require('got');
const Gpx = require('gpx-for-runners');

module.exports = async (request, response) => {
	const gpxUrl = request.query.url;

	try {
		const gpxStream = await got(gpxUrl);
		const gpxData = new Gpx(gpxStream.body);
		const trailData = {
			elevation: gpxData.elevation(),
			distance: gpxData.distance()
		};

		response.send(trailData);
	} catch (error) {
		response.status(400);
		response.send(error);
	}
};
