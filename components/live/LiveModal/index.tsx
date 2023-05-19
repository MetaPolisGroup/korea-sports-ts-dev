import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Stack from "@mui/system/Stack";
import BannerMatch from "@/components/banner-match/banner-match";
import TrackerEvent from "@/components/ui/tracker/tracker";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LiveDetail from "../LiveRender/LiveDetail";
import { IMatchProps } from "@/repositories/data";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
interface IModalLiveProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  detail: IMatchProps | undefined;
  id: string | undefined;
}

const LiveModal: React.FC<IModalLiveProps> = (props) => {
  const { isOpen, setIsOpen } = props;
  const theme = useTheme();
  const isCheck = useMediaQuery(theme.breakpoints.up("md"));

  if (isCheck) return null;

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={(theme) => ({
        [theme.breakpoints.up("md")]: {
          display: "none",
          width: "40%",
        },
        [theme.breakpoints.down("md")]: {
          display: "block",
        },
      })}
    >
      <Fade in={isOpen}>
        <Box
          sx={(theme) => ({
            ...style,
            height: "80%",
            width: "50%",
            [theme.breakpoints.down("md")]: {
              height: "80%",
              width: "90%",
            },
          })}
        >
          <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
            <HighlightOffIcon onClick={() => setIsOpen(false)} />
          </div>
          {props.detail && (
            <Stack direction="column" spacing={2}>
              <BannerMatch detail={props.detail} />
              {/* <TrackerEvent /> */}
              <LiveDetail detail={props.detail} id={props.id} />
            </Stack>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 1,
  backgroundColor: "var(--color-grey-700)",
  overflowY: "scroll",
};

export default LiveModal;
