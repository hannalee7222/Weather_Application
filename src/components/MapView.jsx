import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapWrapper = styled.div`
  height: 300px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const MapView = ({ lat, lon }) => {
  if (!lat || !lon) return null;

  return (
    <MapWrapper>
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>현재 위치</Popup>
        </Marker>
      </MapContainer>
    </MapWrapper>
  );
};

export default MapView;
