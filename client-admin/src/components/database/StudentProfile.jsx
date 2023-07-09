import styled from "@emotion/styled";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";

const Attribute = styled(Typography)({
  fontWeight: 'bold',
  fontSize: 'meduim'
})

const td = styled('td')({
  padding:'0px'
})

const StudentProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const selectedStudent = useSelector((store) => store.student.selectedStudent);
  if (!selectedStudent)
    return null;
  return (
    <Box className="flex-column gap-2" sx={{ alignItems: 'center', width: "100%", marginTop: '30px' }}>
      <Avatar src={selectedStudent && selectedStudent.avatar} sx={{ width: '100px', height: '100px' }} />
      <div>
        <table>
          <tbody>
            <tr>
              <td><Attribute>Name</Attribute></td>
              <td>{selectedStudent.firstname + " " + selectedStudent.lastname}</td>
            </tr>
            <tr>
              <td><Attribute>Usn</Attribute></td>
              <td>{selectedStudent.usn}</td>
            </tr>
            <tr>
              <td><Attribute>Email</Attribute></td>
              <td>{selectedStudent.email}</td>
            </tr>
            <tr>
              <td><Attribute>Dept</Attribute></td>
              <td>{selectedStudent.class && selectedStudent.class.dept && selectedStudent.class.dept.deptName}</td>
            </tr>
            <tr>
              <td><Attribute>Semester</Attribute></td>
              <td>{selectedStudent.class && selectedStudent.class.sem}</td>
            </tr>
            <tr>
              <td><Attribute>Year</Attribute></td>
              <td>{selectedStudent.class && selectedStudent.class.year}</td>
            </tr>
            <tr>
              <td><Attribute>Section</Attribute></td>
              <td>{selectedStudent.class && selectedStudent.class.section}</td>
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
      </div>
    </Box >
  )
}

export default StudentProfile;