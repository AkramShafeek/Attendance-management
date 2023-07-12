import { Box, Button, Icon, IconButton, Modal, TextField, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import { depts } from "./sampleData";
// import DeptListItem from "./list renderers/DeptListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeDeleteModal, closeEditModal, loadDept, removeDept } from "../../redux/features/allotmentSlice";
// import DeptCreateModal from "./modals/DeptCreateModal";
import { deleteDeptsApi, fetchDeptsApi } from "../../apis/database api/dept";
import { fetchApi } from "../../apis/class allotment api/api";
import { loadAllotment } from "../../redux/features/allotmentSlice";
import ClassAllotmentList from "./list renderers/ClassAllotmentList";
import ClassAllotmentCreateModal from "./modals/ClassAllotmentCreateModal";
import ClassAllotmentEditModal from "./modals/ClassAllotmentEditModal";
// import DeletionConfirmationModal from "./modals/DeletionConfirmationModal";
// import DeptEditModal from "./modals/DeptEditModal";

const ClassAllotment = () => {

  const isEditModalOpen = useSelector((store) => store.allotment.isEditModalOpen);
  const isDeleteModalOpen = useSelector((store) => store.allotment.isDeleteModalOpen);
  const selectedAllotment = useSelector((store) => store.allotment.selectedAllotment);
  const allotmentList = useSelector((store) => store.allotment.allotmentList);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleEditModalClose = (event, reason) => {
    if (reason === 'backdropClick')
      return;
    dispatch(closeEditModal());
  }

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

  const fetchClassAllotments = async () => {
    try {
      const response = await fetchApi();
      dispatch(loadAllotment(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchClassAllotments();
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
          {/* <DeptCreateModal handleClose={handleCreateModalClose} /> */}
          <ClassAllotmentCreateModal handleClose={handleCreateModalClose} />
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
          {/* <DeletionConfirmationModal payload={selectedDept} deleteApi={deleteDeptsApi} handleClose={handleDeleteModalClose} removeItemFromRedux={removeDept} /> */}
          Delete modal
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
          {/* <DeptEditModal selectedDept={selectedDept} handleClose={handleEditModalClose} /> */}
          <ClassAllotmentEditModal selectedAllotment={selectedAllotment} handleClose={handleEditModalClose} />
        </Box>
      </Modal>
      <table>
        <tbody>
          <tr className='list-item header'>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Department
              </Typography>
            </td>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Sem
              </Typography>
            </td>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Section
              </Typography>
            </td>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Course
              </Typography>
            </td>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Faculty
              </Typography>
            </td>
            <td style={{ marginRight: '10px', textAlign: 'right' }}>
              <Typography sx={{ fontWeight: 'bold', marginRight: '15px' }}>
                Action
              </Typography>
            </td>
          </tr>
          <ClassAllotmentList list={allotmentList} />
        </tbody>
      </table>
      <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => setIsCreateModalOpen(true)}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default ClassAllotment;

// 64ac473cf3ec69417681dc4c
// 64ac637c5f5a5f59c9cfd1c2
// 64ad633aff1d4604be3cb83a