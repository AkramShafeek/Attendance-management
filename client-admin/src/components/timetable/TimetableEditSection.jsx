import { Box, Divider, IconButton, Modal } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useDispatch, useSelector } from 'react-redux';
import { closeEdit, closePeriodEdit } from '../../redux/features/timetableSlice';
import TimetableDroppable from './TimetableEditor';
import PeriodEditModal from './modals/PeriodEditModal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TimetableEditor from './TimetableEditor';
import { useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const TimetableEditSection = () => {
  const isPeriodEditOpen = useSelector((store) => store.timetable.isPeriodEditOpen);
  const selectedTimetable = useSelector((store) => store.timetable.selectedTimetable);

  const [selectedPeriod, setSelectedPeriod] = useState({});
  const dispatch = useDispatch();

  const handlePeriodEditClose = (event, reason) => {
    if (reason == 'backdropClick')
      return;

    dispatch(closePeriodEdit());
  }
  return (
    <div className='flex-column gap-1 pad-1' style={{ alignItems: 'flex-start' }}>
      <IconButton onClick={() => dispatch(closeEdit())}>
        <ArrowBackRoundedIcon />
      </IconButton>
      <Divider sx={{ width: '100%' }} />
      <Modal
        open={isPeriodEditOpen}
        onClose={handlePeriodEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
            <IconButton onClick={handlePeriodEditClose}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
          <PeriodEditModal selectedPeriod={selectedPeriod} handleClose={handlePeriodEditClose}/>
        </Box>
      </Modal>
      <div className='flex-row justify-content-center' style={{ width: '100%', marginTop: '4rem' }}>
        <TimetableEditor selectedTimetable={selectedTimetable} setSelectedPeriod={setSelectedPeriod} target={selectedTimetable.class ? 'class' : 'faculty'}/>
      </div>
    </div>
  )
}

export default TimetableEditSection;