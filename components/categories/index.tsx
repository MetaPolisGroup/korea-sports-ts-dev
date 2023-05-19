import React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ECategories } from "@/store/Category/type";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getCategory } from "@/store/Category";
import Odd from "../odd";
import { AppDispatch } from "@/store";
import { useRouter } from "next/router";

import classes from "./categories.module.css";

interface ICategores {
  title?: string;
  isShowLogoRight?: boolean;
}

const Categories: React.FC<ICategores> = React.memo((props) => {
  const { category } = useAppSelector((state) => state.categorySlice);
  const router = useRouter();
  const { slugoversea } = router.query;
  const sportId = slugoversea && slugoversea[0];
  const pathName = router.asPath;

  const dispatch = useAppDispatch();
  return (
    <Grid container alignItems="center" my={2} justifyContent="space-between">
      <Grid
        item
        sm={props.isShowLogoRight ? 24 : 3}
        md={props.isShowLogoRight ? 24 : 2}
      >
        <Typography style={{ color: "white" }}>{props.title}</Typography>
      </Grid>
      {!props.isShowLogoRight ? (
        <Grid item gap="10px">
          <Grid container spacing={1}>
            {listCategories.map((categories) => (
              <Grid key={categories.id} item>
                <Odd
                  typeButton="Button"
                  style={{
                    backgroundColor:
                      (sportId ? sportId : category.id) ===
                      categories.id.toString()
                        ? "#2283f6"
                        : "",
                  }}
                  onClick={() => {
                    handleClickCategory(
                      dispatch,
                      category.id,
                      categories.id.toString(),
                      categories.src
                    );
                    if (
                      pathName !== "/domestic" &&
                      pathName !== "/oversea" &&
                      pathName !== "/live"
                    ) {
                      router.push("/oversea");
                    }
                  }}
                  className={classes.btnCategori}
                >
                  <Image
                    width={25}
                    height={25}
                    src={
                      (sportId ? sportId : category.id) ===
                      categories.id.toString()
                        ? categories.src_active
                        : categories.src
                    }
                    alt={`Category ${categories.id}`}
                    loading="lazy"
                    className={classes.imgCategori}
                  />
                </Odd>
              </Grid>
            ))}
            <Grid item>
              <Odd
                typeButton="Button"
                style={{
                  height: "100%",
                  backgroundColor:
                    (sportId ? sportId : category.id) === "all"
                      ? "#2283f6"
                      : "",
                  color:
                    (sportId ? sportId : category.id) === "all"
                      ? "#fff"
                      : "var(--color-white-500)",
                }}
                onClick={() => {
                  dispatch(getCategory({ id: "all", src: "" }));
                  if (
                    pathName !== "/domestic" &&
                    pathName !== "/oversea" &&
                    pathName !== "/live"
                  ) {
                    router.push("/oversea");
                  }
                }}
                className={classes.btnCategori}
              >
                모두
              </Odd>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
});

export default Categories;

const handleClickCategory = (
  dispatch: AppDispatch,
  category: ECategories,
  categoryId: string,
  src: string
) => {
  if (category !== categoryId) {
    dispatch(getCategory({ id: categoryId as ECategories, src }));
  }
};

export const listCategories = [
  {
    id: 1,
    src: "/images/games/ball-icon_inactive.svg",
    src_active: "/images/games/ball-icon_active.svg",
  },
  {
    id: 18,
    src: "/images/games/basket-ball.svg",
    src_active: "/images/games/basket-ball_active.svg",
  },
  {
    id: 16,
    src: "/images/games/base-ball.svg",
    src_active: "/images/games/base-ball_active.svg",
  },
  {
    id: 17,
    src: "/images/games/ice-hockey.svg",
    src_active: "/images/games/ice-hockey_active.svg",
  },
  {
    id: 91,
    src: "/images/games/volleyball_inactive.svg",
    src_active: "/images/games/volleyball_active.svg",
  },
  {
    id: 12,
    src: "/images/games/america-football.svg",
    src_active: "/images/games/america-football_active.svg",
  },
];
