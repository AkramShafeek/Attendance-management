import { Avatar, Button, TextField, Typography, styled } from "@mui/material";
import { Form, Formik, useField } from "formik";
import * as yup from "yup"

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

const FacultyCreateModal = ({ handleClose }) => {
  const initialValues = {
    firstname: '',
    lastname: '',
    empid: '',
    email: '',
    dept: '',
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

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <div className="flex-column align-items-center gap-1" style={{ maxHeight: '75vh', overflowY: 'scroll' }}>
      <Avatar style={{ width: '100px', height: '100px' }}></Avatar>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <table style={{ width: '600px' }}>
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
                <td><Attribute>Emp id</Attribute></td>
                <td><MyInputText name="empid" /></td>
              </tr>
              <tr>
                <td><Attribute>Email</Attribute></td>
                <td><MyInputText name="email" /></td>
              </tr>
              <tr>
                <td><Attribute>Dept</Attribute></td>
                <td><MyInputText name="dept" /></td>
              </tr>
            </tbody>
          </table>
          <div className="flex-row gap-2">
            <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="secondary" type="submit">Save</Button>
          </div>
        </Form>
      </Formik>
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