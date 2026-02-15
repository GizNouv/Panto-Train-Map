import { useState, useMemo } from 'react';
import { useStationsQuery } from './hooks/useStations';
import { Sidebar } from './components/Sidebar';
import { TrainMap } from './components/TrainMap';
import type { Station } from './types';

export default function App() {

  // 1. Data Fetching with loading/error states 
  const { data: stations, isLoading, isError } = useStationsQuery();

  // 2. Shared State for interaction and filtering
  const [filter, setFilter] = useState('');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  // 3. Derived State: Filtered stations (SOLID - SRP)
  const filteredStations = useMemo(() => {
    if (!stations) return [];
    if (!filter) return stations;
    return stations.filter((s) =>
      s.city.toLowerCase().includes(filter.toLowerCase())
    );
  }, [stations, filter]);

  // Handle Loading State
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600 font-medium">Fetching stations...</span>
      </div>
    );
  }

  // Handle Error State
  if (isError) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-red-50">
        <div className="text-red-600 font-medium">Failed to load station data. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* List View with Filter */}
      <Sidebar
        stations={filteredStations}
        filterValue={filter}
        onFilterChange={setFilter}
        onStationClick={setSelectedStation}
      />

      {/* Map Visualization */}
      <main className="flex-1 relative">
        <TrainMap
          stations={filteredStations}
          selectedStation={selectedStation}
        />
      </main>
    </div>
  );
}