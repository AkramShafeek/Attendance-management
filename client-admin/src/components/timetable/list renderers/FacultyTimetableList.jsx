import { Accordion, AccordionDetails, AccordionSummary, Box, Icon, IconButton, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { openDeleteModal, openEditModal, selectDept } from "../../../redux/features/deptSlice";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import TimetableView from "../TimetableView";

const FacultyTimetableList = (props) => {
  const { list } = props;
  const { palette } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }
  const dispatch = useDispatch();
  return (
    list.map((timetable, index) =>
      <Accordion expanded={expanded === timetable._id} onChange={handleChange(timetable._id)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div key={timetable._id} className="flex-row row gap-2">
            <div className="col">
              <Typography sx={{ fontSize: 'small' }}>
                {timetable.faculty?.dept?.deptId}
              </Typography>
            </div>
            <div className="col">
              <Typography sx={{ fontSize: 'small' }}>
                {timetable.faculty?.firstname} {timetable.faculty?.lastname}
              </Typography>
            </div>            
            <div className="col" style={{ marginRight: '10px', textAlign: 'right' }}>
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
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <TimetableView />
        </AccordionDetails>
      </Accordion>
    )
  )
}

export default FacultyTimetableList;