import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";
import { Box, Divider, Tab, Tabs, Typography, LinearProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
import { fetchTodayAttendanceApi } from "../apis/attendanceApi";
import AttendanceRegister from "./AttendanceRegister";

const TodayAttendance = () => {
  const [tabValue, setTabValue] = useState(0);

  const [classTabs, setClassTabs] = useState([]);
  const [allotmentList, setAllotmentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.token);
  const { palette } = useTheme();


  const createClassList = (data) => {
    const list = [];
    const newAllotmentList = [];
    for (let allotment in data) {
      const _class = data[allotment].class;
      const period = data[allotment].period;
      list.push(_class.sem + " " + _class.section + " " + _class.dept.deptId);
      newAllotmentList.push(data[allotment]);
    }
    setAllotmentList(newAllotmentList);
    setClassTabs(list);
  }

  useEffect(() => {
    console.log(allotmentList)
  }, [allotmentList]);

  const fetchTodayAttendance = async () => {
    try {
      setLoading(true);
      const response = await fetchTodayAttendanceApi(token);
      console.log(response);
      createClassList(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        {loading && <LinearProgress sx={{ height: '5px', borderRadius: '10px' }} color="secondary" />}
        <Box sx={{
          mt: '10px',
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}>
          <Tabs centered
            onChange={(event, value) => setTabValue(value)}
            value={tabValue}
            sx={{
              width: 'fit-content',
              background: palette.secondary.main,
              borderRadius: '10px',
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;'
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "white"
              }
            }}>
            {classTabs.map((tab, index) => {
              return <Tab
                key={index}
                label={tab}
                value={index}
                sx={{
                  '&.Mui-selected': {
                    color: 'white'
                  },
                  fontWeight: 700
                }}></Tab>
            })}
            {/* <Tab label="4A CSE" value={0}></Tab>
            <Tab label="4B ISE" value={1}></Tab> */}
          </Tabs>
        </Box>
        <Box sx={{ height: '90%' }} id="thisbox">
          {allotmentList.length > 0 && <AttendanceRegister allotment={allotmentList[tabValue]} />}
          {!allotmentList.length && <Typography variant="h2" fontWeight={700} ml={10}>No classes today</Typography>}
        </Box>
      </Box>
      <Box className="sub" sx={{ backgroundColor: palette.background.alt, borderRadius: '10px' }}>
        {/* nothing as of now */}
      </Box>
    </Box>
  );
}

export default TodayAttendance;