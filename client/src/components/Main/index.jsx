import "./styles.modules.css";
import ResponsiveAppBar from "../Menu/menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Main = () => {
  return (
    <div className="main_container">
      <ResponsiveAppBar />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
};

export default Main;
