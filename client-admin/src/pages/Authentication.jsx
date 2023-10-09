import { useTheme } from "@emotion/react";
import { Box, Paper, Button, Divider, TextField, Alert, Collapse, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis/authApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo, setToken } from "../redux/features/userSlice";

const Authentication = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const pause = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    })
  }
  const login = async () => {
    try {
      setIsLoading(true);

      // fake loading
      await pause();

      const response = await loginApi({ email, password });
      console.log(response);
      dispatch(setUserInfo(response.user));
      dispatch(setToken(response.token));
      navigate("home");
    } catch (error) {
      console.log(error);
      setIsError(true);
      setErrorMsg(error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);        
      }, 2000);
    }
  }

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
        <h2 style={{ marginBottom: '0px' }}>ADMIN LOGIN</h2>
        <Divider sx={{ width: '100%' }} />
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', padding: '45px' }}>
          <TextField label="username" fullWidth value={email} onChange={(event) => setEmail(event.target.value)}></TextField>
          <TextField label="password" type="password" fullWidth value={password} onChange={(event) => setPassword(event.target.value)}></TextField>
        </Box>
        <Collapse in={isError}>
          <Alert severity="error">{errorMsg}</Alert>
        </Collapse>
        <Divider sx={{ width: '100%' }} />
        <Button variant="contained" sx={{ width: '70%', marginBottom: '20px' }} disabled={isLoading} onClick={login}>
          {isLoading ? <CircularProgress /> : "Login"}
        </Button>
      </Paper>
    </Box>
  );
}

export default Authentication;