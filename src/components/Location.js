import { useState, useEffect, useRef } from "react";
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
  const {
    userName,
    teamName,
    allianceName,
    position,
    features,
    teamColor,
    setModalOpen,
    setPosition,
    setFeatures,
    selectedUsers,
    setSelectedUsers,
  } = useApp();
  const [isCheck, setIsCheck] = useState(true);
  const [roadSections, setRoadSections] = useState([]);
  const [searchId, setSearchId] = useState();

  const markerRef = useRef(null);

  useEffect(() => {
    if (!map) return;
    map.locate({
      // setView: false,
      setView: true,
    });
    map.on("locationfound", (event) => {
      // setPosition({ lat: 52.158462573821, lng: 6.4088820899768 });
      setPosition(event.latlng);
    });
  }, [map]);

  //On page load should show get_claimed_street data
  useEffect(() => {
    if (!position) return;
    getClaimStreet();
  }, [position, teamName, userName]);

  const getStreets = () => {
    fetch(
      `https://www.geoclaim.nl:8080/api/v1/streets/getstreets?lat=${position.lat}&lon=${position.lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("getstreets :->", data);
        setSearchId(data?.search_id);
        setRoadSections(data?.road_sections);
        if (data?.road_sections.length > 0) {
          setIsCheck(false);
        } else {
          setIsCheck(true);
          const marker = markerRef.current;
          if (marker) {
            marker.openPopup();
          }
        }
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
      `https://www.geoclaim.nl:8080/api/v1/streets/get_claim_street?map_id=1&lat=${position.lat}&lon=${position.lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("get_claim_street :->", data?.claimed_streets?.features);
        setFeatures(data?.claimed_streets?.features);
        setSelectedUsers(
          data?.claimed_streets?.features.map(
            (f) =>
              `${f.properties.alliance_name}-${f.properties.team_name}-${f.properties.user_name}`
          )
        );
        setIsCheck(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick = () => {
    if (isCheck) {
      console.log("Check Button Clicked!");
      getStreets();
      setSelectedUsers([]);
    } else {
      console.log("Claim Button Clicked!");
      if (!teamName || !userName) setModalOpen(true);
      else claimStreet();
    }
  };

  if (!position) return null;

  return (
    <>
      <CheckButton isCheck={isCheck} onClick={handleClick} />

      <Marker
        icon={!position ? loadIcon : pointerIcon}
        position={position}
        ref={markerRef}
      >
        <Popup>Geen weg binnen 10 meter van locatie</Popup>
      </Marker>

      {roadSections?.map((road) => (
        <Polyline
          color="#ff7800"
          opacity={1}
          weight={6}
          key={road.road}
          positions={road.coordinates.map((coord) => [coord[1], coord[0]])}
        >
          <Popup>{road.road}</Popup>
        </Polyline>
      ))}
      {features
        ?.filter((feature) =>
          selectedUsers.find(
            (t) =>
              t ===
              `${feature.properties.alliance_name}-${feature.properties.team_name}-${feature.properties.user_name}`
          )
        )
        .map((feature, index) => (
          <Polyline
            color={
              teamColor[
                `${feature.properties.alliance_name}-${feature.properties.team_name}`
              ]
            }
            opacity={feature.properties.strength / 100}
            weight={6}
            key={`feature-${index}`}
            positions={feature?.geometry?.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ])}
          >
            <Popup>
              <p>
                <span>Team: </span>
                {feature.properties.team_name}
              </p>
              <p>
                <span>User: </span>
                {feature.properties.user_name}
              </p>
            </Popup>
          </Polyline>
        ))}
    </>
  );
};

export default Location;
