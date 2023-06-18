import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from "./pages/Authentication";
import Admin from "./pages/Admin";
import Calendar from './components/Calendar';
import Database from './components/Database';
import Class from './components/Class';
import Approval from './components/Approval';
import Timetable from './components/Timetable';

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="calendar" element={<Calendar />} />
          <Route path="database" element={<Database />} />
          <Route path="class" element={<Class />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="approval" element={<Approval />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
