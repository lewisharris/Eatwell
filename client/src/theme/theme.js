import { createMuiTheme } from "@material-ui/core/styles";
import { lightBlue, indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: indigo
  },
  status: { danger: "orange" }
});

export default theme;
