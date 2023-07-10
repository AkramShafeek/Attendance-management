import { MenuItem, Select } from "@mui/material";
import { useField } from "formik";
import { useState } from "react";

const YearDropdown = (props) => {
  const [field, meta] = useField(props);

  return (
    <Select {...field} fullWidth>
      <MenuItem value={1}>1</MenuItem>
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={4}>4</MenuItem>
    </Select>
  )
}

export default YearDropdown;