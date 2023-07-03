import { useState, useEffect } from "react";
import { useMap, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import newMarker from "../assets/circle-regular.png";
import { useCookies } from "react-cookie";
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
  const [roadSections, setRoadSections] = useState([]);
  const [, setCookie] = useCookies(["search_id"]);

  useEffect(() => {
    if (!map) return;
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
          if (data?.search_id) setCookie("search_id", data?.search_id);
          setRoadSections(data?.road_sections);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [map, setCookie]);

  if (!position) return null;

  return (
    <>
      <Marker icon={pointerIcon} position={position}>
        <Popup>You are here</Popup>
      </Marker>

      {roadSections?.map((road) => (
        <Polyline
          color={"red"}
          opacity={0.7}
          weight={12}
          key={road.road}
          positions={road.coordinates.map((coord) => [coord[1], coord[0]])}
        >
          <Popup>{road.road}</Popup>
        </Polyline>
      ))}
    </>
  );
};

export default Location;
