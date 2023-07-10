import { Box, Icon, IconButton, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { openDeleteModal, openEditModal, selectClass } from "../../../redux/features/classSlice";

const ClassListItem = (props) => {
  const { list } = props;
  const { palette } = useTheme();
  const dispatch = useDispatch();
  return (
    list.map((_class, index) =>
      <tr key={_class._id} className="list-item"
        style={{ backgroundColor: index % 2 === 0 ? palette.neutral.light : 'transparent' }}>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {_class.dept.deptName}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {_class.year}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {_class.sem}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {_class.section}
          </Typography>
        </td>
        <td style={{ marginRight: '10px', textAlign: 'right' }}>
          <IconButton onClick={()=>{
            dispatch(selectClass(_class));
            dispatch(openEditModal());
          }}>
            <Icon>
              <EditRoundedIcon color="secondary" />
            </Icon>
          </IconButton>
          <IconButton onClick={() => {
            dispatch(selectClass(_class));
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

export default ClassListItem;