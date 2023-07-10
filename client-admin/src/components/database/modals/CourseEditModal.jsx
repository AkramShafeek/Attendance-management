import { Alert, Avatar, Button, Collapse, Divider, LinearProgress, MenuItem, Select, TextField, Typography, styled } from "@mui/material";
import { Form, Formik, useField } from "formik";
import { useState } from "react";
import * as yup from "yup"
import { createDeptsApi } from "../../../apis/database api/dept";
import { useDispatch } from "react-redux";
import { addDept } from "../../../redux/features/deptSlice";
import DeptDropdown from "../../dropdowns/DeptDropdown";
import SemDropdown from "../../dropdowns/SemDropdown";
import { createCoursesApi, editCoursesApi } from "../../../apis/database api/course";
import { addCourse } from "../../../redux/features/courseSlice";

const Attribute = styled(Typography)({
  fontWeight: 'bold',
  fontSize: 'medium',
})

const MyInputText = (props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        {...field}
        error={Boolean(meta.touched) && Boolean(meta.error)}
        helperText={meta.touched && meta.error ? meta.error : ""}
        fullWidth
      />
    </>
  )
}

const CourseEditModal = ({ selectedCourse, handleClose }) => {
  const defaultErrMsg = 'Some error, please try again later';
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [year, setYear] = useState(1);
  const [errorMsg, setErrorMsg] = useState(defaultErrMsg);
  const dispatch = useDispatch();

  const calcYear = (sem) => {
    setYear(Number.parseInt(Math.floor(sem / 2) + sem % 2));
  }

  const initialValues = {
    _id: selectedCourse._id,
    dept: selectedCourse.dept._id,
    sem: selectedCourse.sem,
    courseCode: selectedCourse.courseCode,
    courseName: selectedCourse.courseName,
    courseShortName: selectedCourse.courseShortName
  }
  const validateSchema = yup.object().shape({
    dept: yup.string().required("required"),
    sem: yup.string().required("required"),
    courseCode: yup.string().required("required"),
    courseName: yup.string().required("required"),
    courseShortName: yup.string().required("required"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    values.year = year;
    var timeout;
    try {
      timeout = setTimeout(() => setIsLoading(true), 1000);
      const response = await editCoursesApi(values);
      if (response)
        dispatch(addCourse(response.data));
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
      setErrorMsg(error);
    } finally {
      clearTimeout(timeout);
      setShowStatus(true);
      setIsLoading(false);
      setTimeout(() => setShowStatus(false), 5000);
    }
  }

  return (
    <div className="flex-column align-items-center gap-2">
      {isLoading && <LinearProgress sx={{ width: '100%', borderRadius: '10px', margin: '10px 0px' }} color="secondary" />}
      <Collapse in={showStatus} sx={{ width: '100%' }}>
        <Alert color={isSuccess ? "primary" : "error"} severity={isSuccess ? "success" : "error"}>
          {isSuccess ? 'Edited course successfully' : errorMsg}
        </Alert>
      </Collapse>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex-column gap-2" >
            <div className="flex-column gap-2" style={{ maxHeight: '60vh' }}>
              <div><Typography sx={{ fontWeight: 'bold' }} variant="h3" color="secondary">Course details</Typography></div>
              <table style={{ width: '600px' }} className="align-cell-text-left">
                <tbody>
                  <tr>
                    <td><Attribute>Department</Attribute></td>
                    <td><DeptDropdown name="dept" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Year</Attribute></td>
                    <td><TextField value={year} /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Semester</Attribute></td>
                    <td><SemDropdown name="sem" calcYear={calcYear} /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Course code</Attribute></td>
                    <td><MyInputText name="courseCode" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Course name</Attribute></td>
                    <td><MyInputText name="courseName" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Course short name</Attribute></td>
                    <td><MyInputText name="courseShortName" /></td>
                  </tr>
                </tbody >
              </table >
            </div>
            <div className="flex-row gap-2">
              <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="secondary" type="submit">Save</Button>
            </div >
          </div>
        </Form >
      </Formik >
    </div >
  )
}

export default CourseEditModal;