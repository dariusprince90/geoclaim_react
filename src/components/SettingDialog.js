import {
  Dialog,
  TextField,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { useApp } from "./AppProvider";

const validationSchema = yup.object({
  user_name: yup.string("Enter your name").required("User is required"),
  team_name: yup.string("Enter your team").required("Team is required"),
});

const SettingDialog = ({ open, handleClose }) => {
  const {
    userName,
    teamName,
    handleUserName,
    handleTeamName,
    handleAllianceName,
  } = useApp();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      user_name: userName,
      team_name: teamName,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUserName(values.user_name);
      handleTeamName(values.team_name);
      handleAllianceName("");
      handleClose();
    },
  });

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ ml: "auto" }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Container fixed>
        <Typography variant="h3">geoClaim</Typography>
        <Typography variant="body1">
          Om straten te kunnen claimen is een <b>gebruikersnaam</b> en{" "}
          <b>team naam</b> nodig. Beide gegevens worden opgeslagen in een
          centrale database, daarnaast wordt deze informatie bewaard in een
          'cookie' zodat je deze niet vaker in hoeft te vullen.
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="user_name"
            name="user_name"
            label="User"
            value={values.user_name}
            onChange={handleChange}
            error={touched.user_name && Boolean(errors.user_name)}
            helperText={touched.user_name && errors.user_name}
          />
          <TextField
            fullWidth
            id="team_name"
            name="team_name"
            label="Team"
            value={values.team_name}
            onChange={handleChange}
            error={touched.team_name && Boolean(errors.team_name)}
            helperText={touched.team_name && errors.team_name}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ textTransform: "none" }}
          >
            akkoord
          </Button>
        </StyledForm>
        <Typography sx={{ mt: 3, mb: 2 }}>Veel speelplezier!</Typography>
        <Typography>
          Arjan Busger op Vollenbroek <br />
          Scouting Graaf Otto Groep, Lochem
        </Typography>
      </Container>
    </Dialog>
  );
};

export default SettingDialog;

const StyledForm = styled.form`
  margin-top: 2rem;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
