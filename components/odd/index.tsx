import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import ToggleButton, { ToggleButtonProps } from "@mui/material/ToggleButton";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

type OddProps = ButtonProps &
  Omit<ToggleButtonProps, "value"> & {
    typeButton: "Button" | "Toggle";
    children?: React.ReactNode;
    value?: any;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
  };

const Odd: React.FC<OddProps> = ({
  typeButton,
  style,
  children,
  disabled,
  value,
  ...props
}) => {
  return typeButton === "Button" ? (
    <ComponentOdd.ButtonStlye sx={{ ...style }} disabled={disabled} {...props}>
      {children}
    </ComponentOdd.ButtonStlye>
  ) : (
    <ComponentOdd.ToggleStyle
      value={value}
      style={style}
      disabled={disabled}
      {...props}
    >
      {children}
    </ComponentOdd.ToggleStyle>
  );
};

const ComponentOdd = {
  ButtonStlye: styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(grey[700]),
    backgroundColor: "#19212b",
    flexDirection: "column",
    textTransform: "capitalize",
    width: "100%",
    "&:hover": {
      backgroundColor: "#2283f6",
    },
  })),

  ToggleStyle: styled(ToggleButton)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[700]),
    backgroundColor: "#19212b",
    width: "100%",
    borderRadius: 5,
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: '#2283f6',
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "#2283f6",
      color: "white",
    },
    "&.Mui-disabled": {
      color: theme.palette.getContrastText(grey[700]),
    },
    '&:nth-of-type(2)': {
      minWidth: 100,
      width: 100,
      justifyContent: 'center'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '10px',
      flexDirection: 'column',
      padding: '0 10px',
      '&:nth-of-type(2)': {
        minWidth: 50,
        width: 50,
        justifyContent: 'center'
      },
      '&:nth-of-type(3)': {
        flexDirection: 'column-reverse',
      },
    },
    [theme.breakpoints.only('sm')]: {
      fontSize: '15px',
      flexDirection: 'row',
      padding: '10px',
      '&:nth-of-type(3)': {
        flexDirection: 'row',
      },
      '&:nth-of-type(2)': {
        minWidth: 100,
        width: 100,
        justifyContent: 'center'
      },
    },
  }))
}

export default Odd;
