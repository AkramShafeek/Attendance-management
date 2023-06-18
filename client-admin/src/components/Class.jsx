import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";

const Class = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectMenu('Class'));
  }, []);
  return (
    <div className="content">Class page</div>
  );
}

export default Class;