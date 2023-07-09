import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

const YearDropdown = ({ year }) => {  
  const [selectedYear, setSelectedYear] = useState(year ? year : 1);  

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  }
  return (
    <Select value={selectedYear} onChange={handleChange} fullWidth>
      <MenuItem value={1}>1</MenuItem>
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={4}>4</MenuItem>
    </Select>
  )
}

export default YearDropdown;