import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { LinearProgress } from "@mui/material";
import { connect } from "react-redux";
import { authActions } from "../actions/authActions";
import { GlobalState } from "../reducers";
import { AppDispatch } from "../store";
import { Redirect } from "react-router-dom";
import { UserState } from "../reducers/authReducer";

type LoginProps = {
  dispatch: AppDispatch;
  auth: UserState;
}
const Login: React.FC<LoginProps> = ({
  dispatch,
  auth,
}) => {

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { email, password } = Object.fromEntries(
      new FormData(evt.currentTarget).entries()
    );
    authActions.login(email.toString(), password.toString())(dispatch);
  };

  if (auth.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="sm"
      >
        <form
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              my: 3
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Se connecter
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              gutterBottom
            >
              Se connecter au système
              de gestion des stocks
            </Typography>
          </Box>
          <Grid
            spacing={3}
            container
          >
            <TextField
              type="email"
              label="Adresse e-mail"
              margin="normal"
              name="email"
              fullWidth
            />
            <TextField
              type="password"
              label="Mot de passe"
              margin="normal"
              name="password"
              fullWidth
            />
          </Grid>
          <Box
            sx={{
              py: 2,
              ml: -3
            }}
          >
            <Button
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              fullWidth
            >
              Se connecter
            </Button>
            {auth.loggingIn
              ? (
                <Box sx={{ width: "100%", my: 3 }}>
                  <LinearProgress />
                </Box>
              )
              : null
            }
          </Box>
        </form>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps)(Login);
