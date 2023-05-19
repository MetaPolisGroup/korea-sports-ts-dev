import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup, { PopupRef } from "@/components/ui/popup";

interface IHeader {
  actionRemove: () => void;
}

const Header: React.FC<IHeader> = ({ actionRemove }) => {
  const popupRef = React.createRef<PopupRef>();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
      }}
    >
      <span>스포츠 베팅 내역 리스트</span>
      <Popup
        ref={popupRef}
        selector={
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => popupRef.current?.open()}
          >
            모든 기록 삭제
          </Button>
        }
        content={<p>모든 베팅 기록을 삭제하시겠습니까 ?</p>}
        onSubmit={() => {
          actionRemove();
          popupRef.current?.close();
        }}
      />
    </div>
  );
};

export default Header;
