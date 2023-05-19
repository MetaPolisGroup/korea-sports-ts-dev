import React, { useState } from "react";

import dayjs from "dayjs";
import classes from "./ListFeatureNav.module.css";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface IProp {
  data: any;
  onDelete: (id: string) => void;
}

const MAX_LENGTH = 140;

const ItemNoti: React.FC<IProp> = (props) => {
  const { data, onDelete } = props;

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const isReaded = data?.read === true;
  const _dateTime = dayjs(data?.created_at).format("DD-MM-YYYY HH:mm:ss");

  const handleToggleShow = () => {
    return setShowDetails(!showDetails);
  };

  const renderContent = () => {
    if (data?.content.length > MAX_LENGTH) {
      return (
        <div>
          <div
            className={showDetails ? classes.showDetail : classes.hiddenDetail}
          >
            {data?.content}
          </div>
          <div className={classes.boxShowMore}>
            <div onClick={handleToggleShow}>
              {showDetails ? (
                <>
                  숨다 <KeyboardArrowUpIcon />
                </>
              ) : (
                <>
                  더보기 <KeyboardArrowDownIcon />
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    return <div>{data?.content}</div>;
  };

  return (
    <div className={classes.boxNoti} key={data.id}>
      <div>
        <span>{_dateTime}</span>
        {isReaded ? null : <div>새로운</div>}
      </div>
      <div>{data?.title}</div>
      {renderContent()}
      {isReaded ? null : (
        <div>
          <div onClick={() => onDelete(data?.id)}>
            읽음으로 표시 <TaskAltIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemNoti;
