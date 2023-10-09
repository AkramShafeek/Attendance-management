import { Alert, Avatar, Button, Collapse, Divider, LinearProgress, MenuItem, Select, TextField, Typography, styled } from "@mui/material";
import { Form, Formik, useField } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup"
import { createDeptsApi, editDeptsApi } from "../../../apis/database api/dept";
import { useDispatch } from "react-redux";
import { addDept } from "../../../redux/features/deptSlice";
import ClassAllotmentDropdown from "../../dropdowns/ClassAllotmentDropdown";
import { editApi } from "../../../apis/timetable api/api";
import { selectTimetable } from "../../../redux/features/timetableSlice";

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

const PeriodEditModal = ({ selectedPeriod, handleClose }) => {
  const defaultErrMsg = 'Some error with the server, please try again later';
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [showStatus, setShowStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState(defaultErrMsg);
  const dispatch = useDispatch();

  const initialValues = {
    // _id: selectedPeriod._id,
    // deptId: selectedPeriod.deptId,
    // deptName: selectedPeriod.deptName,

    // which timetable
    timetable: selectedPeriod.timetable,
    // which day
    day: selectedPeriod.day,
    // which hour
    period: selectedPeriod.period,
    // class allotment
    classAllotment: selectedPeriod.classAllotment ? selectedPeriod.classAllotment : "",
    // target
    target: selectedPeriod.target,
    // class
    class: selectedPeriod.class,
    // faculty
    faculty: selectedPeriod.faculty
  }
  const validateSchema = yup.object().shape({
    // timetable: yup.string().required("required"),
    // classAllotment: yup.string().required("required")
  });
  useEffect(() => {
    console.log(selectedPeriod);
    console.log("I'm being rendered")
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);    
    var timeout;
    try {
      timeout = setTimeout(() => setIsLoading(true), 1000);
      const response = await editApi(values);
      if (response)
        dispatch(selectTimetable(response.data));
      console.log(response.data);
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
          {isSuccess ? 'Edited Period successfully' : errorMsg}
        </Alert>
      </Collapse>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex-column gap-2" >
            <div className="flex-column gap-2" style={{ maxHeight: '50vh' }}>
              {/* <div><Typography sx={{ fontWeight: 'bold' }} variant="h3" color="secondary">Department details</Typography></div> */}
              <table style={{ width: '600px' }} className="align-cell-text-left">
                <tbody>
                  <tr>
                    <td><Attribute>Class Allotment</Attribute></td>
                    <td><ClassAllotmentDropdown selectedClass={selectedPeriod.class} selectedFaculty={selectedPeriod.faculty} name="classAllotment" /></td>
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

export default PeriodEditModal;