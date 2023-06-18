import { useDispatch } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";
import { useEffect } from "react";

const Calendar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectMenu('Calendar'));
  }, []);
  return (
    <div className="content">Calendar page</div>
  );
}

export default Calendar;