import { useState, createContext, useContext } from "react";
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

  return (
    <AppContext.Provider
      value={{
        userName,
        teamName,
        allianceName,
        position,
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
