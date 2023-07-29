import { useTheme } from "@emotion/react";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { openPeriodEdit, selectPeriod } from "../../redux/features/timetableSlice";
import { timetableData } from "./sampleData";

const TimetableEditor = ({ selectedTimetable, setSelectedPeriod, target }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const div = styled('div')({
    border: '1px solid ' + palette.neutral.medium
  });

  const [timetableMatrix, setTimetableMatrix] = useState([]);
  const [data, setData] = useState(selectedTimetable.data);

  useEffect(() => {
    console.log("I'm re rendered");
    setData(selectedTimetable.data);
  }, [selectedTimetable]);

  useEffect(() => {
    renderTimetable();
  }, [data]);

  const renderTimetable = () => {
    const timetableMatrixRender = [];
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
        for (let day of days) {
          periods.push(<div key={day} className="period"
            onClick={() => {
              // here I have to create an object with all
              // details of selected period and set the 
              // state in my parent component
              const selectedPeriodData = {
                timetable: selectedTimetable.data._id,
                day: day,
                period: '_' + i,
                classAllotment: data[day]?.['_' + i]?._id,
                target: target,
              }
              if (target === 'class')
                selectedPeriodData.class = selectedTimetable.class?._id;
              else if (target === 'faculty')
                selectedPeriodData.faculty = selectedTimetable.faculty?._id;

              setSelectedPeriod(selectedPeriodData);
              dispatch(selectPeriod(data[day]?.['_' + i]));
              dispatch(openPeriodEdit());
            }}>{data[day]?.['_' + i]?.['course']?.['courseShortName']}</div>);
        }
      }
      const row = (<div key={i} className={`col ${i === 4 || i === 7 ? 'break' : ''}`}>{periods}</div>);
      timetableMatrixRender.push(row);
    }
    setTimetableMatrix(timetableMatrixRender);
    console.log('Re rendered timetable');
  }

  return (
    <div className="flex-row justify-content-center">
      <div className="timetable">
        {timetableMatrix}
      </div>
    </div>
  )
}

export default TimetableEditor;