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
  const [selectedTeams, setSelectedTeams] = useState([]);

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
    const data = features.reduce((acc, feature) => {
      const allianceName = feature?.properties?.alliance_name;
      const teamName = feature?.properties?.team_name;
      const userName = feature?.properties?.user_name;

      if (!acc[allianceName]) {
        acc[allianceName] = {};
      }

      if (!acc[allianceName][teamName]) {
        acc[allianceName][teamName] = {};
      }

      if (!acc[allianceName][teamName][userName]) {
        acc[allianceName][teamName][userName] = [];
      }

      acc[allianceName][teamName][userName].push(feature);

      return acc;
    }, {});
    return data;
  }, [features]);

  return (
    <AppContext.Provider
      value={{
        userName,
        teamName,
        allianceName,
        position,
        features,
        results,
        selectedTeams,
        setSelectedTeams,
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
