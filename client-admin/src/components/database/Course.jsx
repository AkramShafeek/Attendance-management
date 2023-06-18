import { Box, Icon, IconButton, TextField, Typography } from "@mui/material";
import { courses } from "./sampleData";
import '../../styles/list.css';
import CourseListItem from "../utils/CourseListItem";

const Course = () => {
  return (
    <Box className="flex-column gap-1 pad-1" style={{ width: '100%', boxSizing: 'border-box' }}>
      <Box className="flex-row gap-1">
        {/* Search bar */}
      </Box>
      <table>
        <tr className='list-item header' style={{ backgroundColor: "transparent" }}>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Course Code
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Course
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Dept
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Year
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Sem
            </Typography>
          </td>
          <td>
            <Typography sx={{ marginLeft: '10px', minWidth: '100px', fontWeight: 'bold' }}>
              Action
            </Typography>
          </td>
        </tr>
        <CourseListItem list={courses} />
      </table>
    </Box>
  );
}

export default Course;