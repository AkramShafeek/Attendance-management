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
            {student.class && student.class.dept && student.class.dept.deptId}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small', textAlign: 'center' }}>
            {student.class && student.class.sem}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small', textAlign: 'center' }}>
            {student.class && student.class.section}
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

// {
//   "_id": "64aa90b1db521d49a8194b08",
//   "firstname": "Akram",
//   "lastname": "Shafeek",
//   "usn": "1BM21CS013",
//   "email": "akram.cs21@bmsce.ac.in",
//   "class": {
//     "_id": "648df6674ec88b250cf70de3",
//     "dept": {
//       "_id": "648cc0e9b6edc9fb04c08404",
//       "deptName": "Computer Science and Engineering",
//       "deptId": "CSE",
//       "__v": 0
//     },
//     "year": "2",
//     "sem": "4",
//     "section": "A"
//   },
//   "phone": [
//     "8095825227"
//   ],
//   "avatar": "https://images.hindustantimes.com/img/2022/01/20/550x309/Robert_Pattinson_1642681700840_1642681719067.jpg",
//   "__v": 0
// }