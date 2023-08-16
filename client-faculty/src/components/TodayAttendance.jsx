import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { fetchTodayAttendanceApi } from "../apis/attendanceApi";
import AttendanceRegister from "./AttendanceRegister";

const TodayAttendance = () => {
  const [tabValue, setTabValue] = useState(0);

  const [classTabs, setClassTabs] = useState([]);
  const [allotmentList, setAllotmentList] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.token);
  const { palette } = useTheme();


  const createClassList = (data) => {
    const list = [];
    const newAllotmentList = [];
    for (let allotment in data) {
      const _class = data[allotment][0].class;
      list.push(_class.sem + " " + _class.section + " " + _class.dept.deptId);
      newAllotmentList.push({ [allotment]: data[allotment] });
    }
    setAllotmentList(newAllotmentList);
    setClassTabs(list);
  }

  useEffect(() => {
    console.log(allotmentList)
  }, [allotmentList]);  

  const fetchTodayAttendance = async () => {    
    try {
      const response = await fetchTodayAttendanceApi(token);
      console.log(response);
      createClassList(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(selectMenu("Today's Attendance"));
    fetchTodayAttendance();
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
          <Tabs centered onChange={(event, value) => setTabValue(value)} value={tabValue}>
            {classTabs.map((tab, index) => {
              return <Tab key={index} label={tab} value={index}></Tab>
            })}
            {/* <Tab label="4A CSE" value={0}></Tab>
            <Tab label="4B ISE" value={1}></Tab> */}
          </Tabs>
        </Box>
        <Divider />
        <Box sx={{ height: '90%' }}>
          <AttendanceRegister allotment={allotmentList[tabValue] && allotmentList[tabValue]} allotmentId={allotmentList[tabValue] && Object.keys(allotmentList[tabValue])[0]} />
        </Box>
      </Box>
      <Box className="sub" sx={{ backgroundColor: palette.background.alt, borderRadius: '10px' }}>
        {/* nothing as of now */}
      </Box>
    </Box>
  );
}

export default TodayAttendance;