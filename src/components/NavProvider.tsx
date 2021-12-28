import React, { useContext, useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { connect, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Grid,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { ColorModeContext } from "../contexts/colorModeContext";
import { Link } from "react-router-dom";
import { authActions } from "../actions/authActions";
import constants from "../constants";
import { history } from "../browserHistory";
import { AppDispatch } from "../store";
import { GlobalState } from "../reducers";
import { User } from "../services/authService";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== "open"})(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin  (theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }),
);

const LoggedOutList = () => {
  return (
    <List>
      <ListItem 
        component={Link} 
        to="/"
        button 
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Accueil" />
      </ListItem>
      <ListItem 
        component={Link} 
        to="/login"
        button 
      >
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary="Se connecter" />
      </ListItem>
    </List>
  );
};

const LoggedInList: React.FC = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(authActions.logout());
    history.push("/");
  };

  return (
    <List>
      <ListItem 
        component={Link} 
        to="/"
        button 
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Accueil" />
      </ListItem>
      <ListItem 
        component={Link} 
        to="/dashboard"
        button 
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Tableau de bord" />
      </ListItem>
      <ListItem 
        component={Link} 
        to="/clients"
        button 
      >
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>
      <ListItem 
        component={Link} 
        to="/items"
        button 
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Objets" />
      </ListItem>
      <ListItem
        onClick={handleLogout}
        button 
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Se déconnecter" />
      </ListItem>
    </List>
  );
};

type NavProviderProps = {
  dispatch: AppDispatch;
  user?: User;
}
const NavProvider: React.FC<NavProviderProps> = ({
  children,
  user,
}) => {
  const [open, setOpen] = useState(false);
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid
            direction="row"
            justifyContent="space-between"        
            container
          >
            <Grid item>
              <Typography variant="h6" noWrap component="div">
                Gestion des stocks
              </Typography>
            </Grid>
            {user?.email && user?.role
              ?
              <Grid item>
                <Typography variant="body2" component="div">
                  Connecté en tant que {user.email} ({user.role})
                </Typography>
              </Grid>
              : null}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {localStorage.getItem(constants.USER_LOCAL_STORAGE_KEY)
          ? <LoggedInList />
          : <LoggedOutList />
        }
        <Divider />
        <List>
          <ListItem button onClick={toggleColorMode}>
            <ListItemIcon>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </ListItemIcon>
            <ListItemText primary="Changer le mode" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const { auth } = state;
  const { user } = auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(NavProvider);
