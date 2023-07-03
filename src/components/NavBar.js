import { useState } from "react";
import styled from "styled-components";
import { Menu } from "@mui/icons-material";
import SettingDialog from "./SettingDialog";
import { IconButton } from "@mui/material";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Styled>
        <IconButton onClick={() => setOpen(true)}>
          <Menu sx={{ color: "#fff" }} />
        </IconButton>
        <span>geoClaim</span>
      </Styled>
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
