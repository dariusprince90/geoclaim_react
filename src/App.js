import { MapContainer, TileLayer } from "react-leaflet";
import Location from "./components/Location";
import { CookiesProvider } from "react-cookie";
import AppProvider from "./components/AppProvider";
import NavBar from "./components/NavBar";

const defaultPosition = [52.158462573821, 6.4088820899768];

function App() {
  return (
    <CookiesProvider>
      <AppProvider>
        <NavBar />
        <MapContainer
          center={defaultPosition}
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
      </AppProvider>
    </CookiesProvider>
  );
}

export default App;
