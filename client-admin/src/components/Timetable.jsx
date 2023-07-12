import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const Timetable = () => {
  const [tabValue, setTabValue] = useState(0);

  const dispatch = useDispatch();
  const { palette } = useTheme();

  useEffect(() => {
    dispatch(selectMenu('Timetable'));
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
            <Tab label="Class timetables" value={0}></Tab>
            <Tab label="Faculty timetables" value={1}></Tab>            
          </Tabs>
        </Box>
        <Divider />
        <Box>
          {tabValue === 0 && <div>Class timetable</div>}
          {tabValue === 1 && <div>Faculty timetable</div>}          
        </Box>
      </Box>
      <Box className="sub" sx={{ backgroundColor: palette.background.alt, borderRadius: '10px' }}>
        {tabValue === 0 && <div>class time table sub</div>}
        {tabValue === 1 && <div>faculty timetable sub</div>}
      </Box>
    </Box>
  );
}

export default Timetable;