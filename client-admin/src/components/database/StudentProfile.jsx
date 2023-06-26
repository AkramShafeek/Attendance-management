import { Avatar, Box, Typography } from "@mui/material"
import { useSelector } from "react-redux";

const StudentProfile = () => {
  const selectedStudent = useSelector((store) => store.student.selectedStudent);
  return (
    <Box className="flex-column gap-2" sx={{ alignItems: 'center', width: "100%" }}>
      <Avatar src={selectedStudent && selectedStudent.avatar} sx={{ width: '100px', height: '100px' }} />
      <Typography fontWeight={'bold'}>{selectedStudent ? selectedStudent.firstname + " " + selectedStudent.lastname : ""}</Typography>
      <Typography fontWeight={'lighter'}>{selectedStudent && selectedStudent.email}</Typography>
    </Box>
  )
}

export default StudentProfile;