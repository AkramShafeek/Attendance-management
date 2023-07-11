import { Alert, Avatar, Button, Collapse, LinearProgress, TextField, Typography, styled } from "@mui/material";
import { Form, Formik, useField } from "formik";
import * as yup from "yup"
import DeptDropdown from "../../dropdowns/DeptDropdown";
import { useState } from "react";
import { createFacultyApi, editFacultyApi } from "../../../apis/database api/faculty";
import { addStudent } from "../../../redux/features/studentSlice";
import { useDispatch } from "react-redux";
import { addFaculty } from "../../../redux/features/facultySlice";

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

const FacultyCreateModal = ({ selectedFaculty, handleClose }) => {

  const defaultErrMsg = 'Some error, please try again later';
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState(defaultErrMsg);
  const dispatch = useDispatch();

  const initialValues = {
    _id: selectedFaculty._id,
    firstname: selectedFaculty.firstname,
    lastname: selectedFaculty.lastname,
    empid: selectedFaculty.empid,
    email: selectedFaculty.email,
    dept: selectedFaculty.dept._id,
  }
  const validateSchema = yup.object().shape({
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    empid: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    dept: yup.string().required("required"),
  });
  // const validateSchema = (values) => {
  //   const error = {};

  //   return error;
  // }

  const handleSubmit = async (values) => {
    console.log(values)
    var timeout;
    try {
      const payload = values;
      timeout = setTimeout(() => setIsLoading(true), 1000);
      const response = await editFacultyApi(payload);
      if (response)
        dispatch(addFaculty(response.data));
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
          {isSuccess ? 'Edit faculty successfully' : errorMsg}
        </Alert>
      </Collapse>
      <Avatar style={{ width: '100px', height: '100px' }}></Avatar>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex-column gap-2" >
            <div className="flex-column gap-2" style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
              <div><Typography sx={{ fontWeight: 'bold' }} variant="h3" color="secondary">Faculty details</Typography></div>
              <table style={{ width: '600px' }} className="align-cell-text-left">
                <tbody>
                  <tr>
                    <td><Attribute>First name</Attribute></td>
                    <td><MyInputText name="firstname" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Last name</Attribute></td>
                    <td><MyInputText name="lastname" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Empid</Attribute></td>
                    <td><MyInputText name="empid" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Email</Attribute></td>
                    <td><MyInputText name="email" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Dept</Attribute></td>
                    <td><DeptDropdown name="dept" /></td>
                  </tr >
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
    </div>
  )
}
// "usn": "1BM21CS013",
//     "email": "akram.cs21@bmsce.ac.in",
//     "dept": "CSE",
//     "year": 2,
//     "sem": 4,
//     "section": "A",

export default FacultyCreateModal;