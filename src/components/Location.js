import { useState, useEffect } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import newMarker from "../assets/circle-regular.png";
// import newMarker from "../assets/gray_circles_rotate.gif";

const pointerIcon = new L.Icon({
  iconUrl: newMarker,
  iconSize: [25, 25],
  iconAnchor: [13, 13],
  popupAnchor: [-3, -26],
});

const Location = () => {
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    map.locate({
      setView: true,
    });
    map.on("locationfound", (event) => {
      setPosition(event.latlng);
      fetch(
        `https://www.geoclaim.nl:8080/api/v1/streets/getstreets?lat=${event.latlng.lat}&lon=${event.latlng.lng}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Do something with the fetched data
          console.log("locationfound :->", data);
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch request
          console.error(error);
        });
    });
  }, [map]);

  return position ? (
    <>
      <Marker icon={pointerIcon} position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </>
  ) : null;
};

export default Location;
