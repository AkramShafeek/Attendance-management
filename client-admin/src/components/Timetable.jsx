import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import ClassTimetable from "./timetable/ClassTimetable";
import FacultyTimetable from "./timetable/FacultyTimetable";
import TimetableEdit from "./timetable/TimetableEdit";
import { closeEdit } from "../redux/features/timetableSlice";
import PeriodSection from "./timetable/PeriodSection";
import { DragDropContext } from 'react-beautiful-dnd';
import { periods } from "./timetable/sampleData";


const Timetable = () => {
  const [tabValue, setTabValue] = useState(0);
  const isEditOpen = useSelector((store) => store.timetable.isEditOpen);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const [periodsList, updatePeriodsList] = useState(periods);

  useEffect(() => {
    dispatch(selectMenu('Timetable'));

    return () => {
      dispatch(closeEdit());
    }
  }, []);

  const handleOnDragEnd = (result) => {
    console.log(result);
    if (result.destination == null)
      return;
    if(result.destination.droppableId !== 'periodSection')
      return;
    const items = periodsList;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updatePeriodsList(items);
  }

  return (
    <Box className="content flex-row gap-1">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Box className="main" sx={{
          height: '100%',
          position: 'relative',
          backgroundColor: palette.background.alt,
          borderRadius: '10px'
        }}>
          {!isEditOpen ?
            <>
              <Box>
                <Tabs onChange={(event, value) => setTabValue(value)} value={tabValue}>
                  <Tab label="Class timetables" value={0}></Tab>
                  <Tab label="Faculty timetables" value={1}></Tab>
                </Tabs>
              </Box>
              <Divider />
              <Box>
                {tabValue === 0 && <ClassTimetable />}
                {tabValue === 1 && <FacultyTimetable />}
              </Box>
            </> :
            <TimetableEdit />}
        </Box>
        <Box className="sub" sx={{ backgroundColor: palette.background.alt, borderRadius: '10px', overflowY: 'scroll' }}>
          <PeriodSection periods={periodsList} />
        </Box>
      </DragDropContext>
    </Box >
  );
}

export default Timetable;