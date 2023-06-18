import { Avatar, Box, Typography } from "@mui/material"
import '../../styles/index.css';

const Header = () => {
  return (
    <div className="flex-row f-between pad-1" style={{ 'backgroundColor': "rgb(250, 250, 250)" }}>
      <Typography>
        ADMIN PANEL
      </Typography>
      <Avatar></Avatar>
    </div>
  );
}

export default Header;