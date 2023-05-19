import React from "react";
import Categories from "../categories";
import Content from "../domestic/Leagues/Content";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import OverSeaModal from "./OverSeaModal";
import OverSeaRender from "./OverSeaRender";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Odd from "../odd";
import EmptyData from "../ui/EmptyData/input";
import classes from "./oversea.module.css";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import { isEmpty } from "lodash";
import { IDomesticProps } from "../domestic/domestic";
import LoadMore from "../ui/LoadMore";
import { IMatchProps } from "@/repositories/data";
import { EStatus } from "@/lib/get-func";

const Oversea: React.FC<IDomesticProps> = ({ matchesData }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [id, setId] = React.useState<string>(matchesData?.[0]?.id);
  const { betsData } = useAppSelector((state: RootState) => state.betSlip);
  const { rules } = useAppSelector((state: RootState) => state.bettingRules);

  const handleFindBonus = () => {
    if (betsData.length >= 3 && betsData.length <= 4) return 0;
    if (betsData.length >= 5 && betsData.length <= 6) return 1;
    if (betsData.length >= 7) return 2;
    return null;
  };

  return (
    <React.Fragment>
      <Categories title="해외베팅시스템" />
      {!matchesData ? (
        <CircularProgress style={{ display: "flex", margin: "0 auto" }} />
      ) : (
        <>
          <LoadMore<IMatchProps>
            collection="matches"
            typeScroll="Array"
            status={EStatus.OFF}
            initialData={matchesData}
            initialLastVisible={matchesData.lastVisible}
            render={(data, handleScroll) => (
              <Box display="flex" columnGap="15px">
                <Box
                  sx={(theme) => ({
                    height: 1040,
                    overflowY: "scroll",
                    width: "60%",
                    [theme.breakpoints.down("md")]: {
                      width: "100%",
                    },
                    [theme.breakpoints.up("md")]: {
                      width: "70%",
                    },
                  })}
                  onScroll={handleScroll}
                >
                  {rules?.betting_rules?.bonus?.available &&
                  !isEmpty(matchesData.data) ? (
                    <div className={classes.boxBonus}>
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ color: "yellow" }}>
                          다폴더 보너스 추가 배당
                        </span>
                        (3, 5, 7)폴더 이상 조합시 지급
                      </div>
                      <Grid container spacing={2} style={{ padding: 8 }}>
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
                    my={1}
                    sx={(theme) => ({
                      "&:nth-of-type(1)": {
                        mt: 0,
                      },
                    })}
                  >
                    {!isEmpty(data) ? (
                      data.map((matchData, idx) => (
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
                            typeMatch="pre-match"
                            idMatch={id}
                          />
                        </div>
                      ))
                    ) : (
                      <EmptyData message="해외 데이터 없음" />
                    )}
                  </Stack>
                </Box>

                {data ? (
                  <OverSeaRender
                    detail={id ? data.find((i) => i.id === id) : data[0]}
                  />
                ) : null}

                {data && (
                  <OverSeaModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    detail={id ? data.find((i) => i.id === id) : data[0]}
                  />
                )}
              </Box>
            )}
          />

          {/* <Box display="flex" columnGap="15px">
            <Box
              sx={(theme) => ({
                height: 1040,
                overflowY: "scroll",
                width: "60%",
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
                [theme.breakpoints.up("md")]: {
                  width: "70%",
                },
              })}
            >
              {rules?.betting_rules?.bonus?.available &&
              !isEmpty(matchesData) ? (
                <div className={classes.boxBonus}>
                  <div style={{ marginBottom: "10px" }}>
                    <span style={{ color: "yellow" }}>
                      다폴더 보너스 추가 배당
                    </span>
                    (3, 5, 7)폴더 이상 조합시 지급
                  </div>
                  <Grid container spacing={2} style={{ padding: 8 }}>
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
                my={1}
                sx={(theme) => ({
                  "&:nth-of-type(1)": {
                    mt: 0,
                  },
                })}
              >
                {!isEmpty(matchesData) ? (
                  matchesData.map((matchData: any, idx: any) => (
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
                        typeMatch="pre-match"
                        idMatch={id}
                      />
                    </div>
                  ))
                ) : (
                  <EmptyData message="해외 데이터 없음" />
                )}
              </Stack>
            </Box>
            {matchesData ? (
              <OverSeaRender
                detail={
                  id
                    ? matchesData.find((i: any) => i.id === id)
                    : matchesData[0]
                }
              />
            ) : null}

            {matchesData && (
              <OverSeaModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                detail={
                  id
                    ? matchesData.find((i: any) => i.id === id)
                    : matchesData[0]
                }
              />
            )}
          </Box> */}
        </>
      )}
    </React.Fragment>
  );
};

export default Oversea;
