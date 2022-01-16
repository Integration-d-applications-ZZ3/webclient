import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography
} from "@mui/material";
import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from "@mui/icons-material/Category";
// import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

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
                margin: 2
              }}
              variant="h4"
            >
              Le stock, réinventé.
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
                  <Button
                    startIcon={<CategoryIcon />}
                    variant="text"
                    size="small"
                    sx={{ ml: 1, my: 0 }}
                    component={Link}
                    to="/items"
                  >
                    Produits
                  </Button>
                </ListItem>
                <ListItem component="li">
                  &bull; {"Gardez une trace de tout"}
                  <Button
                    startIcon={<DashboardIcon />}
                    variant="text"
                    size="small"
                    sx={{ ml: 1, my: 0 }}
                    component={Link}
                    to="/dashboard"
                  >
                    Tableau de bord
                  </Button>
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
                  <Button
                    startIcon={<PeopleIcon />}
                    variant="text"
                    size="small"
                    sx={{ ml: 1, my: 0 }}
                    component={Link}
                    to="/clients"
                  >
                    Clients
                  </Button>
                </ListItem>
                <ListItem component="li">
                  &bull; {"Passez commande en un clin d'œil"}
                  <Button
                    startIcon={<LocalShippingIcon />}
                    variant="text"
                    size="small"
                    sx={{ ml: 1, my: 0 }}
                    component={Link}
                    to="/supplies"
                  >
                    Fournisseurs
                  </Button>
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
