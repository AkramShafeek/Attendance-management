import { Alert, Avatar, Button, Collapse, Divider, LinearProgress, MenuItem, Select, TextField, Typography, styled } from "@mui/material";
import { Form, Formik, useField } from "formik";
import { useState } from "react";
import * as yup from "yup"
import { createDeptsApi } from "../../../apis/database api/dept";
import { useDispatch } from "react-redux";
import { addDept } from "../../../redux/features/deptSlice";
import { addAllotment } from "../../../redux/features/allotmentSlice";
import { createApi, editApi } from "../../../apis/class allotment api/api";
import DeptDropdown from "../../dropdowns/DeptDropdown";
import SemDropdown from "../../dropdowns/SemDropdown";
import SectionDropdown from "../../dropdowns/SectionDropdown";

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

const ClassAllotmentEditModal = ({ selectedAllotment, handleClose }) => {
  const defaultErrMsg = 'Some error, please try again later';
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState(defaultErrMsg);
  const [year, setYear] = useState(selectedAllotment.class.year);
  const dispatch = useDispatch();

  const calcYear = (sem) => {
    setYear(Math.floor(sem / 2 + sem % 2));
  }

  const initialValues = {
    _id: selectedAllotment._id ,
    dept: selectedAllotment.class.dept._id,
    sem: selectedAllotment.class.sem,
    section: selectedAllotment.class.section,
    courseCode: selectedAllotment.course.courseCode,
    facultyDept: selectedAllotment.faculty.dept._id,
    faculty: selectedAllotment.faculty.empid,
  }
  const validateSchema = yup.object().shape({
    dept: yup.string().required("required"),
    sem: yup.string().required("required"),
    section: yup.string().required("required"),
    courseCode: yup.string().required("required"),
    facultyDept: yup.string().required("required"),
    faculty: yup.string().required("required"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    values.year = year;
    var timeout;
    try {
      timeout = setTimeout(() => setIsLoading(true), 1000);
      const response = await editApi(values);
      if (response)
        dispatch(addAllotment(response.data));
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
          {isSuccess ? 'Class allotment edited successfully' : errorMsg}
        </Alert>
      </Collapse>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex-column gap-2" >
            <div className="flex-column gap-2" style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
              <div><Typography sx={{ fontWeight: 'bold' }} variant="h3" color="secondary">Class details</Typography></div>
              <table style={{ width: '600px' }} className="align-cell-text-left">
                <tbody>
                  <tr>
                    <td><Attribute>Department</Attribute></td>
                    <td><DeptDropdown name="dept" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Year</Attribute></td>
                    <td><TextField name="year" value={year}/></td>
                  </tr>
                  <tr>
                    <td><Attribute>Semester</Attribute></td>
                    <td><SemDropdown name="sem" calcYear={calcYear} /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Section</Attribute></td>
                    <td><SectionDropdown name="section" /></td>
                  </tr>
                </tbody>
              </table>
              <Divider />
              <div><Typography sx={{ fontWeight: 'bold' }} variant="h3" color="secondary">Course details</Typography></div>
              <table style={{ width: '600px' }}>
                <tbody>
                  <tr>
                    <td><Attribute>Course Code</Attribute></td>
                    <td><MyInputText name="courseCode" /></td>
                  </tr>
                </tbody>
              </table>
              <Divider />
              <div><Typography sx={{ fontWeight: 'bold' }} variant="h3" color="secondary">Faculty details</Typography></div>
              <table style={{ width: '600px' }}>
                <tbody>
                  <tr>
                    <td><Attribute>Faculty Dept</Attribute></td>
                    <td><DeptDropdown name="facultyDept" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Faculty Id</Attribute></td>
                    <td><MyInputText name="faculty" /></td>
                  </tr>
                </tbody>
              </table>
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

export default ClassAllotmentEditModal;