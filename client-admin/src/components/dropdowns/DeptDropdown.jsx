import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDept } from "../../redux/features/deptSlice";
import { fetchDeptsApi } from "../../apis/database api/dept";

const DeptDropdown = ({ dept }) => {
  const deptList = useSelector((store) => store.dept.deptList);
  const [selectedDept, setSelectedDept] = useState(dept ? dept._id : '');
  const dispatch = useDispatch();

  const fetchDepts = async () => {
    try {
      const response = await fetchDeptsApi();
      dispatch(loadDept(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(dept);
    if (!deptList || deptList.length === 0)
      fetchDepts();
  }, []);

  const handleChange = (event) => {
    setSelectedDept(event.target.value);
  }
  return (
    <Select value={selectedDept} onChange={handleChange} fullWidth>
      {deptList.map(dept => <MenuItem value={dept._id}>{dept.deptId}</MenuItem>)}
    </Select>
  )
}

export default DeptDropdown;