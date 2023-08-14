import { useTheme } from "@emotion/react";
import { Box, Paper, Button, Divider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ width: '100%', height: '100%', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper sx={{
        width: '400px',
        // height: '500px',
        // padding: '40px',
        borderRadius: '5px',
        backgroundColor: palette.background.alt,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}>
        <h2 style={{ marginBottom: '0px' }}>FACULTY LOGIN</h2>
        <Divider sx={{ width: '100%' }} />
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', padding: '45px' }}>
          <TextField label="username" fullWidth></TextField>
          <TextField label="password" type="password" fullWidth></TextField>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Button variant="contained" sx={{ width: '70%', marginBottom: '20px' }} onClick={() => navigate("home")}>Login</Button>
      </Paper>
    </Box>
  );
}

export default Authentication;