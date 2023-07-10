import { Box, Icon, IconButton, TextField, Typography, Modal, Button } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { faculty } from "./sampleData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeEditModal, loadFaculty } from "../../redux/features/facultySlice";
import FacultyListItem from "./list renderers/FacultyListItem";
import FacultyCreateModal from "./modals/FacultyCreateModal";
import FacultyEditModal from "./modals/FacultyEditModal";
import { fetchFacultyApi } from "../../apis/database api/faculty";


const Faculty = () => {

  const selectedFaculty = useSelector((store) => store.faculty.selectedFaculty);
  const isEditModalOpen = useSelector((store) => store.faculty.isEditModalOpen);
  const facultyList = useSelector((store) => store.faculty.facultyList);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
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

  const fetchFaculty = async () => {
    try {
      const response = await fetchFacultyApi();
      dispatch(loadFaculty(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFaculty();
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
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleEditModalClose} color="secondary">close</Button>
          </div>
          <FacultyEditModal selectedFaculty={selectedFaculty} handleClose={handleEditModalClose} />
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
            <Button onClick={handleCreateModalClose}>close</Button>
          </div>
          <FacultyCreateModal handleClose={handleCreateModalClose} />
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
              Empid
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
              Email
            </Typography>
          </td>
          <td style={{ marginRight: '40px', textAlign: 'right' }}>
            <Typography sx={{ minWidth: '100px', fontWeight: 'bold', marginRight: '15px' }}>
              Action
            </Typography>
          </td>
        </tr>
        <FacultyListItem list={facultyList} />
      </table>
      <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => { setIsOpenCreateModal(true) }}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default Faculty;