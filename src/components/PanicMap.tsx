// src/components/PanicMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function PanicMap({ panics }: { panics: any[] }) {
  return (
     <div className="h-full w-full">
      <MapContainer 
        center={[-26.099712, 28.0559616]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {panics.map(panic => (
          <Marker
            key={panic.id}
            position={[parseFloat(panic.latitude), parseFloat(panic.longitude)]}
            icon={defaultIcon}
          >
            <Popup className="custom-popup">
              <div className="space-y-1">
                <h3 className="font-bold">{panic.panic_type || 'Emergency'}</h3>
                <p className="text-sm">{panic.details || 'No details provided'}</p>
                <p className="text-xs text-gray-500">
                  {new Date(panic.created_at).toLocaleString()}
                </p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  panic.status.id === 1 ? 'bg-yellow-100 text-yellow-800' :
                  panic.status.id === 2 ? 'bg-red-100 text-red-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {panic.status.name}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}