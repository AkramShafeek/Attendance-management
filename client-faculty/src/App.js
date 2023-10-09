import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from './pages/Authentication';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from './theme';
import Test from './components/Test';
import Navigator from './components/utils/Navigator';
import Home from './pages/Home';
import TodayAttendance from './components/TodayAttendance';
import ManageAttendance from './components/ManageAttendance';
import MyTimetable from './components/MyTimetable';
import './styles/index.css';
import './styles/list.css';
import './styles/admin.css';
import './styles/timetable.css';

function App() {
  const mode = useSelector((store) => store.mode.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode ? 'dark' : 'light')), [mode]);
  return (
    <BrowserRouter basename={"/faculty"}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/home" element={<Home />}>
            <Route path="" element={<Navigator />} />            
            <Route path="test" element={<Test />} /> 
            <Route path="todayattendance" element={<TodayAttendance />} />
            <Route path="manageattendance" element={<ManageAttendance />} />        
            <Route path="mytimetable" element={<MyTimetable />} />        
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
