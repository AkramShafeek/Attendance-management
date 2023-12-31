import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import Dept from "./database/Dept";
import Course from "./database/Course";
import Student from "./database/Student";
import Faculty from "./database/Faculty";
import StudentProfile from "./database/StudentProfile";
import FacultyProfile from "./database/FacultyProfile";
import { useTheme } from "@emotion/react";
import Class from "./database/Class";

const Database = () => {
  const [tabValue, setTabValue] = useState(0);

  const dispatch = useDispatch();
  const { palette } = useTheme();

  useEffect(() => {
    dispatch(selectMenu('Database'));
  }, []);
  return (
    <Box className="content flex-row gap-1">
      <Box className="main" sx={{
        height: '100%',
        position: 'relative',
        backgroundColor: palette.background.alt,
        borderRadius: '10px'
      }}>
        <Box>
          <Tabs onChange={(event, value) => setTabValue(value)} value={tabValue}>
            <Tab label="Dept" value={0}></Tab>
            <Tab label="Course" value={1}></Tab>
            <Tab label="Class" value={2}></Tab>
            <Tab label="Faculty" value={3}></Tab>
            <Tab label="Student" value={4}></Tab>
          </Tabs>
        </Box>
        <Divider />
        <Box sx={{overflowY: 'scroll',height:'80%'}}>
          {tabValue === 0 && <Dept />}
          {tabValue === 1 && <Course />}
          {tabValue === 2 && <Class />}
          {tabValue === 3 && <Faculty />}
          {tabValue === 4 && <Student />}
        </Box>
      </Box>
      <Box className="sub" sx={{ backgroundColor: palette.background.alt, borderRadius: '10px' }}>
        {tabValue === 3 && <FacultyProfile />}
        {tabValue === 4 && <StudentProfile />}
      </Box>
    </Box>
  );
}

export default Database;