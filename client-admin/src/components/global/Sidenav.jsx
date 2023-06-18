import { Icon, ListItem, ListItemButton, Paper, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClassIcon from '@mui/icons-material/Class';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import StorageIcon from '@mui/icons-material/Storage';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidenav = () => {
  const [selectedMenu, setSelectedMenu] = useState('Calendar');
  const menu = [
    {
      name: 'Calendar',
      icon: <CalendarMonthIcon />,
      link: 'calendar'
    },
    {
      name: 'Database',
      icon: <StorageIcon />,
      link: 'database'
    },
    {
      name: 'Class',
      icon: <ClassIcon />,
      link: 'class'
    },
    {
      name: 'Timetable',
      icon: <CalendarViewWeekIcon />,
      link: 'timetable'
    },
    {
      name: 'Signup Approval',
      icon: <HowToRegIcon />,
      link: 'approval'
    },
  ];

  const selectMenu = (element) => {
    setSelectedMenu(element);
  }

  return (
    <div className="sidebar">
      <Stack spacing={3} sx={{ marginTop: '30px' }}>
        {menu.map((element, index) => {
          return (
            <NavLink to={element.link} style={{textDecoration: 'none'}}>
              <ListItemButton key={index} elevation={0} sx={{
                backgroundColor: selectedMenu === element.name ? "#72e095" : "white",
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: selectedMenu === element.name ? "#72e095" : "null",
                }
              }} onClick={() => selectedMenu !== element.name && selectMenu(element.name)}>
                <Icon style={{ color: selectedMenu === element.name ? "white" : "#919191" }}>
                  {element.icon}
                </Icon>
                <ListItem sx={{ color: selectedMenu === element.name ? "white" : "#919191", textDecoration: 'none' }}>
                  {element.name}
                </ListItem>
              </ListItemButton>
            </NavLink>
          )
        })}
      </Stack>
    </div>
  )
}

export default Sidenav;