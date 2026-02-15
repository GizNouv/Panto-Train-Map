import React from 'react'
import type { Station } from '../types'

interface SidebarProps {
    stations: Station[]
    filterValue: string
    onFilterChange: (value: string) => void
    onStationClick: (station: Station) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
    stations,
    filterValue,
    onFilterChange,
    onStationClick
}) => {
    return (
        <aside className="w-80 h-full flex flex-col bg-slate-50 border-r border-slate-200 shadow-lg z-10">
            {/* Header & Filter */}
            <div className="p-4 bg-white border-b border-slate-200">
                <h1 className="text-xl font-bold text-slate-800 mb-4">Train Stations</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Filter by city..."
                        value={filterValue}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {filterValue && (
                        <button
                            onClick={() => onFilterChange('')} // 
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Stations List */}
            <div className="flex-1 overflow-y-auto">
                {stations.length > 0 ? (
                    stations.map((station) => (
                        <div
                            key={station.id}
                            onClick={() => onStationClick(station)} // 
                            className="p-4 border-b border-slate-100 bg-white hover:bg-blue-50 cursor-pointer transition-colors group"
                        >
                            <h3 className="font-semibold text-slate-800 group-hover:text-blue-700">
                                {station.name}
                            </h3>
                            <p className="text-sm text-slate-500 flex items-center mt-1">
                                <span className="mr-1 text-blue-500 italic">City:</span>
                                {station.city}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-slate-400">
                        No stations found for "{filterValue}"
                    </div>
                )}
            </div>
        </aside>
    )
}