import React from "react";

import { useRouter } from "next/router";
import classes from "./left-navigation.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const LIST_BTN = [
  {
    id: "btn1",
    title: "해외형 스포츠",
    redirect: "/oversea",
  },
  {
    id: "btn2",
    title: "국내형 크로스",
    redirect: "/domestic",
  },
  {
    id: "btn3",
    title: "라이브 스포츠",
    redirect: "/live",
  },
  {
    id: "btn4",
    title: "라이브 카지노",
    redirect: "/casino",
  },
  {
    id: "btn5",
    title: "슬롯게임",
    redirect: "/slot-provider",
  },
  {
    id: "btn6",
    title: "베팅 내역",
    redirect: "/history",
  },
  {
    id: "btn7",
    title: "캐쉬내역",
    redirect: "/cash-history",
  },
  {
    id: "btn8",
    title: "배팅규정",
    redirect: "/betting-rules",
  },
  {
    id: "btn9",
    title: "이벤트",
    redirect: "/event",
  },
  {
    id: "btn10",
    title: "발표",
    redirect: "/announcement",
  },
  {
    id: "btn11",
    title: "고객센터",
    redirect: "/customer-service",
  },
  {
    id: "btn12",
    title: "포인트전환",
    redirect: "/point",
  },
];

const LeftNavigation: React.FC = () => {
  const router = useRouter();

  const handleRedirect = (url: string) => {
    return router.push(url);
  };

  return (
    <div className={classes.LeftNav}>
      <button
        className={classes.btnHeader}
        onClick={() => handleRedirect("/deposit")}
      >
        <AddBoxIcon className={classes.green} /> 입금
      </button>
      <button
        className={classes.btnHeader}
        onClick={() => handleRedirect("/withdraw")}
      >
        <IndeterminateCheckBoxIcon className={classes.red} /> 출금
      </button>

      {LIST_BTN?.map((btn) => (
        <button key={btn.id} onClick={() => handleRedirect(btn.redirect)}>
          {btn.title}
        </button>
      ))}
    </div>
  );
};

export default LeftNavigation;
