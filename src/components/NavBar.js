import { useEffect, useState } from "react";
import styled from "styled-components";
import { Menu, People } from "@mui/icons-material";
import SettingDialog from "./SettingDialog";
import { IconButton, Drawer } from "@mui/material";
import TeamPanel from "./Team";
import { useApp } from "./AppProvider";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const { teamName, userName } = useApp();

  useEffect(() => {
    if (!teamName || !userName) {
      setOpen(true);
    }
  }, [teamName, userName]);
  return (
    <>
      {!openTeam && (
        <Styled>
          <IconButton onClick={() => setOpen(true)}>
            <Menu sx={{ color: "#fff" }} />
          </IconButton>
          <span>geoClaim</span>
          <IconButton onClick={() => setOpenTeam(true)}>
            <People sx={{ color: "#fff" }} />
          </IconButton>
        </Styled>
      )}
      <Drawer
        anchor="right"
        open={openTeam}
        onClose={() => setOpenTeam(false)}
        sx={{
          ".MuiPaper-root": {
            backgroundColor: "#00000022",
            maxWidth: 400,
            overflowX: "hidden",
          },
        }}
      >
        <TeamPanel />
      </Drawer>
      <SettingDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default NavBar;

const Styled = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  color: #fff;
  font-size: 20px;
  padding: 10px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  width: 100%;
  z-index: 999;
`;
