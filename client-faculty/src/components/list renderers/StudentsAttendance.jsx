import { useTheme } from "@emotion/react";
import { Avatar, Radio, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const StudentsAttendance = ({ students }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event) => {
    console.log(event.target.value);
    const currStatus = attendanceData[event.target.value].isPresent;
    setAttendanceData({ ...attendanceData, [event.target.value]: { isPresent: !currStatus } });
  };
  useEffect(() => {
    console.log(students);
    const newAttendanceData = {};
    for (let student of students)
      newAttendanceData[student._id] = { isPresent: true }
    console.log(newAttendanceData)
    setAttendanceData(newAttendanceData);
  }, [students])

  useEffect(() => {
    console.log(attendanceData);
  }, [attendanceData])
  const { palette } = useTheme();
  return (
    students.map((student, index) => {
      return (
        <tr className="list-item" key={index}
          style={{ backgroundColor: index % 2 === 0 ? palette.neutral.light : 'transparent' }}>
          <td>
            <Avatar src={student.avatar}></Avatar>
          </td>
          <td>
            <Typography sx={{ fontSize: 'small' }}>
              {student.usn}
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontSize: 'small' }}>
              {student.firstname + " " + student.lastname}
            </Typography>
          </td>
          <td>
            <Radio
              checked={attendanceData ? (attendanceData[student._id] ? attendanceData[student._id].isPresent : false) : false}
              onChange={handleChange}
              value={student._id}
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
            Present
          </td>
          <td>
            <Radio
              checked={attendanceData ? (attendanceData[student._id] ? !attendanceData[student._id].isPresent : false) : false}
              onChange={handleChange}
              color="error"
              value={student._id}
              name="radio-buttons"
              inputProps={{ 'aria-label': 'B' }}
            />
            Absent
          </td>
        </tr>
      )
    })
  )
}

export default StudentsAttendance;

StudentsAttendance.defaultProps = {
  students: []
}