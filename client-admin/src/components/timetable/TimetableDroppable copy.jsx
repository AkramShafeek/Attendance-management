import { useTheme } from "@emotion/react";
import { styled } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { openPeriodEdit } from "../../redux/features/timetableSlice";


const TimetableDroppable = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const div = styled('div')({
    border: '1px solid ' + palette.neutral.medium
  });

  const [data, setData] = useState('data');

  const handleOnDragEnd = (result) => {
    setData(result.draggableId);
  }
  return (
    <div className="flex-row justify-content-center">
      <div className="timetable">
        <div className="col">
          <div></div>
          <div>MONDAY</div>
          <div>TUESDAY</div>
          <div>WEDNESDAY</div>
          <div>THURSDAY</div>
          <div>FRIDAY</div>
          <div>SATURDAY</div>
        </div>
        <div className="col">
          <div>1</div>
          <div className="_1" onClick={()=>dispatch(openPeriodEdit())}>period</div>
          <div className="_2">period</div>
          <div className="_3">period</div>          
          <div className="_4">period</div>
          <div className="_5">period</div>
          <div className="_6">period</div>
        </div>
        <div className="col">
          <div>2</div>
          <div className="_1">period</div>
          <div className="_2">period</div>
          <div className="_3">period</div>
          <div className="_4">period</div>
          <div className="_5">period</div>
          <div className="_6">period</div>
        </div>
        <div className="col">
          <div>3</div>
          <div className="_1">period</div>
          <div className="_2">period</div>
          <div className="_3">period</div>
          <div className="_4">period</div>
          <div className="_5">period</div>
          <div className="_6">period</div>
        </div>
        <div className="col break">
          <div>4</div>
          <div className="_1">Short break</div>          
        </div>
        <div className="col">
          <div>5</div>
          <div className="_1">period</div>
          <div className="_2">period</div>
          <div className="_3">period</div>
          <div className="_4">period</div>
          <div className="_5">period</div>
          <div className="_6">period</div>
        </div>
        <div className="col">
          <div>6</div>
          <div className="_1">period</div>
          <div className="_2">period</div>
          <div className="_3">period</div>
          <div className="_4">period</div>
          <div className="_5">period</div>
          <div className="_6">period</div>
        </div>
        <div className="col break">
          <div>7</div>
          <div className="_1">Lunch break</div>
        </div>
        <div className="col">
          <div>8</div>
          <div className="_1">period</div>
          <div className="_2">period</div>
          <div className="_3">period</div>
          <div className="_4">period</div>
          <div className="_5">period</div>
          <div className="_6">period</div>
        </div>
        <div className="col">
          <div>9</div>
          <div className="_1">period</div>
          <div className="_2">period</div>
          <div className="_3">period</div>
          <div className="_4">period</div>
          <div className="_5">period</div>
          <div className="_6">period</div>
        </div>
      </div>
    </div>
  )
}

export default TimetableDroppable;