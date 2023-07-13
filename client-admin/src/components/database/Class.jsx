import { Box, Button, Icon, IconButton, Modal, TextField, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { depts } from "./sampleData";
import DeptListItem from "./list renderers/DeptListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeDeleteModal, closeEditModal, loadDept } from "../../redux/features/classSlice";
import DeptCreateModal from "./modals/DeptCreateModal";
import { deleteDeptsApi, fetchDeptsApi } from "../../apis/database api/dept";
import DeletionConfirmationModal from "./modals/DeletionConfirmationModal";
import DeptEditModal from "./modals/DeptEditModal";
import ClassListItem from "./list renderers/ClassListItem";
import { deleteClassApi, fetchClassApi } from "../../apis/database api/class";
import { loadClass, removeClass } from "../../redux/features/classSlice";
import ClassEditModal from "./modals/ClassEditModal";
import ClassCreateModal from "./modals/ClassCreateModal";

const Class = () => {

  const isEditModalOpen = useSelector((store) => store.class.isEditModalOpen);
  const isDeleteModalOpen = useSelector((store) => store.class.isDeleteModalOpen);
  const selectedClass = useSelector((store) => store.class.selectedClass);
  const classList = useSelector((store) => store.class.classList);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(closeEditModal());
      dispatch(closeDeleteModal());
      setIsCreateModalOpen(false);
    }
  },[]);

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

  const fetchClass = async () => {
    try {
      const response = await fetchClassApi();
      dispatch(loadClass(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchClass();
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
          <ClassCreateModal handleClose={handleCreateModalClose} />
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
          <DeletionConfirmationModal payload={selectedClass} deleteApi={deleteClassApi} handleClose={handleDeleteModalClose} removeItemFromRedux={removeClass} />
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
          <ClassEditModal selectedClass={selectedClass} handleClose={handleEditModalClose} />
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
                Year
              </Typography>
            </td>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Semester
              </Typography>
            </td>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Section
              </Typography>
            </td>
            <td style={{ marginRight: '10px', textAlign: 'right' }}>
              <Typography sx={{ fontWeight: 'bold', marginRight: '15px' }}>
                Action
              </Typography>
            </td>
          </tr>
          <ClassListItem list={classList} />
        </tbody>
      </table>
      <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => setIsCreateModalOpen(true)}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default Class;