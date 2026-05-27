import React, { useState, useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const LiveTracking = () => {
    const [viewState, setViewState] = useState({
        latitude: 20.5937,
        longitude: 78.9629,
        zoom: 15
    });

    const [currentPosition, setCurrentPosition] = useState(null);
    const intervalRef = useRef(null);

    const updatePosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ latitude, longitude });
            setViewState(prev => ({ ...prev, latitude, longitude }));
        });
    };

    useEffect(() => {
        updatePosition();

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ latitude, longitude });
            setViewState(prev => ({ ...prev, latitude, longitude }));
        });

        intervalRef.current = setInterval(updatePosition, 10000);

        return () => {
            navigator.geolocation.clearWatch(watchId);
            clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {currentPosition && (
                <Marker
                    latitude={currentPosition.latitude}
                    longitude={currentPosition.longitude}
                    anchor="bottom"
                />
            )}
        </Map>
    );
}

export default LiveTracking