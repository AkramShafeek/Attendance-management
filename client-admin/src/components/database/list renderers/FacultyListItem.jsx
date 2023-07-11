import { Avatar, Box, Icon, IconButton, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { depts, faculty } from "../sampleData";
import { useDispatch } from "react-redux";
import { selectFaculty, openEditModal, openDeleteModal } from "../../../redux/features/facultySlice";
import { useTheme } from "@emotion/react";
// import { selectStudent } from "../../redux/features/studentSlice";

const getDept = (deptId) => {
  for (let dept of depts)
    if (dept._id.$oid === deptId)
      return dept.deptName;
}


const FacultyListItem = (props) => {
  const dispatch = useDispatch();

  const { list } = props;
  const { palette } = useTheme();

  const handleSelectClick = (faculty) => {
    dispatch(selectFaculty(faculty));
  }

  const handleEditClick = () => {
    handleSelectClick();
    dispatch(openEditModal());
  }

  return (
    list.map((faculty, index) =>
      <tr className="list-item" key={faculty._id}
        onClick={() => dispatch(selectFaculty(faculty))}
        style={{ backgroundColor: index % 2 === 0 ? palette.neutral.light : 'transparent' }}>
        <td>
          <Avatar src={faculty.avatar}></Avatar>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {faculty.empid}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {faculty.firstname + " " + faculty.lastname}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {faculty.dept.deptId}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small', textAlign: 'center' }}>
            {faculty.email}
          </Typography>
        </td>
        <td style={{ marginRight: '10px', textAlign: 'right' }}>
          <IconButton onClick={() => {
            dispatch(selectFaculty(faculty));
            dispatch(openEditModal());
          }}>
            <Icon>
              <EditRoundedIcon color="secondary" />
            </Icon>
          </IconButton>
          <IconButton onClick={() => {
            dispatch(selectFaculty(faculty));
            dispatch(openDeleteModal());
          }}>
            <Icon>
              <DeleteIcon color="error" />
            </Icon>
          </IconButton>
        </td>
      </tr >)
  )
}

export default FacultyListItem;