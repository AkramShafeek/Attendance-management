import { Box, Button, Icon, IconButton, Modal, TextField, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { depts } from "./sampleData";
import DeptListItem from "./list renderers/DeptListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeDeleteModal, closeEditModal, loadCourse, removeCourse } from "../../redux/features/courseSlice";
import DeptCreateModal from "./modals/DeptCreateModal";
import { deleteDeptsApi, fetchDeptsApi } from "../../apis/database api/dept";
import DeletionConfirmationModal from "./modals/DeletionConfirmationModal";
import DeptEditModal from "./modals/DeptEditModal";
import { deleteCoursesApi, fetchCoursesApi } from "../../apis/database api/course";
import CourseListItem from "./list renderers/CourseListItem";
import CourseCreateModal from "./modals/CourseCreateModal";
import CourseEditModal from "./modals/CourseEditModal";

const Course = () => {

  const isEditModalOpen = useSelector((store) => store.course.isEditModalOpen);
  const isDeleteModalOpen = useSelector((store) => store.course.isDeleteModalOpen);
  const selectedCourse = useSelector((store) => store.course.selectedCourse);
  const courseList = useSelector((store) => store.course.courseList);
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

  const fetchCourse = async () => {
    try {
      const response = await fetchCoursesApi();
      dispatch(loadCourse(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourse();
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
          <CourseCreateModal handleClose={handleCreateModalClose} />
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
          <DeletionConfirmationModal payload={selectedCourse} deleteApi={deleteCoursesApi} handleClose={handleDeleteModalClose} removeItemFromRedux={removeCourse} />
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
          <CourseEditModal selectedCourse={selectedCourse} handleClose={handleEditModalClose} />
        </Box>
      </Modal>
      <table>
        <tbody>
          <tr className='list-item header'>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Course Code
              </Typography>
            </td>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Course
              </Typography>
            </td>
            <td>
              <Typography sx={{ fontWeight: 'bold' }}>
                Dept
              </Typography>
            </td>
            <td style={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                Sem
              </Typography>
            </td>
            <td style={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                Year
              </Typography>
            </td>
            <td style={{ marginRight: '10px', textAlign: 'right' }}>
              <Typography sx={{ fontWeight: 'bold', marginRight: '15px' }}>
                Action
              </Typography>
            </td>
          </tr>
          <CourseListItem list={courseList} />
        </tbody>
      </table>
      <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => setIsCreateModalOpen(true)}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default Course;