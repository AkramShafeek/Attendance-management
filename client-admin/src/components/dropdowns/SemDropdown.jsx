import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

const SemDropdown = ({ sem, calcYear }) => {
  const [selectedSem, setSelectedSem] = useState(sem ? sem : 1);

  const handleChange = (event) => {
    setSelectedSem(event.target.value);
    calcYear(event.target.value);
  }
  return (
    <Select value={selectedSem} onChange={handleChange} fullWidth MenuProps={{
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