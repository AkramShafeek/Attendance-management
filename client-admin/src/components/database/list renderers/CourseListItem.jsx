import { Box, Icon, IconButton, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { depts } from "../sampleData";
import { useTheme } from "@emotion/react";

const getDept = (deptId) => {
  for (let dept of depts)
    if (dept._id.$oid === deptId)
      return dept.deptName;
}

const CourseListItem = (props) => {
  const { list } = props;
  const { palette } = useTheme();
  return (
    list.map((course, index) =>
      <tr className="list-item"
        style={{ backgroundColor: index % 2 === 0 ? palette.neutral.light : 'transparent' }}>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {course.courseCode}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {course.courseName}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {getDept(course.dept.$oid)}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {course.year}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {course.sem}
          </Typography>
        </td>
        <td style={{ marginRight: '10px', textAlign: 'right' }}>
          <IconButton>
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
      </tr>)
  )
}

export default CourseListItem;