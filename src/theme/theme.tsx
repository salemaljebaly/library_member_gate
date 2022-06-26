import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "ltr",
  typography:{
    fontFamily :[
      'Almarai', "sans-serif"
    ].join(','),
  },
  palette: {
    primary: {
      main: "#734E20",
    },
    secondary: {
      main: "#F2A950",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;