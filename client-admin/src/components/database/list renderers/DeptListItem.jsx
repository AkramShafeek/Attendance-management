import { Box, Icon, IconButton, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { openDeleteModal, openEditModal, selectDept } from "../../../redux/features/deptSlice";

const DeptListItem = (props) => {
  const { list } = props;
  const { palette } = useTheme();
  const dispatch = useDispatch();
  return (
    list.map((dept, index) =>
      <tr key={dept._id} className="list-item"
        style={{ backgroundColor: index % 2 === 0 ? palette.neutral.light : 'transparent' }}>
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
          <IconButton onClick={()=>{
            dispatch(selectDept(dept));
            dispatch(openEditModal());
          }}>
            <Icon>
              <EditRoundedIcon color="secondary" />
            </Icon>
          </IconButton>
          <IconButton onClick={() => {
            dispatch(selectDept(dept));
            dispatch(openDeleteModal());
          }}>
            <Icon>
              <DeleteIcon color="error" />
            </Icon>
          </IconButton>
        </td>
      </tr>)
  )
}

export default DeptListItem;