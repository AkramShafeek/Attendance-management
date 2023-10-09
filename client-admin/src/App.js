import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from "./pages/Authentication";
import Admin from "./pages/Admin";
import Calendar from './components/Calendar';
import Database from './components/Database';
import Class from './components/Class';
import Approval from './components/Approval';
import Timetable from './components/Timetable';
import { useEffect, useMemo } from 'react';
import Navigator from './components/utils/Navigator';
import { createTheme } from '@mui/material';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from './theme';

import './styles/index.css';
import './styles/list.css';
import './styles/admin.css';
import './styles/timetable.css';
import { useSelector } from 'react-redux';

function App() {
  const mode = useSelector((store) => store.mode.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode ? 'dark' : 'light')), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/home" element={<Admin />}>
            <Route path="" element={<Navigator />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="database" element={<Database />} />
            <Route path="class" element={<Class />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="approval" element={<Approval />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
