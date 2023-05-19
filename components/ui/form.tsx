import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginForm from "../login-form/login-form";
import SignUpForm from "../signUp-form/signUp-form";
import Modal from "@mui/material/Modal";
import VideoBox from "../sport/videoBox/videoBox";
import classes from "./form.module.css";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 690,
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  outline: "none",
};

const styleLabel = {
  color: "white",
  fontWeight: 600,
};

const FormUI = (props: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.styleModal}
      >
        <Box sx={style}>
          <Box sx={{ width: "366px", p: 4 }}>
            <div className={classes.headContent}>
              <p className={classes.brand}>
                <Image
                  src="/images/logos/danang_white.svg"
                  alt=""
                  width={200}
                  height={100}
                />
              </p>
              <p className={classes.title}>DANANG 의 동행은 계속됩니다</p>
              <p className={classes.subTitle}>
                라이브 스포츠 베팅, 스페셜 게임, 글로벌 리더
              </p>
            </div>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Table form authentication"
                centered
              >
                <Tab label="로그인" {...a11yProps(0)} sx={styleLabel} />
                <Tab label="가입하기" {...a11yProps(1)} sx={styleLabel} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <LoginForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignUpForm />
            </TabPanel>
          </Box>
        </Box>
      </Modal>
      <VideoBox
        linkVideo="/videos/golf_1.mp4"
        videoBoxClass={classes.videoBox}
        className={classes.videoStyle}
        modeFullBackground
      />
    </React.Fragment>
  );
};

export default FormUI;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
