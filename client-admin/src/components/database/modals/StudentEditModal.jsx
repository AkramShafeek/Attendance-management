import { Alert, Avatar, Button, Collapse, Divider, LinearProgress, MenuItem, Select, TextField, Typography, styled } from "@mui/material";
import { Form, Formik, useField } from "formik";
import { useState } from "react";
import * as yup from "yup"
import DeptDropdown from "../../dropdowns/DeptDropdown";
import YearDropdown from "../../dropdowns/YearDropDown";
import SemDropdown from "../../dropdowns/SemDropdown";
import SectionDropdown from "../../dropdowns/SectionDropdown";
import { getClassId } from "../../utils/functions/getClassId";
import { fetchClassApi } from "../../../apis/database api/class";
import { loadClass } from "../../../redux/features/classSlice";
import { useDispatch, useSelector } from "react-redux";
import { editStudentsApi } from "../../../apis/database api/student";
import { addStudent } from "../../../redux/features/studentSlice";

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

const StudentEditModal = ({ selectedStudent, handleClose }) => {

  const classList = useSelector((store) => store.class.classList);
  const defaultErrMsg = 'Some error, please try again later';
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState(defaultErrMsg);
  const dispatch = useDispatch();

  const initialValues = {
    _id: selectedStudent._id,
    firstname: selectedStudent.firstname,
    lastname: selectedStudent.lastname,
    usn: selectedStudent.usn,
    email: selectedStudent.email,
    dept: selectedStudent.class.dept._id,
    sem: selectedStudent.class.sem,
    section: selectedStudent.class.section,
  }
  const validateSchema = yup.object().shape({
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    usn: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    dept: yup.string().required("required"),
    sem: yup.string().required("required"),
    section: yup.string().required("required"),
  });

  const [year, setYear] = useState(selectedStudent.class.year);

  const calcYear = (sem) => {
    setYear(Math.floor(sem / 2 + sem % 2));
  }

  const fetchClass = async () => {
    try {
      const response = fetchClassApi();
      if (response)
        dispatch(loadClass(response.data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const getPayload = async (values) => {
    try {
      const { dept, year, sem, section } = values;
      if (!classList || !classList.length) {
        await fetchClass();
      }
      const classId = getClassId(classList, { dept, year, sem, section });
      if (!classId)
        throw "Class doesn't exist";

      const payload = { ...values };

      delete payload.dept;
      delete payload.year;
      delete payload.sem;
      delete payload.section;
      payload.class = classId;

      return payload;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  const handleSubmit = async (values) => {
    values.year = year;
    var timeout;
    try {
      const payload = values;
      timeout = setTimeout(() => setIsLoading(true), 1000);
      const response = await editStudentsApi(payload);
      if (response)
        dispatch(addStudent(response.data));
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
      <Avatar src={selectedStudent.avatar} style={{ width: '100px', height: '100px' }}></Avatar>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex-column gap-2" >
            <div className="flex-column gap-2" style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
              <div><Typography sx={{ fontWeight: 'bold' }} variant="h3" color="secondary">Profile details</Typography></div>
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
                    <td><Attribute>USN</Attribute></td>
                    <td><MyInputText name="usn" /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Email</Attribute></td>
                    <td><MyInputText name="email" /></td>
                  </tr>
                </tbody >
              </table >
              <Divider />
              <div><Typography sx={{ fontWeight: 'bold' }} variant="h3" color="secondary">Academic details</Typography></div>
              <table style={{ width: '600px' }}>
                <tbody>
                  <tr>
                    <td><Attribute>Dept</Attribute></td>
                    <td><DeptDropdown dept={selectedStudent.class.dept} name="dept" /></td>
                  </tr >
                  <tr>
                    <td><Attribute>Year</Attribute></td>
                    <td><TextField value={year} fullWidth /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Sem</Attribute></td>
                    <td><SemDropdown name="sem" calcYear={calcYear} /></td>
                  </tr>
                  <tr>
                    <td><Attribute>Section</Attribute></td>
                    <td><SectionDropdown name="section" /></td>
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
// "usn": "1BM21CS013",
//     "email": "akram.cs21@bmsce.ac.in",
//     "dept": "CSE",
//     "year": 2,
//     "sem": 4,
//     "section": "A",

export default StudentEditModal;