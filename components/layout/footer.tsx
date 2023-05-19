import React from "react";
import classes from "./footer.module.css";
import Link from "next/link";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RedditIcon from "@mui/icons-material/Reddit";
import Logo from "./logo";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div>
        <span>저작권 © 2023 다낭. 판권 소유</span>
      </div>
      <div>
        <Logo />
      </div>
      <div className={classes.terms}>
        <span>이용약관</span>
        <span>개인 정보 정책</span>
      </div>
    </div>
  );
};

export default Footer;

Footer.defaultProps = {
  dataLogos: [],
};
