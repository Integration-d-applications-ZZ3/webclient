import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography
} from "@mui/material";
import React from "react";
// import GitHubIcon from "@mui/icons-material/GitHub";

const Landing: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1
      }}
    >
      <Grid
        spacing={2}
        container
      >
        <Grid
          item
          xs={12}
        >
          <div
            className="jumbotron-image"
            title="Image from Pexels"
          >
            <Typography
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                mx: 2,
                my: 1
              }}
              variant="h4"
            >
              Le stock, réinventé.
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                borderRightStyle: 0,
                mx: 2,
              }}
              variant="h2"
            >
              Katundu
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Card
            variant="elevation"
            sx={{
              height: "100%"
            }}
          >
            <CardContent>
              <Typography variant="h4">
                Un stock décentralisé
              </Typography>
              <List component="ul">
                <ListItem component="li">
                  &bull; Des milliers de produits à portée de main
                </ListItem>
                <ListItem component="li">
                  &bull; {"Gardez une trace de tout"}
                </ListItem>
                <ListItem component="li">
                  &bull; {"Passez vos commandes depuis l'application mobile"}
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Card
            variant="elevation"
            sx={{
              height: "100%"
            }}
          >
            <CardContent>
              <Typography variant="h4">
                Une gestion simplifiée
              </Typography>
              <List component="ul">
                <ListItem component="li">
                  &bull; Simple gestion des clients
                </ListItem>
                <ListItem component="li">
                  &bull; {"Passez commande en un clin d'œil"}
                </ListItem>
                <ListItem component="li">
                  &bull; {"Consultez l'historique de vos commandes"}
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid
          item
          xs={12}
        >
          <Card>
            <CardContent>
              <Typography variant="body1">
                {"Client web du projet d'intégration d'applications de..."}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<GitHubIcon />}
                href=""
              >
                Dépôt GitHub
              </Button>
            </CardActions>
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Landing;
