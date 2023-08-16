import { Accordion, AccordionSummary, Box, Button, Icon, IconButton, Modal, TextField, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { depts } from "./sampleData";
// import DeptListItem from "./list renderers/DeptListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { closeDeleteModal, closeEditModal, loadDept, removeDept } from "../../redux/features/deptSlice";
// import DeptCreateModal from "./modals/DeptCreateModal";
// import { deleteDeptsApi, fetchDeptsApi } from "../../apis/database api/dept";
// import DeletionConfirmationModal from "./modals/DeletionConfirmationModal";
// import DeptEditModal from "./modals/DeptEditModal";
import { facultyttlist } from "./sampleData";
import FacultyTimetableList from "./list renderers/FacultyTimetableList";
import { useTheme } from "@emotion/react";
import FacultyTTCreateModal from "./modals/FacultyTTCreateModal";
import { deleteApi, fetchApi } from "../../apis/timetable api/api";
import { closeDeleteModal, loadTimetable, removeTimetable } from "../../redux/features/timetableSlice";
import DeletionConfirmationModal from "../database/modals/DeletionConfirmationModal";

const FacultyTimetable = () => {

  const timetableList = useSelector((store) => store.timetable.timetableList);
  const selectedTimetable = useSelector((store) => store.timetable.selectedTimetable);  
  const isDeleteModalOpen = useSelector((store) => store.timetable.isDeleteModalOpen);  
  const [deletePayload, setDeletePayload] = useState({ _id: selectedTimetable?._id, target: 'faculty' });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  // const handleEditModalClose = (event, reason) => {
  //   if (reason === 'backdropClick')
  //     return;
  //   dispatch(closeEditModal());
  // }

  useEffect(() => {
    setDeletePayload({ _id: selectedTimetable?._id, target: 'faculty' });
  }, [selectedTimetable]);

  const handleDeleteModalClose = (event, reason) => {
    if (reason === 'backdropClick')
      return;
    dispatch(closeDeleteModal());
  }

  const handleCreateModalClose = (event, reason) => {
    if (reason === 'backdropClick')
      return;
    setIsCreateModalOpen(false);
  }
  const fetchFacultyTimetables = async () => {
    try {
      const response = await fetchApi({ target: 'faculty' });
      if (response)
        dispatch(loadTimetable(response.data));
      console.log("got timetables from db");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFacultyTimetables();
  }, []);

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

  const fabStyle = {
    position: 'absolute',
    bottom: '3%',
    right: '3%'
  }

  return (
    <Box className="flex-column gap-1 pad-1" style={{ width: '100%', boxSizing: 'border-box' }}>
      <Modal
        open={isCreateModalOpen}
        onClose={handleCreateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
            <IconButton onClick={handleCreateModalClose}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
          <FacultyTTCreateModal />
        </Box>
      </Modal>
      <Modal
        open={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="flex-column gap-2">
          <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
            <IconButton onClick={handleDeleteModalClose}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
          <DeletionConfirmationModal payload={deletePayload} deleteApi={deleteApi} handleClose={handleDeleteModalClose} removeItemFromRedux={removeTimetable} />
        </Box>
      </Modal>
      <div className="timetable-list-container flex-column" >
        <Accordion expanded={false} disabled
          sx={{
            '&.Mui-disabled': {
              color: 'white',
              backgroundColor: 'transparent',
              opacity: 1,
            }
          }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "transparent" }} />}
            sx={{
              '&.Mui-disabled': {
                color: palette.neutral.dark,
                backgroundColor: 'transparent',
                opacity: 1,
              }
            }}>
            <div className="row flex-row gap-2">
              <div className="col">
                <Typography sx={{ fontWeight: 'bold' }}>
                  Dept
                </Typography>
              </div>
              <div className="col">
                <Typography sx={{ fontWeight: 'bold' }}>
                  Faculty
                </Typography>
              </div>
              <div className="col" style={{ marginRight: '10px', textAlign: 'right' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Action
                </Typography>
              </div>
            </div>
          </AccordionSummary>
        </Accordion>
        <FacultyTimetableList list={timetableList} />
      </ div>
      <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => { setIsCreateModalOpen(true) }}>
        <AddIcon />
      </Fab>
    </Box >
  );
}

export default FacultyTimetable;