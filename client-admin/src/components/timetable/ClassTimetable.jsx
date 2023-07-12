import { Accordion, AccordionSummary, Box, Button, Icon, IconButton, Modal, TextField, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import { depts } from "./sampleData";
// import DeptListItem from "./list renderers/DeptListItem";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { closeDeleteModal, closeEditModal, loadDept, removeDept } from "../../redux/features/deptSlice";
// import DeptCreateModal from "./modals/DeptCreateModal";
// import { deleteDeptsApi, fetchDeptsApi } from "../../apis/database api/dept";
// import DeletionConfirmationModal from "./modals/DeletionConfirmationModal";
// import DeptEditModal from "./modals/DeptEditModal";
import { classttlist } from "./sampleData";
import ClassTimetableList from "./list renderers/ClassTimetableList";
import { useTheme } from "@emotion/react";

const ClassTimetable = () => {

  // const isEditModalOpen = useSelector((store) => store.dept.isEditModalOpen);
  // const isDeleteModalOpen = useSelector((store) => store.dept.isDeleteModalOpen);
  // const selectedDept = useSelector((store) => store.dept.selectedDept);
  // const deptList = useSelector((store) => store.dept.deptList);
  // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { palette } = useTheme();

  // const handleEditModalClose = (event, reason) => {
  //   if (reason === 'backdropClick')
  //     return;
  //   dispatch(closeEditModal());
  // }

  // const handleDeleteModalClose = (event, reason) => {
  //   if (reason === 'backdropClick')
  //     return;
  //   dispatch(closeDeleteModal());
  // }

  // const handleCreateModalClose = (event, reason) => {
  //   if (reason === 'backdropClick')
  //     return;
  //   setIsCreateModalOpen(false);
  // }

  // const fetchDepts = async () => {
  //   try {
  //     const response = await fetchDeptsApi();
  //     dispatch(loadDept(response.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchDepts();
  // }, []);

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
      {/* <Modal
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
          <DeptCreateModal handleClose={handleCreateModalClose} />
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
          <DeletionConfirmationModal payload={selectedDept} deleteApi={deleteDeptsApi} handleClose={handleDeleteModalClose} removeItemFromRedux={removeDept}/>
        </Box>
      </Modal>
      <Modal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="flex-column gap-2">
          <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
            <IconButton onClick={handleEditModalClose}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
          <DeptEditModal selectedDept={selectedDept} handleClose={handleEditModalClose} />
        </Box>
      </Modal> */}
      <div className="timetable-list-container flex-column">
        <Accordion expanded={false} disabled
          sx={{
            '&.Mui-disabled': {
              color: palette.primary.main,
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
                  Year
                </Typography>
              </div>
              <div className="col">
                <Typography sx={{ fontWeight: 'bold' }}>
                  Sem
                </Typography>
              </div>
              <div className="col">
                <Typography sx={{ fontWeight: 'bold' }}>
                  Section
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
        <ClassTimetableList list={classttlist} />
      </div>
      <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => { }}>
        <AddIcon />
      </Fab>
    </Box >
  );
}

export default ClassTimetable;