import { IMatchProps } from "@/repositories/data";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import BannerMatch from "../../banner-match/banner-match";
import TrackerEvent from "../../ui/tracker/tracker";
import LiveDetail from "./LiveDetail";

interface ILiveDetail {
  detail: IMatchProps | undefined;
  id: string | undefined;
}

const LiveRender: React.FC<ILiveDetail> = (props) => {
  const { detail, id } = props;

  return (
    <Box
      sx={(theme) => ({
        [theme.breakpoints.up("md")]: {
          display: "block",
          width: "40%",
        },
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      })}
    >
      {detail && (
        <Stack direction="column" spacing={2}>
          <BannerMatch detail={detail} />
          {/* <TrackerEvent /> */}
          <LiveDetail detail={detail} id={id} />
        </Stack>
      )}
    </Box>
  );
};

export default LiveRender;
