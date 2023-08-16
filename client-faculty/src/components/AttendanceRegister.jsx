import { useEffect } from "react";
import { fetchStudentsFromClassApi } from "../apis/attendanceApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import StudentsAttendance from "./list renderers/StudentsAttendance";
import { Avatar, Box, Button, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const AttendanceRegister = ({ allotment, allotmentId }) => {
  const token = useSelector((store) => store.user.token);
  const [students, setStudents] = useState([]);
  const { palette } = useTheme();
  const getStudents = async () => {
    if (allotment) {
      try {
        const response = await fetchStudentsFromClassApi(allotment?.[allotmentId][0].class._id, token);
        setStudents(response);
      } catch (error) {
      }
    }
  }
  useEffect(() => {
    getStudents();
  }, [allotment, allotmentId])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px', height: '100%', padding: '20px 10px 0px', }}>
      <Box sx={{ textAlign: 'center', padding: '10px', backgroundColor: palette.secondary.main, borderRadius:'10px' }}>
        <Typography fontWeight={700} variant="h4" color={"white"}>
          {allotment?.[allotmentId][0].course.courseName}
        </Typography>
      </Box>
      <Box>
        <Tabs value={0} centered>
          <Tab label="Period 1" value={0}></Tab>
          <Tab label="Period 2" value={1}></Tab>
        </Tabs>
        <Divider />
      </Box>
      <div style={{ display: 'flex', width: '100%', height: '100%', overflowY: 'scroll', gap: '10px', padding: '10px' }}>
        <div style={{ flex: '1 0 55%' }}>
          <table style={{ backgroundColor: 'transparent', width: '100%' }}>
            <tbody>
              <tr className='list-item header' style={{ backgroundColor: "transparent" }}>
                <td>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Profile
                  </Typography>
                </td>
                <td>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    USN
                  </Typography>
                </td>
                <td>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Name
                  </Typography>
                </td>
                <td colSpan={2} style={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Attendance
                  </Typography>
                </td>
              </tr>
              <StudentsAttendance students={students} />
            </tbody>
          </table>
        </div>
      </div>
      <Button variant="contained" sx={{ width: '30%', margin: 'auto' }}>Submit</Button>
    </div >
  )
}

export default AttendanceRegister;