import { Box, Icon, IconButton, TextField, Typography, Modal, Button } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { students } from "./sampleData";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import StudentListItem from "./list renderers/StudentListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { closeDeleteModal, closeEditModal, loadStudents, removeStudent } from "../../redux/features/studentSlice";
import StudentCreateModal from "./modals/StudentCreateModal";
import StudentEditModal from "./modals/StudentEditModal";
import { deleteStudentsApi, fetchStudentsApi } from "../../apis/database api/student";
import DeletionConfirmationModal from "./modals/DeletionConfirmationModal";



const Student = () => {

  const selectedStudent = useSelector((store) => store.student.selectedStudent);
  const isOpenEditModal = useSelector((store) => store.student.isOpenEditModal);
  const isDeleteModalOpen = useSelector((store) => store.student.isDeleteModalOpen);
  const studentList = useSelector((store) => store.student.studentList);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const dispatch = useDispatch();

  const handleEditModalClose = (event, reason) => {
    if (reason === 'backdropClick')
      return;
    dispatch(closeEditModal());
  }

  const handleCreateModalClose = (event, reason) => {
    if (reason === 'backdropClick')
      return;
    setIsOpenCreateModal(false);
  }

  const handleDeleteModalClose = (event, reason) => {
    if (reason === 'backdropClick')
      return;
    dispatch(closeDeleteModal());
  }

  const fetchStudents = async () => {
    const response = await fetchStudentsApi();
    dispatch(loadStudents(response.data));
    console.log(response);
  }

  useEffect(() => {
    fetchStudents();
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
        open={isOpenEditModal}
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
          <StudentEditModal selectedStudent={selectedStudent} handleClose={handleEditModalClose} />
        </Box>
      </Modal>
      <Modal
        open={isOpenCreateModal}
        onClose={handleCreateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleCreateModalClose} color="secondary">close</Button>
          </div>
          <StudentCreateModal handleClose={handleCreateModalClose} />
        </Box>
      </Modal>
      <Modal
        open={isOpenCreateModal}
        onClose={handleCreateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleCreateModalClose} color="secondary">close</Button>
          </div>
          <StudentCreateModal handleClose={handleCreateModalClose} />
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
          <DeletionConfirmationModal payload={selectedStudent} deleteApi={deleteStudentsApi} handleClose={handleDeleteModalClose} removeItemFromRedux={removeStudent} />
        </Box>
      </Modal>
      <table>
        <tr className='list-item header' style={{ backgroundColor: "transparent" }}>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Profile
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              USN
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Name
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold' }}>
              Dept
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Sem
            </Typography>
          </td>
          <td>
            <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Section
            </Typography>
          </td>
          <td style={{ marginRight: '40px', textAlign: 'right' }}>
            <Typography sx={{ minWidth: '100px', fontWeight: 'bold', marginRight: '15px' }}>
              Action
            </Typography>
          </td>
        </tr>
        <StudentListItem list={studentList} />
      </table>
      <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => setIsOpenCreateModal(true)}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default Student;