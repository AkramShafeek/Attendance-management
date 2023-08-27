import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";
import { Box, Divider, Tab, Tabs, Typography, LinearProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
import { fetchTodayAttendanceApi, getStudentAttendance } from "../apis/attendanceApi";
import AttendanceCards from "./list renderers/AttendanceCards";

const Attendance = () => {
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.token);
  const { palette } = useTheme();

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await getStudentAttendance(token);
      console.log(response);
      setAttendanceData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    dispatch(selectMenu("Attendance"));
    fetchAttendance();
  }, []);

  const sampleAttendance = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box className="content flex-row gap-1">
      <Box className="main" sx={{
        height: '100%',
        position: 'relative',
        backgroundColor: palette.background.alt,
        borderRadius: '10px',
        overflowY: 'scroll'
      }}>
        <Box sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: '20px',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {attendanceData.map((attendance) => { return (<AttendanceCards attendanceData={attendance} />) })}
        </Box>
      </Box>
      <Box className="sub" sx={{ backgroundColor: palette.background.alt, borderRadius: '10px' }}>
        {/* nothing as of now */}
      </Box>
    </Box >
  );
}

export default Attendance;