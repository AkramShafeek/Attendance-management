import { Avatar, Box, Typography } from "@mui/material"
import '../../styles/index.css';

const Header = () => {
  return (
    <div className="flex-row f-between pad-1" style={{ 'backgroundColor': "beige" }}>
      <Typography>
        ADMIN PANEL
      </Typography>
      <Avatar></Avatar>
    </div>
  );
}

export default Header;