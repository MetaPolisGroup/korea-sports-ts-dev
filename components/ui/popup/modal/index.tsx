import React from "react";
import modalClass from "./index.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
interface IModalProps {
  show: boolean;
  footer?: boolean;
  children?: React.ReactNode;
  onOk?: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  className?: string;
  onCancel?:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  title: React.ReactNode;
  header?: boolean;
  okText?: React.ReactNode;
  okLoading?: boolean;
  cancelText?: React.ReactNode;
  closeAble?: boolean;
}

interface ComponentModal extends React.FC<IModalProps> {}

const Modal: ComponentModal = (props) => {
  const {
    show,
    title,
    children,
    footer,
    onOk,
    className,
    onCancel,
    header,
    okText,
    okLoading,
    cancelText,
    closeAble,
  } = props;

  return (
    <React.Fragment>
      {show && (
        <Fade in={show}>
          <div
            className={`${modalClass["container-modal"]} ${className ?? ""}`}
          >
            <div
              onClick={(e) => onCancel?.(e)}
              className={modalClass[`modal-overlay`]}
            />
            <div className={modalClass["modal"]}>
              {header && (
                <div className={modalClass["modal-header"]}>
                  <div className={modalClass["modal-title"]}>{title}</div>
                  {closeAble && (
                    <div
                      className={modalClass["modal-close-icon"]}
                      onClick={(e) => onCancel?.(e)}
                    >
                      <CloseIcon />
                    </div>
                  )}
                </div>
              )}
              <div className={modalClass["modal-content"]}>{children}</div>
              {footer && (
                <div className={modalClass["modal-footer"]}>
                  {/* <Button
                    style={{ borderRadius: 5, padding: "5px 15px" }}
                    className={modalClass["modal-footer-button"]}
                    variant="contained"
                    color="error"
                    onClick={(e) => onCancel?.(e)}
                  >
                    {cancelText ?? "Cancel"}
                  </Button> */}
                  {okLoading ? (
                    <Button
                      style={{ borderRadius: 5, padding: "5px 15px" }}
                      className={modalClass["modal-footer-button"]}
                      variant="contained"
                      color="primary"
                    >
                      <CircularProgress size={20} sx={{ color: "white" }} />
                    </Button>
                  ) : (
                    <Button
                      style={{ borderRadius: 5, padding: "5px 15px" }}
                      className={modalClass["modal-footer-button"]}
                      onClick={(e) => onOk?.(e)}
                      variant="contained"
                      color="primary"
                    >
                      {okText ?? "Accept"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Fade>
      )}
    </React.Fragment>
  );
};

export default Modal;
