import { Icon, ListItem, ListItemButton, Paper, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenu } from '../../redux/features/menuSlice';
import { useTheme } from '@emotion/react';
import { Settings } from '@mui/icons-material';

const Sidenav = () => {
  // const [selectedMenu, setSelectedMenu] = useState('Calendar');
  const selectedMenu = useSelector((store) => store.menu.selectedMenu);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const menu = [  
    {
      name: "Today's Attendance",
      icon: <CalendarMonthIcon />,
      link: 'todayattendance'
    },
    // {
    //   name: "Manage Attendance",
    //   icon: <Settings />,
    //   link: 'manageattendance'
    // },
    // {
    //   name: "My Timetable",
    //   icon: <CalendarViewWeekIcon />,
    //   link: 'mytimetable'
    // },    
  ];

  const dispatchMenuSelection = (element) => {
    dispatch(selectMenu(element));
  }

  return (
    <div className="sidebar" style={{ backgroundColor: palette.background.alt, borderRadius: '10px' }}>
      <Stack spacing={3} sx={{ marginTop: '30px' }}>
        {menu.map((element, index) => {
          return (
            <NavLink key={index} to={element.link} style={{ textDecoration: 'none' }}>
              <ListItemButton elevation={0} sx={{
                backgroundColor: selectedMenu === element.name ? palette.primary.main : "transparent",
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: selectedMenu === element.name ? palette.primary.main : "null",
                },
                "& .MuiTouchRipple-child": {
                  backgroundColor: 'none'
                },
                display: 'flex',
                alignItems: 'center',                
              }} onClick={() => {
                console.log(element.name);
                selectedMenu !== element.name && dispatchMenuSelection(element.name)
              }}>
                <Icon style={{ color: selectedMenu === element.name ? "white" : "#919191",display:'flex', alignItems:'center' }}>
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