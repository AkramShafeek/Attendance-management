import { useEffect } from "react";
import { fetchStudentsFromClassApi, submitAttendanceApi } from "../apis/attendanceApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import StudentsAttendance from "./list renderers/StudentsAttendance";
import { Alert, Avatar, Box, Button, CircularProgress, Collapse, Divider, LinearProgress, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useRef } from "react";

const AttendanceRegister = ({ allotment, allotmentId }) => {
  const token = useSelector((store) => store.user.token);

  const [responseMsg, setResponseMsg] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const attendanceRef = useRef();
  const { palette } = useTheme();
  console.log("Mounted")
  const getStudents = async () => {
    if (allotment) {
      try {
        const response = await fetchStudentsFromClassApi(allotment?.class._id, token);
        console.log(response)
        setStudents(response);
      } catch (error) {
      }
    }
  }
  useEffect(() => {
    console.log(allotment);
    getStudents();
  }, [allotment, allotmentId])

  const fakePause = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000)
    })
  }

  const submitAttendanceHandler = async () => {
    const attendanceData = attendanceRef.current.getAttendanceData();
    const attendanceDataPayload = {};
    const attendanceDataArray = [];
    for (let key in attendanceData) {
      attendanceDataArray.push({ student: key, isPresent: attendanceData[key].isPresent });
    }
    // console.log(attendanceDataArray);
    // console.log(allotment);
    console.log(token);
    attendanceDataPayload.allotment = allotment.allotment;
    attendanceDataPayload.attendanceStatus = attendanceDataArray;
    attendanceDataPayload.period = allotment.period;
    console.log(attendanceDataPayload);

    try {
      setIsLoading(true);
      // await fakePause();
      const response = await submitAttendanceApi(attendanceDataPayload, token);
      console.log(response);
      setIsError(false);
      setResponseMsg(response);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setResponseMsg(error);
    } finally {
      setIsLoading(false);
      setShowStatus(true);
      setTimeout(() => {
        setShowStatus(false);
      }, 3000);
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px', height: '100%', padding: '20px 10px 0px', }}>
      {allotment && <Box sx={{ textAlign: 'center', padding: '10px', borderRadius: '10px' }}>
        <Typography fontWeight={700} variant="h4" color={"secondary"}>
          {allotment?.course?.courseName} | Period: {allotment?.period}
        </Typography>
      </Box>}
      <Collapse in={showStatus}>
        <Alert severity={isError ? 'error' : 'success'}>{responseMsg}</Alert>
      </Collapse>
      {/* <Box>
        <Tabs value={0} centered>
          <Tab label="Period 1" value={0}></Tab>
          <Tab label="Period 2" value={1}></Tab>
        </Tabs>
        <Divider />
      </Box> */}
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
                <td style={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Attendance
                  </Typography>
                </td>
              </tr>
              <StudentsAttendance students={students} ref={attendanceRef} />
            </tbody>
          </table>
        </div>
      </div>
      <Button variant="contained" disabled={isLoading} sx={{ width: '30%', margin: 'auto' }} onClick={submitAttendanceHandler}>
        {isLoading ? <CircularProgress /> : "Submit"}
      </Button>
    </div >
  )
}

export default AttendanceRegister;