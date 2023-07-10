import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDept } from "../../redux/features/deptSlice";
import { fetchDeptsApi } from "../../apis/database api/dept";
import { useField } from "formik";

const DeptDropdown = (props) => {
  const deptList = useSelector((store) => store.dept.deptList);  
  const dispatch = useDispatch();
  const [field, meta] = useField(props);

  const fetchDepts = async () => {
    try {
      const response = await fetchDeptsApi();
      dispatch(loadDept(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log(dept);
    if (!deptList || deptList.length === 0)
      fetchDepts();
  }, []);
  
  return (
    <Select {...field} fullWidth>
      {deptList.map(dept => <MenuItem value={dept._id}>{dept.deptId}</MenuItem>)}
    </Select>
  )
}

export default DeptDropdown;