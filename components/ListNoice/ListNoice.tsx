import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import parse from "html-react-parser";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import type { IResponseNotification } from "./interfaceListNoice";
import classes from "./ListNoice.module.css";

import useSWR from "swr";
import * as React from "react";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/helpers/db-config";
import { useAppSelector } from "@/store/hook";
import { CircularProgress, ListItemIcon, ListItemText } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { isEmpty } from "lodash";
import EmptyData from "../ui/EmptyData/input";

interface INoliceProps {
  title: "Announcement" | "Event" | "Betting rules" | "Send note";
}

enum ETypes {
  "Announcement" = "발표",
  "Event" = "이벤트",
  "Betting rules" = "베팅 규칙",
  "Send note" = "메모를 보내십시오",
}

const NoticeList: React.FC<INoliceProps> = (props) => {
  const { title } = props;
  const { id } = useAppSelector((state) => state.user);
  const [datas, setDatas] = React.useState<any>([]);

  const { data, isLoading } = useSWR(`noice-${title + id}`, {
    fetcher: async () => {
      let q: any;
      if (title !== "Send note") {
        q = query(
          collection(db, "notifications"),
          where("type", "==", title),
          where("delete", "==", false),
          where("status", "==", "Active"),
          where("users", "array-contains", id),
          orderBy("created_at", "desc")
        );
      } else {
        q = query(
          collection(db, "notifications"),
          where("type", "==", title),
          where("status", "==", "Active"),
          where("delete", "==", false),
          where("sending_status", "!=", "Waiting"),
          where("users", "array-contains", id),
          orderBy("created_at", "desc")
        );
      }
      onSnapshot(q, (querySnapshot: QuerySnapshot) => {
        const data: DocumentData[] = [];
        querySnapshot.forEach((doc: DocumentData) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        setDatas(data);
      });

      return data;
    },
  });

  return (
    <div>
      <div
        style={{
          marginBottom: 50,
          justifyContent: "center",
          display: "flex",
          fontSize: 30,
        }}
      >
        {ETypes[title]}
      </div>
      {!isLoading && !isEmpty(datas) ? (
        <List
          sx={{ width: "100%", bgcolor: "#19212b" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {datas.map((item: IResponseNotification, index: number) => (
            <ItemData key={index} index={index} item={item} />
          ))}
        </List>
      ) : isEmpty(datas) ? (
        <EmptyData
          message={`찾을 수 없습니다 ${ETypes[title].toLowerCase()}`}
        />
      ) : (
        <CircularProgress style={{ display: "flex", margin: "0 auto" }} />
      )}
    </div>
  );
};

export default NoticeList;
interface ItemDataProps {
  index: number;
  item: IResponseNotification;
}
const ItemData: React.FC<ItemDataProps> = (props) => {
  const { index, item } = props;
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <div
          style={{
            border: "2px solid blue",
            margin: "10px",
            padding: "5px 10px",
            borderRadius: 4,
          }}
        >
          {index + 1}
        </div>
        <ListItemButton onClick={handleClick} style={{ padding: 0 }}>
          {item.title}
          {/* {open ? <ExpandLess /> : <ExpandMore />} */}
          <ListItemIcon>
            {open ? (
              <ArrowUpward style={{ color: "white" }} />
            ) : (
              <ArrowDownward style={{ color: "white" }} />
            )}
          </ListItemIcon>
        </ListItemButton>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 10 }}>
            <ListItemText
              className={classes["text-group"]}
              primary={parse(item.content)}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </React.Fragment>
  );
};
