import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import { useTheme } from "@emotion/react";
import ClassAllotment from "./class allotment/ClassAllotment";

const Class = () => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectMenu('Class Allotments'));
  }, []);

  const { palette } = useTheme();

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
            <Tab label="Class Allotment" value={0}></Tab>
          </Tabs>
        </Box>
        <Divider />
        <Box sx={{overflowY: 'scroll',height:'80%'}}>
          {tabValue === 0 && <ClassAllotment />}
        </Box>
      </Box>
      <Box className="sub" sx={{ backgroundColor: palette.background.alt, borderRadius: '10px' }}>
        {tabValue === 0 && <div>Section Yet to be implemented</div>}
      </Box>
    </Box>
  );
}

export default Class;