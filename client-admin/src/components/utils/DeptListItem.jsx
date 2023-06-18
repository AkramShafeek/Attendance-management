import { Box, Icon, IconButton, Typography } from "@mui/material";
import '../../styles/list.css';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';

const DeptListItem = (props) => {
  const { list } = props;

  return (
    list.map((dept, index) =>
      <tr key={index} className="list-item" style={{ backgroundColor: index % 2 !== 0 ? 'aliceblue' : 'transparent' }}>
        <td>
          <Typography>
            {dept.deptId}
          </Typography>
        </td>
        <td>
          <Typography>
            {dept.deptName}
          </Typography>
        </td>
        <td>
          <IconButton>
            <Icon>
              <EditRoundedIcon color="primary" />
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

export default DeptListItem;