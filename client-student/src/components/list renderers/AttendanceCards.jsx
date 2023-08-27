import { useTheme } from '@emotion/react';
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProgressProvider from './ProgressProvider';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const AttendanceCards = ({ attendanceData }) => {
  const [valueEnd, setValueEnd] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isNoClassHeld, setIsNoClassHeld] = useState(false);
  const { palette } = useTheme();

  const getColor = () => {
    return loading ? 'primary' : valueEnd >= 85 ? 'success' : (valueEnd >= 75 ? 'warning' : 'error')
  }
  const setValueFunc = (value) => {
    setValueEnd(0);
    setTimeout(() => {
      setValueEnd(value)
    }, 200)
  }
  useEffect(() => {
    console.log(attendanceData);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (attendanceData.held == 0)
        setIsNoClassHeld(true);
      else if (attendanceData.attended > 0)
        setValueFunc(Math.round(attendanceData.attended / attendanceData.held * 100));
    }, 2000)
  }, [])
  return (
    <Paper sx={{
      flex: '1 0 30%',
      // height: '200px',
      height: 'fit-content',
      backgroundColor: palette.neutral.light,
      borderRadius: '8px',
      display: 'flex',
      padding: '20px 20px',
      gap: '10px',
      alignItems: 'center'
      // boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
    }}>
      <Box sx={{
        flex: '1 0 35%',
        aspectRatio: '1 / 1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        {!isNoClassHeld &&
          <>
            <CircularProgress
              variant={loading ? "indeterminate" : "determinate"}
              size={'7rem'}
              value={valueEnd}
              color={getColor()}
              thickness={2.9}
              sx={{
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                  animationDuration: '10s'
                }
              }}></CircularProgress>

            <Typography sx={{ position: 'absolute' }} fontWeight={700} fontSize={'1rem'}>{!loading && valueEnd + '%'}</Typography>
          </>
        }
        {isNoClassHeld && <Typography>No classes held</Typography>}
      </Box>
      <Box sx={{
        flex: '1 0 55%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="h4" fontWeight={700}>
          {attendanceData.course}
        </Typography>
      </Box>
    </Paper>
  )
}

export default AttendanceCards