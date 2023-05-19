import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import css from "./profile.module.css";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EventIcon from "@mui/icons-material/Event";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HistoryIcon from "@mui/icons-material/History";
import Link from "next/link";
import jwt_decode from "jwt-decode";

import { RootState } from "@/store";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import { clearDataUser, Me } from "@/store/slices/userSlipSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { CurrencyConverter } from "@/helpers/currency-converter";
import { clearAccessToken } from "@/store/slices/tokenSlice";
import { clearBetSlip } from "@/store/slices/betSlipSlice";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import authApi from "@/services/authApi";

interface TProfile {
  className?: string;
}

interface TUserProfile {
  id: string | null;
  nickName: string;
  balance: number;
  level: number;
  point: number;
}

interface TDecodedToken {
  id: string;
  iat: number;
  last_login: number;
}

const Profile: React.FC<TProfile> = ({ className }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { nickname, level, point, balance } = useAppSelector(
    (state: RootState) => state.user
  );
  const token = useAppSelector((state: RootState) => state.token.access_token);

  useEffect(() => {
    if (token) {
      const decode = jwt_decode(token) as TDecodedToken;
      dispatch(
        Me({
          id: decode.id,
          lastLoginAt: decode.last_login,
        })
      );
    }
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(clearDataUser());
    dispatch(clearAccessToken());
    dispatch(clearBetSlip());
    const res = authApi.logout();
    res.then((res) => console.log(res));
  };

  return (
    <div className={`${css["profile"]} ${className}`}>
      <Box
        display="flex"
        flexDirection="column"
        margin="10px 10px"
        alignItems="center"
        borderRadius="15px"
        padding="10px 0"
        gap="10px 0"
      >
        <div style={{ position: "relative" }}>
          <Avatar style={{ width: 100, height: 100 }} />
          <div className={css["title-profile"]}>
            <span
              style={{
                padding: "0 20px",
                backgroundColor: "#ed1d49",
                marginTop: 3,
                borderRadius: "20px",
                fontWeight: "bold",
              }}
            >
              Level {level}
            </span>
          </div>
        </div>
        <Typography variant="h6" gutterBottom style={{ margin: "20px 0 0 0" }}>
          {nickname ?? "UserName"}
        </Typography>
        <div>
          <Box
            display="flex"
            alignItems="center"
            gap="0 10px"
            marginBottom={"10px"}
          >
            <Image
              alt=" 보유머니"
              src={"/images/won/icons8-won-50.png"}
              loading="lazy"
              height={30}
              width={30}
            />
            <span>보유머니</span>
            <strong>{balance.toLocaleString("es-US")}</strong>
            <span>원</span>
          </Box>
          <Box display="flex" alignItems="center" gap="0 14px">
            <p className={css["point"]}>P</p>
            <span>포인트</span>
            <strong>{point.toLocaleString("es-US")}</strong>
            <span>점</span>
          </Box>
        </div>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="5px"
        margin="10px 20px"
        alignItems="center"
        bgcolor="#2b3544"
        borderRadius="15px"
        padding="0px 10px"
      >
        {renderListAction.map((renderItemAction, index) => (
          <ListItem key={index} component="div" disablePadding>
            <ListItemButton style={{ padding: "5px 0" }}>
              <Link
                href={renderItemAction.path}
                style={{ display: "flex", width: "100%", alignItems: "center" }}
              >
                <IconButton>{renderItemAction.icon}</IconButton>
                <ListItemText primary={renderItemAction.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </Box>
      <Button onClick={() => handleLogOut()} className={css.btnLogout}>
        <PowerSettingsNewIcon />
        로그아웃
      </Button>
    </div>
  );
};
const renderListAction = [
  {
    name: "고객 서비스",
    icon: <HeadphonesIcon fontSize="small" style={{ color: "white" }} />,
    path: "/customer-service",
  },
  {
    name: "발표",
    icon: <ErrorOutlineIcon fontSize="small" style={{ color: "white" }} />,
    path: "/announcement",
  },
  {
    name: "이벤트",
    icon: <EventIcon fontSize="small" style={{ color: "white" }} />,
    path: "/event",
  },
  {
    name: "배팅규정",
    icon: (
      <IntegrationInstructionsIcon
        fontSize="small"
        style={{ color: "white" }}
      />
    ),
    path: "/betting-rules",
  },
  {
    name: "캐쉬내역",
    icon: <LocalAtmIcon fontSize="small" style={{ color: "white" }} />,
    path: "/cash-history",
  },
  {
    name: "보증금",
    icon: <CurrencyExchangeIcon fontSize="small" style={{ color: "white" }} />,
    path: "/deposit",
  },
  {
    name: "철회하다",
    icon: <AttachMoneyIcon fontSize="small" style={{ color: "white" }} />,
    path: "/withdraw",
  },
  {
    name: "베팅 내역",
    icon: <HistoryIcon fontSize="small" style={{ color: "white" }} />,
    path: "/history",
  },
];

export default Profile;

Profile.defaultProps = {
  className: "",
};
