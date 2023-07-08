import { Avatar, Box, Icon, IconButton, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { depts } from "../sampleData";
import { useDispatch } from "react-redux";
import { selectStudent, openEditModal } from "../../../redux/features/studentSlice";
import { useTheme } from "@emotion/react";
// import { selectStudent } from "../../redux/features/studentSlice";

const getDept = (deptId) => {
  for (let dept of depts)
    if (dept._id.$oid === deptId)
      return dept.deptName;
}


const StudentListItem = (props) => {
  const dispatch = useDispatch();

  const { list } = props;
  const { palette } = useTheme();

  const handleSelectClick = (student) => {
    dispatch(selectStudent(student));
  }

  const handleEditClick = () => {
    handleSelectClick();
    dispatch(openEditModal());
  }

  const getBackgroundColor = (index) => {
    
  }

  return (
    list.map((student, index) =>
      <tr className="list-item"
        onClick={() => handleSelectClick(student)}
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
          <Typography sx={{ fontSize: 'small' }}>
            {student.dept}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small', textAlign: 'center' }}>
            {student.sem}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small', textAlign: 'center' }}>
            {student.section}
          </Typography>
        </td>
        <td style={{ marginRight: '10px', textAlign: 'right' }}>
          <IconButton onClick={handleEditClick}>
            <Icon>
              <EditRoundedIcon color="secondary" />
            </Icon>
          </IconButton>
          <IconButton>
            <Icon>
              <DeleteIcon color="error" />
            </Icon>
          </IconButton>
        </td>
      </tr >)
  )
}

export default StudentListItem;