import { Box, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDept } from "../../redux/features/deptSlice";
import { fetchDeptsApi } from "../../apis/database api/dept";
import { useField } from "formik";
import { fetchApi } from "../../apis/class allotment api/api";

const ClassAllotmentDropdown = (props) => {
  const deptList = useSelector((store) => store.dept.deptList);
  const dispatch = useDispatch();
  const [field, meta] = useField(props);
  const [classAllotments, setClassAllotments] = useState([]);

  const fetchClassAllotments = async (queryObject) => {
    console.log(queryObject);
    try {
      const response = await fetchApi(queryObject);
      // dispatch(loadDept(response.data));
      console.log(response.data);
      setClassAllotments(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log(dept);
    const { selectedClass, selectedFaculty } = props;
    const queryObject = {};
    console.log(props);
    // query class allotment for selected class
    if (selectedClass)
      queryObject._class = selectedClass;
    // query class allotment for selected faculty
    else if (selectedFaculty)
      queryObject.faculty = selectedFaculty;

    fetchClassAllotments(queryObject);
  }, []);

  return (
    <Select {...field} fullWidth>
      {classAllotments.map(allotment =>
        <MenuItem value={allotment._id} key={allotment._id}>
          <Box>
            <Box>
              Course: {allotment.course?.courseShortName}
            </Box>
            <Box>
              Faculty: {allotment.faculty?.firstname + " " + allotment.faculty?.lastname}
            </Box>
          </Box>
        </MenuItem>)
        /*display some message on network error*/}
    </Select>
  )
}

export default ClassAllotmentDropdown;