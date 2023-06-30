import { Button, styled } from "@mui/material";

const CheckButton = () => {
  return <Styled>Check</Styled>;
};

export default CheckButton;

const Styled = styled(Button)({
  position: "absolute",
  top: "90%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 999,
});

Styled.defaultProps = { variant: "contained" };
