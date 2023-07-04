import { useState, useEffect } from "react";
import { useMap, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import newMarker from "../assets/circle-regular.png";
import CheckButton from "./CheckButton";
import loadMarker from "../assets/gray_circles_rotate.gif";
import { useApp } from "./AppProvider";

const pointerIcon = new L.Icon({
  iconUrl: newMarker,
  iconSize: [25, 25],
  iconAnchor: [13, 13],
  popupAnchor: [-3, -26],
});

const loadIcon = new L.Icon({
  iconUrl: loadMarker,
  iconSize: [25, 25],
  iconAnchor: [13, 13],
  popupAnchor: [-3, -26],
});

const Location = () => {
  const map = useMap();
  const { userName, teamName, allianceName, position, setPosition } = useApp();
  const [isCheck, setIsCheck] = useState(true);
  const [roadSections, setRoadSections] = useState([]);
  const [searchId, setSearchId] = useState();

  useEffect(() => {
    if (!map) return;
    map.locate({
      setView: false,
      // setView: true,
    });
    map.on("locationfound", (event) => {
      setPosition({ lat: 52.158462573821, lng: 6.4088820899768 });
      // setPosition(event.latlng);
    });
  }, [map]);

  useEffect(() => {
    if (!position) return;
    getStreets();
  }, [position]);

  const getStreets = () => {
    fetch(
      `https://www.geoclaim.nl:8080/api/v1/streets/getstreets?lat=${position.lat}&lon=${position.lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("getstreets :->", data);
        setSearchId(data?.search_id);
        setRoadSections(data?.road_sections);
        if (data?.road_sections.length > 0) setIsCheck(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const claimStreet = () => {
    fetch(
      `https://www.geoclaim.nl:8080/api/v1/streets/claimstreet?search_id=${searchId}&map_id=${1}&user_name=${userName}&team_name=${teamName}&alliance_name=${allianceName}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("claimstreet :->", data);
        getClaimStreet();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getClaimStreet = () => {
    fetch(
      `https://www.geoclaim.nl:8080/api/v1/streets/get_claim_street?map_id=1&lat=${position.lat}&lon=${position.lng}&archived=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("get_claim_street :->", data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick = () => {
    if (isCheck) {
      console.log("Check");
      getStreets();
    } else {
      console.log("Claim");
      claimStreet();
    }
  };

  if (!position) return null;

  return (
    <>
      <CheckButton isCheck={isCheck} onClick={handleClick} />

      <Marker icon={!position ? loadIcon : pointerIcon} position={position}>
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
