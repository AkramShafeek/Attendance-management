import { useTheme } from "@emotion/react";
import { Avatar, Radio, Typography, Box, FormControl, RadioGroup, FormControlLabel } from "@mui/material";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";
import { useEffect, useState } from "react";

const StudentsAttendance = forwardRef(({ students }, ref) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');

  useImperativeHandle(ref, () => ({
    getAttendanceData() {
      return attendanceData;
    }
  }));

  const handleChange = (event) => {
    const [studentId, isPresent] = event.target.value.split(' ');
    console.log(studentId, isPresent);
    setAttendanceData({ ...attendanceData, [studentId]: { isPresent: isPresent === "true" ? true : false } });
    setSelectedValue(event.target.value);
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
            <FormControl sx={{ width: '100%', padding: '0px 0px' }}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={`${student._id} ${attendanceData?.[student._id]?.isPresent ? "true" : "false"}`}
                onChange={handleChange}
                row
                sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <FormControlLabel value={`${student._id} true`} control={<Radio />} label="Present" />
                <FormControlLabel value={`${student._id} false`} control={<Radio color="error" />} label="Absent" />
              </RadioGroup>
            </FormControl>
          </td>
        </tr>
      )
    })
  )
})

export default StudentsAttendance;

StudentsAttendance.defaultProps = {
  students: []
}