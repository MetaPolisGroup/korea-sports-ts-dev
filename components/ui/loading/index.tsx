import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box display="flex" width="100%" alignItems="center" gap={1}>
      <Skeleton
        variant="rounded"
        height={25}
        width="10%"
        style={{ backgroundColor: "gray" }}
      />
      <Skeleton
        variant="text"
        height={40}
        width="90%"
        style={{ backgroundColor: "gray" }}
      />
    </Box>
  );
};

export default Loading;
