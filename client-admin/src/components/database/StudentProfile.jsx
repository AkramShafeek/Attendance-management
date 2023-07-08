import { Avatar, Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";

const StudentProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const selectedStudent = useSelector((store) => store.student.selectedStudent);
  if (!selectedStudent)
    return null;
  return (
    <Box className="flex-column gap-2" sx={{ alignItems: 'center', width: "100%", marginTop: '30px' }}>
      <Avatar src={selectedStudent && selectedStudent.avatar} sx={{ width: '100px', height: '100px' }} />
      <div>
        <Typography fontSize={'small'}>
          <table>
            <tbody>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Name</Typography></td>
                <td>{selectedStudent.firstname + " " + selectedStudent.lastname}</td>
              </tr>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Usn</Typography></td>
                <td>{selectedStudent.usn}</td>
              </tr>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Email</Typography></td>
                <td>{selectedStudent.email}</td>
              </tr>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Dept</Typography></td>
                <td>{selectedStudent.dept}</td>
              </tr>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Semester</Typography></td>
                <td>{selectedStudent.sem}</td>
              </tr>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Year</Typography></td>
                <td>{selectedStudent.year}</td>
              </tr>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Section</Typography></td>
                <td>{selectedStudent.section}</td>
              </tr>
              {selectedStudent.phone.map((element, index) => {
                return (
                  <tr>
                    <td><Typography fontWeight={'bold'} fontSize={'small'}>{index === 0 && "Phone"}</Typography></td>
                    <td>{element}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Typography>
      </div>
    </Box >
  )
}

export default StudentProfile;