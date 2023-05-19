import React, { ReactElement } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ReactDOM from "react-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setConfirm, setShowModal } from "@/store/slices/uiSlice";
interface INotificationAlert {
  status: any;
  title: string;
  message: string;
  showNotify: boolean;
}

interface IModalConfirm {}

const NotificationAlert: React.FC<INotificationAlert> = ({
  status,
  title,
  message,
  showNotify = false,
}) => {
  return ReactDOM.createPortal(
    <Alert
      severity={status}
      sx={{
        position: "fixed",
        top: 10,
        right: 10,
        zIndex: "9999",
        bgcolor: "",
        transform: !showNotify ? "translateX(150%)" : "translateX(0)",
        transition: "all ease .5s",
      }}
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>,
    document.getElementById("notification-alert") as HTMLElement
  );
};

export default NotificationAlert;

export const ModalConfirm = () => {
  const dispatch = useAppDispatch();
  const { isShow, message } = useAppSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(setShowModal(false));
    dispatch(setConfirm(false));
  };

  const handleConfirm = () => {
    dispatch(setConfirm(true));
    dispatch(setShowModal(false));
  };

  const handleDisConfirm = () => {
    dispatch(setShowModal(false));
    dispatch(setConfirm(false));
  };

  return (
    <Dialog
      open={isShow}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Notification!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisConfirm}>Disagree</Button>
        <Button onClick={handleConfirm} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
