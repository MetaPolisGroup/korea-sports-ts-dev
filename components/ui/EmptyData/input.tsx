import React from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

interface TProps {
  message?: string;
}

const EmptyData: React.FC<TProps> = (props) => {
  const style = {};

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        margin: "auto",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <ReportGmailerrorredIcon /> {props?.message}
    </div>
  );
};

export default EmptyData;

EmptyData.defaultProps = {
  message: "데이터 없음...",
};
