import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectMenu } from "../redux/features/menuSlice";

const Approval = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectMenu('Signup Approval'));
  }, []);
  return (
    <div className="content">Approval page</div>
  );
}

export default Approval;