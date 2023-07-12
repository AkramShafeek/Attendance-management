import { Box, Icon, IconButton, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { selectAllotment, openEditModal, openDeleteModal } from "../../../redux/features/allotmentSlice";

const ClassAllotmentList = (props) => {
  const { list } = props;
  const { palette } = useTheme();
  const dispatch = useDispatch();
  return (
    list.map((allotment, index) =>
      <tr key={allotment._id} className="list-item"
        onClick={()=>dispatch(selectAllotment(allotment))}
        style={{ backgroundColor: index % 2 === 0 ? palette.neutral.light : 'transparent' }}>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {allotment.class.dept.deptId}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {allotment.class.sem}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {allotment.class.section}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {allotment.course.courseShortName}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {allotment.faculty.firstname + " " + allotment.faculty.lastname}
          </Typography>
        </td>
        <td style={{ marginRight: '10px', textAlign: 'right' }}>
          <IconButton onClick={() => {
            dispatch(selectAllotment(allotment));
            dispatch(openEditModal());
          }}>
            <Icon>
              <EditRoundedIcon color="secondary" />
            </Icon>
          </IconButton>
          <IconButton onClick={() => {
            dispatch(selectAllotment(allotment));
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

export default ClassAllotmentList;