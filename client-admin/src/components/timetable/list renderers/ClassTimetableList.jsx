import { Box, Icon, IconButton, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { openDeleteModal, openEditModal, selectDept } from "../../../redux/features/deptSlice";

const ClassTimetableList = (props) => {
  const { list } = props;
  const { palette } = useTheme();
  const dispatch = useDispatch();
  return (
    list.map((timetable, index) =>
      <tr key={timetable._id} className="list-item"
        style={{ backgroundColor: index % 2 === 0 ? palette.neutral.light : 'transparent' }}>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {timetable.dept}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {timetable.year}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {timetable.sem}
          </Typography>
        </td>
        <td>
          <Typography sx={{ fontSize: 'small' }}>
            {timetable.section}
          </Typography>
        </td>
        <td style={{ marginRight: '10px', textAlign: 'right' }}>
          <IconButton onClick={() => { }}>
            <Icon>
              <EditRoundedIcon color="secondary" />
            </Icon>
          </IconButton>
          <IconButton onClick={() => { }}>
            <Icon>
              <DeleteIcon color="error" />
            </Icon>
          </IconButton>
        </td>
      </tr>)
  )
}

export default ClassTimetableList;