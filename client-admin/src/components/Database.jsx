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
        // borderLeft: '1px solid ' + palette.neutral.light,
        // borderRight: '1px solid ' + palette.neutral.light,        
        borderRadius: '10px'
      }}>
        <Box>
          <Tabs onChange={(event, value) => setTabValue(value)} value={tabValue}>
            <Tab label="Dept" value={0}></Tab>
            <Tab label="Course" value={1}></Tab>
            <Tab label="Faculty" value={2}></Tab>
            <Tab label="Student" value={3}></Tab>
          </Tabs>
        </Box>
        <Divider />
        <Box>
          {tabValue === 0 && <Dept />}
          {tabValue === 1 && <Course />}
          {tabValue === 2 && <Faculty />}
          {tabValue === 3 && <Student />}
        </Box>
      </Box>
      {/* <Divider sx={{
        height: '98%',
        width: '2px',
        backgroundColor: 'rgb(230, 230, 230)',
      }}></Divider> */}
      <Box className="sub" sx={{ backgroundColor: palette.background.alt,borderRadius: '10px' }}>
        {tabValue === 2 && <FacultyProfile />}
        {tabValue === 3 && <StudentProfile />}
      </Box>
    </Box>
  );
}

export default Database;