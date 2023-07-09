import { Alert, Button, Collapse, Grow, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";
import { removeDept } from "../../../redux/features/deptSlice";
import { useDispatch } from "react-redux";

const DeletionConfirmationModal = ({ payload, deleteApi, handleClose }) => {
  const defaultErrMsg = "Couldn't delete due to some error, please try again later";
  const [isLoading, setIsLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(defaultErrMsg);
  const dispatch = useDispatch();

  const handleConfirmation = async () => {
    console.log(payload);
    var timeout;
    try {
      timeout = setTimeout(() => setIsLoading(true), 1000);
      const response = await deleteApi(payload);
      if (response)
        dispatch(removeDept(payload));
      setShowStatus(true);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      setShowStatus(true);
      setErrorMsg(error);
      setIsSuccess(false);
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);      
    }
  }
  return (
    <div className="flex-column gap-2 align-items-center">
      {isLoading && <LinearProgress sx={{ width: '100%', borderRadius: '10px' }} />}
      {!showStatus && <>
        <div>
          <Typography variant="h5">
            Are you sure you want to delete this record?
          </Typography>
        </div>
        <div className="flex-row gap-2">
          <Button variant="outlined" onClick={() => handleClose()}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmation} disableElevation sx={{color: 'white'}} color="error">Yes</Button>
        </div>
      </>}
      <Collapse in={showStatus}>
        <Alert severity={isSuccess ? "success" : "error"} >{isSuccess ? "Deleted successfully" : errorMsg}</Alert>
      </Collapse>
    </div>
  )
}

export default DeletionConfirmationModal;