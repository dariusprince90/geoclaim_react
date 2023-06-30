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

const validationSchema = yup.object({
  user_name: yup.string("Enter your name").required("User is required"),
  team_name: yup.string("Enter your team").required("Team is required"),
});

const SettingDialog = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      user_name: "",
      team_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
        <StyledForm onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="user_name"
            name="user_name"
            label="User"
            value={formik.values.user_name}
            onChange={formik.handleChange}
            error={formik.touched.user_name && Boolean(formik.errors.user_name)}
            helperText={formik.touched.user_name && formik.errors.user_name}
          />
          <TextField
            fullWidth
            id="team_name"
            name="team_name"
            label="Team"
            value={formik.values.team_name}
            onChange={formik.handleChange}
            error={formik.touched.team_name && Boolean(formik.errors.team_name)}
            helperText={formik.touched.team_name && formik.errors.team_name}
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
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
