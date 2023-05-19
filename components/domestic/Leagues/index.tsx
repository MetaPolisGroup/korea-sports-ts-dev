import React from "react";
import Content from "./Content";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Odd from "@/components/odd";
import Grid from "@mui/material/Grid";
import { IDomesticProps } from "../domestic";
import { IMatchProps } from "@/repositories/data";
import LoadMore from "@/components/ui/LoadMore";
import { EStatus } from "@/lib/get-func";
import { useAppSelector } from "@/store/hook";

import { RootState } from "@/store";
import EmptyData from "@/components/ui/EmptyData/input";
import { isEmpty } from "lodash";
import classes from "./Leagues.module.css";

const Leagues: React.FC<IDomesticProps> = ({ matchesData }) => {
  const [count, setCount] = React.useState<number>(0);
  const { betsData } = useAppSelector((state: RootState) => state.betSlip);
  const { rules } = useAppSelector((state: RootState) => state.bettingRules);

  const handleFindBonus = () => {
    if (betsData.length >= 3 && betsData.length <= 4) return 0;
    if (betsData.length >= 5 && betsData.length <= 6) return 1;
    if (betsData.length >= 7) return 2;
    return null;
  };

  return (
    <LoadMore<IMatchProps>
      typeScroll="Array"
      collection="matches"
      initialData={matchesData.data}
      initialLastVisible={matchesData.lastVisible}
      status={EStatus.OFF}
      render={(data, handleScroll) => (
        <Box
          sx={{
            height: 1040,
            overflowY: "scroll",
          }}
          onScroll={handleScroll}
        >
          {rules?.betting_rules?.bonus?.available && !isEmpty(data) ? (
            <div className={classes.boxBonus}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ color: "yellow" }}>다폴더 보너스 추가 배당</span>
                (3, 5, 7)폴더 이상 조합시 지급
              </div>
              <Grid container spacing={2} style={{ padding: 6 }}>
                {Array(3)
                  .fill(0)
                  .map((_, idx) => {
                    let number = 3 + 2 * idx;
                    const isBonus = handleFindBonus();
                    return (
                      <Grid
                        item
                        md={4}
                        xs={4}
                        sm={4}
                        key={idx}
                        style={{ paddingLeft: 8 }}
                      >
                        <Odd
                          typeButton="Button"
                          className={
                            isBonus === idx
                              ? classes.btnBonusActive
                              : classes.btnBonus
                          }
                        >
                          {number}폴더 배당
                        </Odd>
                      </Grid>
                    );
                  })}
              </Grid>
            </div>
          ) : null}
          <Stack
            direction="column"
            spacing={0.5}
            borderRadius={1}
            padding={1}
            margin="15px 0"
            justifyContent="center"
          >
            {!isEmpty(data) ? (
              data.map((matchData) => (
                <div
                  style={{
                    background: "#111923",
                    padding: "5px 12px",
                    borderRadius: "8px",
                  }}
                  key={matchData.id}
                >
                  <Content
                    dataDetails={matchData}
                    increment={() => setCount((prev) => (prev += 1))}
                    decrement={() => setCount((prev) => (prev -= 1))}
                    isShowExtends={true}
                    typeMatch="pre-match"
                  />
                </div>
              ))
            ) : (
              <EmptyData message="국내 데이터 없음" />
            )}
          </Stack>
        </Box>
      )}
    />
  );
};

export default Leagues;
