import { useTheme } from "@emotion/react";
import { styled } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { openPeriodEdit, selectPeriod } from "../../redux/features/timetableSlice";
import { timetableData } from "./sampleData";

const TimetableView = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const div = styled('div')({
    border: '1px solid ' + palette.neutral.medium
  });

  const [data, setData] = useState('data');

  const timetablematrix = [];
  for (let i = 0; i <= 9; i++) {
    const periods = [];
    if (i === 0) {
      periods.push(
        <div></div>,
        <div>MONDAY</div>,
        <div>TUESDAY</div>,
        <div>WEDNESDAY</div>,
        <div>THURSDAY</div>,
        <div>FRIDAY</div>,
        <div>SATURDAY</div>);
    }
    else if (i === 4 || i === 7) {
      periods.push(<div key={i}>{i}</div>);
      periods.push(<div key={i === 4 ? 'SHORT' : 'LUNCH'}>{i === 4 ? 'SHORT ' : 'LUNCH '} BREAK</div>);
    }
    else {
      periods.push(<div key={i}>{i}</div>);
      for (let days in timetableData) {
        periods.push(<div key={days} className="period"
          onClick={() => {
            dispatch(selectPeriod(timetableData[days]['_' + i]));
            dispatch(openPeriodEdit());
          }}>{timetableData[days]['_' + i]?.course}</div>);
      }
    }
    const row = (<div key={i} className={`col ${i === 4 || i === 7 ? 'break' : ''}`}>{periods}</div>);
    timetablematrix.push(row);
  }

  return (
    <div className="flex-row justify-content-center">
      <div className="timetable">
        {timetablematrix}
      </div>
    </div>
  )
}

export default TimetableView;