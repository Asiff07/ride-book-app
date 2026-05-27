const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.MAPBOX_API;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKey}&limit=1`;

    try {
        const response = await axios.get(url);
        if (response.data.features && response.data.features.length > 0) {
            const [lng, lat] = response.data.features[0].center;
            return {
                ltd: lat,
                lng: lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.MAPBOX_API;

    try {
        // Geocode origin
        const originRes = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(origin)}.json?access_token=${apiKey}&limit=1`
        );
        if (!originRes.data.features || originRes.data.features.length === 0) {
            throw new Error('Unable to geocode origin');
        }
        const [originLng, originLat] = originRes.data.features[0].center;

        // Geocode destination
        const destRes = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destination)}.json?access_token=${apiKey}&limit=1`
        );
        if (!destRes.data.features || destRes.data.features.length === 0) {
            throw new Error('Unable to geocode destination');
        }
        const [destLng, destLat] = destRes.data.features[0].center;

        // Get directions
        const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${originLng},${originLat};${destLng},${destLat}?access_token=${apiKey}&overview=false`;
        const directionsRes = await axios.get(directionsUrl);

        if (!directionsRes.data.routes || directionsRes.data.routes.length === 0) {
            throw new Error('No routes found');
        }

        const route = directionsRes.data.routes[0];
        const distanceKm = (route.distance / 1000).toFixed(1);
        const durationMin = Math.ceil(route.duration / 60);

        // Return same shape the rest of the app expects
        return {
            distance: {
                text: `${distanceKm} km`,
                value: route.distance   // metres
            },
            duration: {
                text: `${durationMin} mins`,
                value: route.duration   // seconds
            }
        };

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.MAPBOX_API;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${apiKey}&autocomplete=true&limit=5`;

    try {
        const response = await axios.get(url);
        if (response.data.features && response.data.features.length > 0) {
            return response.data.features
                .map(feature => feature.place_name)
                .filter(Boolean);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km — Haversine formula (no 2dsphere index required)
    const captains = await captainModel.find({
        'location.ltd': { $exists: true, $ne: null },
        'location.lng': { $exists: true, $ne: null }
    });

    const toRad = (deg) => deg * (Math.PI / 180);

    const nearbyCaptains = captains.filter(captain => {
        const R = 6371;
        const dLat = toRad(captain.location.ltd - ltd);
        const dLng = toRad(captain.location.lng - lng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(ltd)) * Math.cos(toRad(captain.location.ltd)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance <= radius;
    });

    return nearbyCaptains;
}
