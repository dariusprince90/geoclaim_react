import { useState, useEffect } from "react";
import { useMap, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import newMarker from "../assets/circle-regular.png";
import CheckButton from "./CheckButton";
import loadMarker from "../assets/gray_circles_rotate.gif";
import { useApp } from "./AppProvider";
import { darkenColor, stringToColorCode } from "./Team";

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
    setPosition,
    setFeatures,
    selectedTeams,
  } = useApp();
  const [isCheck, setIsCheck] = useState(true);
  const [roadSections, setRoadSections] = useState([]);
  const [searchId, setSearchId] = useState();

  useEffect(() => {
    if (!map) return;
    map.locate({
      setView: true,
    });
    map.on("locationfound", (event) => {
      setPosition(event.latlng);
    });
  }, [map, setPosition]);

  useEffect(() => {
    if (!position) return;
    getStreets();
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
        console.log("get_claim_street :->", data?.claimed_streets?.features);
        setFeatures(data?.claimed_streets?.features);
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
          color={darkenColor(stringToColorCode(allianceName + teamName), 0)}
          opacity={1}
          weight={12}
          key={road.road}
          positions={road.coordinates.map((coord) => [coord[1], coord[0]])}
        >
          <Popup>{road.road}</Popup>
        </Polyline>
      ))}
      {features
        ?.filter((feature) =>
          selectedTeams.find(
            (t) =>
              t ===
              `${feature.properties.alliance_name}-${feature.properties.team_name}`
          )
        )
        .map((feature, index) => (
          <Polyline
            color={darkenColor(
              stringToColorCode(
                feature.properties.alliance_name + feature.properties.team_name
              ),
              0
            )}
            opacity={feature.properties.strength / 100}
            weight={12}
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
