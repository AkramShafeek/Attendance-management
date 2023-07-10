import { MenuItem, Select } from "@mui/material";
import { useField } from "formik";
import { useState } from "react";

const SemDropdown = (props) => {
  const [field, meta] = useField(props);

  const handleChange = (event) => {
    props.calcYear(event.target.value);
    field.onChange(event);
  }

  return (
    <Select {...field} onChange={handleChange} fullWidth MenuProps={{
      style: {
        maxHeight: '300px',
      },
    }}>
      <MenuItem value={1}>1</MenuItem>
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={7}>7</MenuItem>
      <MenuItem value={8}>8</MenuItem>
    </Select>
  )
}

export default SemDropdown;