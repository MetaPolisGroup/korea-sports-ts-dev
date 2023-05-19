import React from "react";
import classes from "./sub-menu.module.css";
import Link from "next/link";
import Box from "@mui/material/Box";

type TData = { id: number; name: string; url: string };

interface ISubmenuProps {
  data: TData[];
  isShowAllSizes?: boolean;
}

const SubMenu: React.FC<ISubmenuProps> = (props) => {
  const { data, isShowAllSizes } = props;

  const mainClassName = isShowAllSizes
    ? `${classes["sub-menu"]} ${classes.showAllSizes} show-in-drawer`
    : classes["sub-menu"];

  return (
    <Box
      className={mainClassName}
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      })}
    >
      {data.map((item) => (
        <Link href={item.url} legacyBehavior key={item.id}>
          <div className={classes["sub-menu__item"]}>
            <a
              className={classes["sub-menu__name"]}
              target="_blank"
              rel="noreferrer"
            >
              {item.name}
            </a>
          </div>
        </Link>
      ))}
    </Box>
  );
};

export default SubMenu;

SubMenu.defaultProps = {
  data: [],
  isShowAllSizes: false,
};
