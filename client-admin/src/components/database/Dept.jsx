import { Box, Icon, IconButton, TextField, Typography } from "@mui/material";
import { depts } from "./sampleData";
import DeptListItem from "./list renderers/DeptListItem";

const Dept = () => {
  return (
    <Box className="flex-column gap-1 pad-1" style={{ width: '100%', boxSizing: 'border-box' }}>
      <Box className="flex-row gap-1">
        {/* Search bar */}
      </Box>
      <table>
        <tbody>
          <tr className='list-item header'>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                ID
              </Typography>
            </td>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Department
              </Typography>
            </td>
            <td style={{ marginRight: '10px', textAlign: 'right' }}>
              <Typography sx={{ fontWeight: 'bold', marginRight: '15px' }}>
                Action
              </Typography>
            </td>
          </tr>
          <DeptListItem list={depts} />
        </tbody>
      </table>
    </Box>
  );
}

export default Dept;