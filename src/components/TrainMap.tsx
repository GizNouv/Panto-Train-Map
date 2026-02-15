import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import React, { useEffect } from 'react'
import type { Station } from '../types'

interface TrainMapProps {
    stations: Station[]
    selectedStation: Station | null
}

const TILE_LAYER = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

const MapUpdater: React.FC<Omit<TrainMapProps, 'stations'>> = ({ selectedStation }) => {
    const map = useMap()
    useEffect(() => {
        if (selectedStation) map.flyTo([selectedStation.lat, selectedStation.lng], 12)
    }, [selectedStation, map])

    return null
}

export function TrainMap({ selectedStation, stations }: TrainMapProps) {
    return (
        <MapContainer
            center={[51.1657, 10.4515]}
            zoom={6}
            className="h-full w-full"
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer url={TILE_LAYER} />
            {stations.map(station => (
                <Marker key={station.id} position={[station.lat, station.lng]} />
            ))}
            <MapUpdater selectedStation={selectedStation} />
        </MapContainer>
    );
}