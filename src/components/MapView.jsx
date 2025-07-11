import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import styled from 'styled-components';

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
