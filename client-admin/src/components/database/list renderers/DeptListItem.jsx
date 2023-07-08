import { Box, Icon, IconButton, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';

const DeptListItem = (props) => {
  const { list } = props;

  return (
    list.map((dept, index) =>
      <tr key={index} className="list-item" style={{ backgroundColor: index % 2 === 0 ? 'rgb(250,250,250)' : 'transparent' }}>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {dept.deptId}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {dept.deptName}
          </Typography>
        </td>
        <td style={{ marginRight: '10px', textAlign: 'right' }}>
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