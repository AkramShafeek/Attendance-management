import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";

const Timetable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectMenu('Timetable'));
  }, []);
  return (
    <div className="content">Timetable page</div>
  );
}

export default Timetable;