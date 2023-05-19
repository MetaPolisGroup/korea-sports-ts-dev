import Link from "next/link";
import React from "react";
import classes from "./announcement.module.css";

const Announcement = () => {
  return (
    <div className={classes.announcement}>
      <div className={classes["announcement-block"]}>
        <div className={classes["announcement-title"]}>
          <h3>공지사항</h3>
          <h3>모두보기</h3>
        </div>
        <ul>
          <li>
            <Link href="/">
              <span>카지노 / 슬롯게임 규정 및 페이백 이벤트 안내</span>
            </Link>
            <span>2023-02-01</span>
          </li>
          <li>
            <Link href="/">
              <span>카지노 / 슬롯게임 규정 및 페이백 이벤트 안내</span>
            </Link>
            <span>2023-02-01</span>
          </li>
          <li>
            <Link href="/">
              <span>카지노 / 슬롯게임 규정 및 페이백 이벤트 안내</span>
            </Link>
            <span>2023-02-01</span>
          </li>
          <li>
            <Link href="/">
              <span>카지노 / 슬롯게임 규정 및 페이백 이벤트 안내</span>
            </Link>
            <span>2023-02-01</span>
          </li>
          <li>
            <Link href="/">
              <span>카지노 / 슬롯게임 규정 및 페이백 이벤트 안내</span>
            </Link>
            <span>2023-02-01</span>
          </li>
        </ul>
      </div>
      <div className={classes["announcement-block"]}>
        <div className={classes["announcement-title"]}>
          <h3>실시간 입금 현황</h3>
          <h3>충전페이지</h3>
        </div>
        <ul>
          <li>
            <Link href="/">
              <span>2023-03-14 11:004784634786238746</span>
            </Link>
            <span>bmw****</span>
            <span>200,000</span>
          </li>
          <li>
            <Link href="/">
              <span>2023-03-14 11:004784634786238746</span>
            </Link>
            <span>bmw****</span>
            <span>200,000</span>
          </li>
          <li>
            <Link href="/">
              <span>2023-03-14 11:004784634786238746</span>
            </Link>
            <span>bmw****</span>
            <span>200,000</span>
          </li>
          <li>
            <Link href="/">
              <span>2023-03-14 11:004784634786238746</span>
            </Link>
            <span>bmw****</span>
            <span>200,000</span>
          </li>
          <li>
            <Link href="/">
              <span>2023-03-14 11:004784634786238746</span>
            </Link>
            <span>bmw****</span>
            <span>200,000</span>
          </li>
        </ul>
      </div>
      <div className={classes["announcement-block"]}>
        <div className={classes["announcement-title"]}>
          <h3>실시간 출금 현황</h3>
          <h3>환전페이지</h3>
        </div>
        <ul>
          <li>
            <Link href="/">
              <span>2023-03-14 11:00...</span>
            </Link>
            <span>akf*******</span>
            <span>150,000</span>
          </li>
          <li>
            <Link href="/">
              <span>2023-03-14 11:00...</span>
            </Link>
            <span>akf*******</span>
            <span>150,000</span>
          </li>
          <li>
            <Link href="/">
              <span>2023-03-14 11:00...</span>
            </Link>
            <span>akf*******</span>
            <span>150,000</span>
          </li>
          <li>
            <Link href="/">
              <span>2023-03-14 11:00...</span>
            </Link>
            <span>akf*******</span>
            <span>150,000</span>
          </li>
          <li>
            <Link href="/">
              <span>2023-03-14 11:00...</span>
            </Link>
            <span>akf*******</span>
            <span>150,000</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Announcement;
