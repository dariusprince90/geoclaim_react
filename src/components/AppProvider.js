import { useState, createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cookie, setCookie] = useCookies([
    "CTuser_name",
    "CTteam_name",
    "CTalliance_name",
    "CTakkoord",
  ]);
  const [userName, setUserName] = useState(() => cookie["CTuser_name"]);
  const [teamName, setTeamName] = useState(() => cookie["CTteam_name"]);
  const [allianceName, setAllianceName] = useState(
    () => cookie["CTalliance_name"]
  );
  const [position, setPosition] = useState();
  const [features, setFeatures] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserName = (name) => {
    setCookie("CTuser_name", name);
    setUserName(name);
  };

  const handleTeamName = (name) => {
    setCookie("CTteam_name", name);
    setTeamName(name);
  };

  const handleAllianceName = (name) => {
    setCookie("CTalliance_name", name);
    setAllianceName(name);
  };

  const results = useMemo(() => {
    if (!features) return null;
    const tColor = {};
    const data = features.reduce((acc, feature) => {
      const allianceName = feature?.properties?.alliance_name;
      const teamName = feature?.properties?.team_name;
      const userName = feature?.properties?.user_name;

      if (!acc[allianceName]) {
        acc[allianceName] = {};
      }

      if (!acc[allianceName][teamName]) {
        acc[allianceName][teamName] = {};
        tColor[`${allianceName}-${teamName}`] =
          colors[Object.keys(tColor).length % colors.length];
      }

      if (!acc[allianceName][teamName][userName]) {
        acc[allianceName][teamName][userName] = [];
      }

      acc[allianceName][teamName][userName].push(feature);

      return acc;
    }, {});
    return { data, tColor };
  }, [features]);

  return (
    <AppContext.Provider
      value={{
        userName,
        teamName,
        allianceName,
        position,
        features,
        results: results?.data,
        teamColor: results?.tColor,
        selectedUsers,
        setSelectedUsers,
        setFeatures,
        setPosition,
        handleUserName,
        handleTeamName,
        handleAllianceName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useApp = () => useContext(AppContext);

const colors = [
  "#ff0000",
  "#2c017f",
  "#01737f",
  "#ffd53e",
  "#ff005e",
  "#01167f",
  "#8e0784",
  "#5a017f",
  "#ff00c8",
  "#05cdd7",
  "#014b7f",
];
