import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Offer, Location } from '../types';
import {DEFAULT_ZOOM} from '../const';

interface MapProps {
  offers: Offer[];
  location: Location;
  activeOfferId: string | null;
}

const defaultIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = L.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

export function Map({ offers, location, activeOfferId }: MapProps) {
  return (
    <MapContainer
      center={[location.latitude, location.longitude]}
      zoom={location.zoom ?? DEFAULT_ZOOM}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {offers.map((offer) => (
        <Marker
          key={offer.id}
          position={[offer.location.latitude, offer.location.longitude]}
          icon={offer.id === activeOfferId ? activeIcon : defaultIcon}
        />
      ))}
    </MapContainer>
  );
}
