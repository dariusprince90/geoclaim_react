import { MapContainer, TileLayer } from "react-leaflet";
import Location from "./components/Location";
import NavBar from "./components/NavBar";
import CheckButton from "./components/CheckButton";
import { CookiesProvider } from "react-cookie";

const position = [52.158462573821, 6.4088820899768];

function App() {
  return (
    <CookiesProvider>
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
    </CookiesProvider>
  );
}

export default App;
