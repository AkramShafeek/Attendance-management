import { Accordion, AccordionDetails, AccordionSummary, Box, Icon, IconButton, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import TimetableView from "../TimetableView";
import { openEdit, selectTimetable, openDeleteModal } from "../../../redux/features/timetableSlice";
import TimetableEditor from "../TimetableEditor";

const ClassTimetableList = (props) => {
  const { list } = props;
  const { palette } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [disabledAccordion, setDisabledAccordion] = useState(null);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }
  const dispatch = useDispatch();
  return (

    list.map((timetable, index) =>
      <Accordion expanded={expanded === timetable._id} onChange={handleChange(timetable._id)} disabled={disabledAccordion === timetable._id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div key={timetable._id} className="flex-row row gap-2">
            <div className="col">
              <Typography sx={{ fontSize: 'small' }}>
                {timetable.class.dept.deptId}
              </Typography>
            </div>
            <div className="col">
              <Typography sx={{ fontSize: 'small' }}>
                {timetable.class.year}
              </Typography>
            </div>
            <div className="col">
              <Typography sx={{ fontSize: 'small' }}>
                {timetable.class.sem}
              </Typography>
            </div>
            <div className="col">
              <Typography sx={{ fontSize: 'small' }}>
                {timetable.class.section}
              </Typography>
            </div>
            <div className="col" style={{ marginRight: '10px', textAlign: 'right' }}>
              <IconButton onClick={() => {
                dispatch(selectTimetable(timetable));
                dispatch(openEdit());
              }}>
                <Icon>
                  <EditRoundedIcon color="secondary" />
                </Icon>
              </IconButton>
              <IconButton onClick={() => {
                dispatch(selectTimetable(timetable));
                dispatch(openDeleteModal());
              }}>
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

export default ClassTimetableList;