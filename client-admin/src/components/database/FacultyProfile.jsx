import { Avatar, Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";

const FacultyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const selectedFaculty = useSelector((store) => store.faculty.selectedFaculty);
  if (!selectedFaculty)
    return null;
  return (
    <Box className="flex-column gap-2" sx={{ alignItems: 'center', width: "100%", marginTop: '30px' }}>
      <Avatar src={selectedFaculty && selectedFaculty.avatar} sx={{ width: '100px', height: '100px' }} />
      <div>
        <Typography fontSize={'small'}>
          <table>
            <tbody>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Name</Typography></td>
                <td>{selectedFaculty.firstname + " " + selectedFaculty.lastname}</td>
              </tr>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Empid</Typography></td>
                <td>{selectedFaculty.empid}</td>
              </tr>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Email</Typography></td>
                <td>{selectedFaculty.email}</td>
              </tr>
              <tr>
                <td><Typography fontWeight={'bold'} fontSize={'small'}>Dept</Typography></td>
                <td>{selectedFaculty.dept}</td>
              </tr>
            </tbody>
          </table>
        </Typography>
      </div>
    </Box >
  )
}

export default FacultyProfile;