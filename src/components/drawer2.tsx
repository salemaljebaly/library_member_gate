import * as React from "react";
import { styled, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InfoIcon from "@mui/icons-material/Info";
import Strings from "../utils/Strings";
import { ListItemButton, Menu, MenuItem, ListItem, Theme } from "@mui/material";
import AppLogo from "./appLogo";
import { AccountCircle } from "@mui/icons-material";
import theme from "../theme/theme";
import {
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { UserState } from "../features/auth/AuthModel";
import { AppDispatch } from "../app/store";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Books from "../pages/books/Books";
import AddMember from "../pages/member/addMember";
import Barrows from "../pages/barrows/Barrows";
import AddBarrow from "../pages/barrows/addBarrow";
import { findById } from "../features/member/membersSlice";
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
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// -------------------------------------------------------------------------------- //
const linkColor = '#734E20'; 
const linkStyle = {
  // margin: "1rem",
  textDecoration: "none",
  color: linkColor,
};

// -------------------------------------------------------------------------------- //

export default function MiniDrawer() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // ----------------------------------------------------------------------------------- //
  // desctruct memebers from user state [ userSlice]
  const { member , isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.auth
  ) as UserState;
  // ----------------------------------------------------------------------------------- //

  React.useEffect(() => {
    if (!member) {
      navigate("/login");
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const [menuSelect, setMenuSelected] = React.useState({
    member: false,
    book: false,
    barrow : false
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserProfile = () => {
    const memberId = JSON.parse(localStorage.getItem("member")!).id;
    console.log('id === ' + memberId)
    dispatch(findById(Number(memberId)))
    navigate(`member/${memberId}`);
    setAnchorEl(null);
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {Strings.appName}
          </Typography>
          <IconButton
            sx={{
              marginLeft: "auto",
            }}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleUserProfile}>{Strings.myProfile}</MenuItem>
            <MenuItem onClick={handleLogout}>{Strings.logout}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <AppLogo imageSize={100} />
        <Divider />

        {/* // --------------------------------------------------------------- // */}
        <List>


  
          <Link to="/books" style={linkStyle}>
            <ListItemButton
              selected={menuSelect.book}
              onClick={() => setMenuSelected({
                member :  false,
                book : true,
                barrow : false
            
              })}
            >
              <ListItemIcon>
                
                <MenuBookRoundedIcon  sx={{ color: linkColor }} />
              </ListItemIcon>
              <ListItemText primary={Strings.books} />
            </ListItemButton>
          </Link>

          <Link to="/barrows" style={linkStyle}>
            <ListItemButton
              selected={menuSelect.barrow}
              onClick={() => setMenuSelected({
                member :  false,
                book : false,
                barrow : true
            
              })}
            >
              <ListItemIcon>
                <BookmarkAddIcon  sx={{ color: linkColor }} />
              </ListItemIcon>
              <ListItemText primary={Strings.barrows} />
            </ListItemButton>
          </Link>
        </List>
        <Divider />

        {/* // --------------------------------------------------------------- // */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* <DashBoardCards /> */}
        {/* <Box sx={{ marginBottom: 3 }} /> */}
        {/* <DataTable /> */}
        {/* <Register /> */}
        <Routes>
          <Route path="member" element={<AddMember />}>
            <Route path=":id" element={<AddMember />} />
          </Route>
          
          <Route path="books" element={<Books />} />
          
          <Route path="barrows" element={<Barrows/>} />
          <Route path="barrow" element={<AddBarrow />}>
            <Route path=":id" element={<AddBarrow />} />
          </Route>

        </Routes>
      </Box>
    </Box>
  );
}
