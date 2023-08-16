import { Alert, Avatar, Button, Collapse, Divider, LinearProgress, MenuItem, Select, TextField, Typography, styled } from "@mui/material";
import { Form, Formik, useField } from "formik";
import { useState } from "react";
import * as yup from "yup"
import { createDeptsApi, editDeptsApi } from "../../../apis/database api/dept";
import { useDispatch } from "react-redux";
import { addDept } from "../../../redux/features/deptSlice";

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

const DeptEditModal = ({ selectedDept, handleClose }) => {
  const defaultErrMsg = 'Some error, please try again later';
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState(defaultErrMsg);
  const dispatch = useDispatch();

  const initialValues = {
    _id: selectedDept._id,
    deptId: selectedDept.deptId,
    deptName: selectedDept.deptName,
  }
  const validateSchema = yup.object().shape({
    deptId: yup.string().required("required"),
    deptName: yup.string().required("required")
  });

  const handleSubmit = async (values) => {
    console.log(values);
    var timeout;
    try {
      timeout = setTimeout(() => setIsLoading(true), 1000);
      const response = await editDeptsApi(values);
      if (response)
        dispatch(addDept(response.data));
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
          {isSuccess ? 'Edited department successfully' : errorMsg}
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
              <div><Typography sx={{ fontWeight: 'bold' }} variant="h3" color="secondary">Department details</Typography></div>
              <table style={{ width: '600px' }} className="align-cell-text-left">
                <tbody>
                  <tr>
                    <td><Attribute>Department ID</Attribute></td>
                    <td><MyInputText name="deptId" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Department name</Attribute></td>
                    <td><MyInputText name="deptName" /></td>
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

export default DeptEditModal;