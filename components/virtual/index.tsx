import React, { useMemo, useState } from "react";

import { FakeDataVirtual } from "@/data";
import { isEmpty } from "lodash";
import classes from "./virtual.module.css";
import GradeIcon from "@mui/icons-material/Grade";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const DATA_PAGE = [
  {
    id: "content1",
    title: "엔트리",
    listBtn: [
      {
        id: "btn1",
        title: "파워볼",
        color: "#d60000",
        onAction: () => {},
      },
      {
        id: "btn2",
        title: "파워사다리",
        color: "#c41162",
        onAction: () => {},
      },
      {
        id: "btn3",
        title: "EOS 5분",
        color: "#d60000",
        onAction: () => {},
      },
    ],
  },
  {
    id: "content2",
    title: "드림스코어",
    listBtn: [
      {
        id: "btn4",
        title: "3분 코인파워볼",
        color: "#ff9000",
        onAction: () => {
          return (
            <iframe
              src="https://bepick.net/live/coinpower3/scrap"
              width="830"
              height="660"
              scrolling="no"
              frameBorder="0"
            ></iframe>
          );
        },
      },
      {
        id: "btn5",
        title: "5분 코인파워볼",
        color: "#5d871b",
        onAction: () => {
          return (
            <iframe
              src="https://bepick.net/live/coinpower5/scrap"
              width="830"
              height="660"
              scrolling="no"
              frameBorder="0"
            ></iframe>
          );
        },
      },
    ],
  },
  {
    id: "content3",
    title: "PBG",
    listBtn: [],
  },
  {
    id: "content4",
    title: "보스코어",
    listBtn: [
      {
        id: "btn6",
        title: "별다리1분",
        color: "#c41162",
        onAction: () => {
          return (
            <iframe
              src="https://bepick.net/live/bgladder1m/scrap"
              width="830"
              height="660"
              scrolling="no"
              frameBorder="0"
            ></iframe>
          );
        },
      },
      {
        id: "btn7",
        title: "별다리2분",
        color: "#ff9000",
        onAction: () => {
          return (
            <iframe
              src="https://bepick.net/live/bgladder2m/scrap"
              width="830"
              height="660"
              scrolling="no"
              frameBorder="0"
            ></iframe>
          );
        },
      },
      {
        id: "btn8",
        title: "별다리3분",
        color: "#5d871b",
        onAction: () => {
          return (
            <iframe
              src="https://bepick.net/live/bgladder3m/scrap"
              width="830"
              height="660"
              scrolling="no"
              frameBorder="0"
            ></iframe>
          );
        },
      },
    ],
  },
];

interface IRenderGame {
  game: any;
}

const Virtual = () => {
  const [modePage, setModePage] = useState(DATA_PAGE?.[0]);
  const [isShowVideo, setShowVideo] = useState<boolean>(true);
  const [gameObj, setGameObj] = useState<any>();

  const renderListBtnMode = () => {
    return DATA_PAGE?.map?.((item) => {
      return (
        <button
          key={item?.id}
          className={item?.id === modePage?.id ? classes.active : ""}
          onClick={() => {
            setModePage(item);
            setGameObj(item?.listBtn[0]);
          }}
        >
          {item?.title}
        </button>
      );
    });
  };

  const renderListFeatureVideo = () => {
    if (isEmpty(modePage?.listBtn)) return null;

    return modePage?.listBtn?.map((item) => (
      <button
        key={item?.id}
        style={{ borderTop: `5px solid ${item?.color}` }}
        onClick={() => setGameObj(item)}
      >
        {item?.title}
      </button>
    ));
  };

  const renderTime = () => {
    return (
      <div className={classes.boxTime}>
        <div>
          0
          <div />
        </div>
        <div>
          7
          <div />
        </div>
        :
        <div>
          1
          <div />
        </div>
        <div>
          2
          <div />
        </div>
      </div>
    );
  };

  return (
    <div className={classes.virtual}>
      <div className={classes.boxBtn}>
        <div className={classes.listMode}>{renderListBtnMode()}</div>
        <div className={classes.listFeatureVideo}>
          {renderListFeatureVideo()}
        </div>

        <div
          className={classes.toggleVideo}
          onClick={() => setShowVideo(!isShowVideo)}
        >
          게임 현황판 닫기
        </div>
      </div>

      <div
        className={
          isShowVideo ? classes.video : `${classes.video} ${classes.hidden}`
        }
      >
        <div>
          <RenderGame game={gameObj} />
        </div>
      </div>

      <div className={classes.bet}>
        <div className={classes.betTitle}>
          <div>
            <div>
              <GradeIcon />
              <h3>
                POWERBALL <span>221</span> 회차
              </h3>
            </div>
            <p>
              5분단위로 추첨이 이루어지며 하루 288회차 진행 홀짝/언더오버/소중대
              맞추는 게임
            </p>
          </div>
          {renderTime()}
        </div>

        <div className={classes.betList}>bettt</div>
      </div>
    </div>
  );
};

const RenderGame: React.FC<IRenderGame> = ({ game }) => {
  return game?.onAction() ? game.onAction() : null;
};

export default Virtual;
