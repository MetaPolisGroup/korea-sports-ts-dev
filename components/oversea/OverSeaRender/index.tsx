import { IMatchProps } from "@/repositories/data";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";
import BannerMatch from "../../banner-match/banner-match";
import OverSeaDetail from "./OverSeaDetail";

interface IOVerSeaRenderProps {
  detail: IMatchProps | undefined;
}

const OverSeaRender: React.FC<IOVerSeaRenderProps> = (props) => {
  const { detail } = props;

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
          <OverSeaDetail dataDetails={props.detail!} />
        </Stack>
      )}
    </Box>
  );
};

export default OverSeaRender;
