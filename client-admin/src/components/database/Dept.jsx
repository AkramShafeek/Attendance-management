import { Box, Icon, IconButton, TextField, Typography } from "@mui/material";
import { depts } from "./sampleData";
import '../../styles/list.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DeptListItem from "../utils/DeptListItem";

const Dept = () => {
  return (
    <Box className="flex-column gap-1 pad-1" style={{ width: '100%', boxSizing: 'border-box' }}>
      <Box className="flex-row gap-1">
        {/* Search bar */}
      </Box>
      <table>
        <tbody>
          <tr className='list-item' style={{ backgroundColor: "#72e095" }}>
            <td>
              <Typography>
                ID
              </Typography>
            </td>
            <td>
              <Typography>
                Department
              </Typography>
            </td>
            <td>
              <Typography sx={{ marginLeft: '10px' }}>
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