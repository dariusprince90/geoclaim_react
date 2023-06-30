import { MapContainer, TileLayer } from "react-leaflet";
import Location from "./components/Location";
import NavBar from "./components/NavBar";
import CheckButton from "./components/CheckButton";

const position = [51.505, -0.09];

function App() {
  return (
    <>
      <NavBar />
      <MapContainer
        center={position}
        className="map"
        zoom={17}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Location />
      </MapContainer>
      <CheckButton />
    </>
  );
}

export default App;
