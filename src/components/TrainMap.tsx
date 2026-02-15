import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import React, { useEffect } from 'react'
import L from 'leaflet'
import type { Station } from '../types'
import 'leaflet/dist/leaflet.css'
// Fix default marker icons
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

interface TrainMapProps {
    stations: Station[]
    selectedStation: Station | null
    onStationClick: (station: Station) => void
}

const TILE_LAYER = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const ZOOM_VALUE = 14

// Create default icon
const defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

// Create selected icon (red marker for visibility)
const selectedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const MapUpdater: React.FC<Pick<TrainMapProps, 'selectedStation'>> = ({ selectedStation }) => {
    const map = useMap()
    useEffect(() => {
        if (selectedStation) {
            map.flyTo([selectedStation.lat, selectedStation.lng], ZOOM_VALUE)
        }
    }, [selectedStation, map])

    return null
}

export function TrainMap({ selectedStation, stations, onStationClick }: TrainMapProps) {
    // Set default icon for all markers
    L.Marker.prototype.options.icon = defaultIcon

    return (
        <MapContainer 
            center={[51.1657, 10.4515]} 
            zoom={6} 
            className='h-full w-full'
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer url={TILE_LAYER} />
            {
                stations.map(station => {
                    // Determine which icon to use
                    const isSelected = selectedStation?.id === station.id
                    
                    return (
                        <Marker 
                            key={station.id} 
                            position={[station.lat, station.lng]}
                            icon={isSelected ? selectedIcon : defaultIcon}
                            eventHandlers={{
                                click: () => {
                                    onStationClick(station)
                                }
                            }}
                        />
                    )
                })
            }
            <MapUpdater selectedStation={selectedStation} />
        </MapContainer>
    )
}