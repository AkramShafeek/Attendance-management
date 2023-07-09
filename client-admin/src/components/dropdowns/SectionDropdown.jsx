import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

const SectionDropdown = ({ section }) => {
  const [selectedSection, setSelectedSection] = useState(section ? section : 'A');

  const handleChange = (event) => {
    setSelectedSection(event.target.value);    
  }
  return (
    <Select value={selectedSection} onChange={handleChange} fullWidth MenuProps={{
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