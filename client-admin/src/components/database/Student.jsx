import { Box, Icon, IconButton, TextField, Typography } from "@mui/material";
import { students } from "./sampleData";
import CourseListItem from "./list renderers/CourseListItem";
import StudentListItem from "./list renderers/StudentListItem";

const Student = () => {
  return (
    <Box className="flex-column gap-1 pad-1" style={{ width: '100%', boxSizing: 'border-box' }}>
      <Box className="flex-row gap-1">
        {/* Search bar */}
      </Box>
      <table>
        <tr className='list-item header' style={{ backgroundColor: "transparent" }}>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Profile
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              USN
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Name
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Dept
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Sem
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Email
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Section
            </Typography>
          </td>
          <td style={{ marginRight: '40px', textAlign: 'right' }}>
            <Typography sx={{ minWidth: '100px', fontWeight: 'bold', marginRight: '15px' }}>
              Action
            </Typography>
          </td>
        </tr>
        <StudentListItem list={students} />
      </table>
    </Box>
  );
}

export default Student;