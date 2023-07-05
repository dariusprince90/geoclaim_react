import { Button, styled } from "@mui/material";

const CheckButton = ({ isCheck = true, ...rest }) => {
  return (
    <Styled color={isCheck ? "primary" : "warning"} {...rest}>
      {isCheck ? "Check" : "Claim"}
    </Styled>
  );
};

export default CheckButton;

const Styled = styled(Button)({
  position: "fixed",
  bottom: "10%",
  left: "50%",
  textTransform: "none",
  transform: "translate(-50%, -50%)",
  zIndex: 999,
});

Styled.defaultProps = { variant: "contained" };
