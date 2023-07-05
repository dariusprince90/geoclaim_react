import { useState } from "react";
import styled from "styled-components";
import { Menu, People } from "@mui/icons-material";
import SettingDialog from "./SettingDialog";
import { IconButton, Drawer } from "@mui/material";
import TeamPanel from "./Team";
import { useApp } from "./AppProvider";

const NavBar = () => {
  const { modalOpen, setModalOpen } = useApp();
  const [openTeam, setOpenTeam] = useState(false);

  return (
    <>
      {!openTeam && (
        <Styled>
          <IconButton onClick={() => setModalOpen(true)}>
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
      <SettingDialog open={modalOpen} handleClose={() => setModalOpen(false)} />
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
