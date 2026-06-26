import React, { useState, useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const LiveTracking = ({ overrideCoords }) => {
    const [viewState, setViewState] = useState({
        latitude: 20.5937,
        longitude: 78.9629,
        zoom: 15
    });

    const [currentPosition, setCurrentPosition] = useState(null);
    const intervalRef = useRef(null);

    const updatePosition = () => {
        if (overrideCoords) {
            setCurrentPosition(overrideCoords);
            setViewState(prev => ({ ...prev, ...overrideCoords }));
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ latitude, longitude });
            setViewState(prev => ({ ...prev, latitude, longitude }));
        }, (error) => {
            console.error("Error getting current position:", error);
        });
    };

    useEffect(() => {
        if (overrideCoords) {
            setCurrentPosition(overrideCoords);
            setViewState(prev => ({ ...prev, ...overrideCoords }));
            return;
        }

        updatePosition();

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ latitude, longitude });
            setViewState(prev => ({ ...prev, latitude, longitude }));
        }, (error) => {
            console.error("Error watching position:", error);
        });

        intervalRef.current = setInterval(updatePosition, 10000);

        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [overrideCoords]);

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
                    anchor="center"
                >
                    <div className="relative flex items-center justify-center">
                        <div className="h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow-lg z-10"></div>
                        <div className="absolute h-8 w-8 bg-blue-500 rounded-full animate-ping opacity-30"></div>
                    </div>
                </Marker>
            )}
        </Map>
    );
}

export default LiveTracking