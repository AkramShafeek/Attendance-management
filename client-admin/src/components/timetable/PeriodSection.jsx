import { Box, Divider, Paper, Typography } from "@mui/material";
// import { periods } from "./sampleData";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

const Attribute = styled(Typography)({
  fontWeight: 'bold',
  fontSize: 'medium'
})

const PeriodSection = ({ periods }) => {
  const [periodsList, updatePeriodsList] = useState(periods);

  const handleOnDragEnd = (result) => {
    console.log(result);
    const items = periodsList;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updatePeriodsList(items);
  }

  const { palette } = useTheme();
  return (

    <Droppable droppableId="periodSection">
      {(provided) => (
        <Box className="period-section flex-column pad-2 gap-2" {...provided.droppableProps} ref={provided.innerRef}>
          {/* <Typography variant="h3" fontWeight={'bold'} color={palette.secondary.main}>Courses for the class</Typography>
          <Divider /> */}
          {periods.map((element, index) => {
            return (
              <Draggable key={element.course} draggableId={element.course} index={index}>
                {(provided, snapshot) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`period`}
                    style={{ backgroundColor: palette.secondary.light, color: palette.neutral.dark, ...provided.draggableProps.style }}
                    elevation={3}>
                    <div >
                      <Attribute>Course:</Attribute>{element.course}
                    </div>
                    <div className={`flex-row gap-2`} style={{ fontSize: 'medium' }}>
                      <Attribute>Faculty:</Attribute>{element.faculty}
                    </div>
                  </Paper>)}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
}

export default PeriodSection;