import React from "react";
import Categories from "../categories";
import Content from "../domestic/Leagues/Content";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LiveModal from "./LiveModal";
import LiveRender from "./LiveRender";
import { useMediaQuery, useTheme } from "@mui/material";
import EmptyData from "../ui/EmptyData/input";
import { isEmpty } from "lodash";
import {
  onSnapshot,
  collection,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/helpers/db-config";
import classes from "./live.module.css";

interface IResponse {
  data: any[];
  lastVisible: any;
}

interface ILiveDatas {
  datas: any;
}

interface LiveProps extends React.FC<ILiveDatas> {}

const Live: LiveProps = ({ datas }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [oddMatch, setOddMatch] = React.useState<DocumentData>([]);
  const [id, setId] = React.useState<string>();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  React.useEffect(() => {
    // console.log({ datas });
    const oddArr: any = [];

    for (let data in datas) {
      const q = query(
        collection(db, "odds"),
        where("FI", "==", datas[data].id)
      );

      // console.log(datas[data]);

      onSnapshot(q, (querySnapshot: any) => {
        querySnapshot.forEach((doc: DocumentData) => {
          oddArr.push({
            id: doc.data().FI,
            isOdd: !isEmpty(doc.data().main.sp),
          });
        });

        const filteredArr = oddArr.reduce((acc: any, current: any) => {
          const x = acc.find((item: any) => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        setOddMatch(filteredArr);
      });
    }
  }, [datas]);

  const datasFilterd = datas.filter((data: any) =>
    oddMatch.find((odd: any) => odd.id === data.id && odd.isOdd === true)
  );

  return (
    <React.Fragment>
      <Categories title="해외베팅시스템" />

      <Box display="flex" columnGap="15px">
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              width: "100%",
            },
            [theme.breakpoints.up("md")]: {
              width: "70%",
            },
          })}
          className={classes.liveLeftSide}
        >
          <Stack
            direction="column"
            spacing={0.5}
            borderRadius={1}
            padding={1}
            my={1}
            sx={(theme) => ({
              "&:nth-of-type(1)": {
                mt: 0,
              },
            })}
          >
            {!isEmpty(datasFilterd) ? (
              datasFilterd &&
              datasFilterd.map((matchData: any, idx: any) => (
                <div
                  style={{
                    background: "#111923",
                    padding: "5px 12px",
                    borderRadius: "8px",
                  }}
                  key={idx}
                >
                  <Content
                    dataDetails={matchData}
                    isShowExtends={false}
                    handleShowOverseaDetail={(id) => {
                      setId(id);
                      setIsOpen(!isOpen);
                    }}
                    typeMatch="inplay-match"
                    idMatch={id}
                  />
                </div>
              ))
            ) : (
              <EmptyData message="라이브에서 일치하는 항목 없음" />
            )}
          </Stack>
        </Box>
        {datasFilterd && (
          <LiveRender
            detail={
              id ? datasFilterd.find((i: any) => i.id === id) : datasFilterd[0]
            }
            id={id}
          />
        )}
        {!md && datasFilterd && (
          <LiveModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            detail={
              id ? datasFilterd.find((i: any) => i.id === id) : datasFilterd[0]
            }
            id={id}
          />
        )}
      </Box>
    </React.Fragment>
  );
};

export default Live;
