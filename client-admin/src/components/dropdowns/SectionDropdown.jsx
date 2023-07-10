import { MenuItem, Select } from "@mui/material";
import { useField } from "formik";
import { useState } from "react";

const SectionDropdown = (props) => {  
  const [field, meta] = useField(props);
  
  return (
    <Select {...field} fullWidth MenuProps={{
      style: {
        maxHeight: '300px',
      },
    }}>
      <MenuItem value={'A'}>A</MenuItem>
      <MenuItem value={'B'}>B</MenuItem>
      <MenuItem value={'C'}>C</MenuItem>
      <MenuItem value={'D'}>D</MenuItem>
    </Select>
  )
}

export default SectionDropdown;