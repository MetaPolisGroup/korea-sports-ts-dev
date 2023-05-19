import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import InputComponent from "../ui/Input";
import CircularProgress from "@mui/material/CircularProgress";
import { isEmpty } from "lodash";
import NotificationAlert from "@/components/ui/notification-alert";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Login } from "@/store/slices/userSlipSlice";
import { RootState } from "@/store";
import { useRouter } from "next/router";

const styleInputField = {
  backgroundColor: "white",
  padding: "6px 16px",
  borderRadius: "8px",
};

const schema = yup
  .object({
    ID: yup
      .string()
      .test("CheckID", "아이디는 필수 입력 항목입니다.", function (value) {
        if (value === "" || value === undefined) return false;
        return true;
      }),
    password: yup
      .string()
      .test("CheckPass", "비밀번호는 필수 입력 항목입니다", function (value) {
        if (value === "" || value === undefined) return false;
        return true;
      }),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state: RootState) => state.user);
  const [isHaveError, setIsHaveError] = React.useState<boolean>(false);

  const router = useRouter();
  const LoginStatus = router?.query?.LoginStatus;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (LoginStatus === "FAIL" && isHaveError === false) {
      setIsHaveError(true);
      setErrorMessage("유효하지 않은 계정 정보입니다.");
    }
  }, [LoginStatus]);

  const onSubmit = (data: FormData) => {
    if (data)
      dispatch(
        Login({ id: data.ID as string, password: data.password as string })
      ).then(i => setErrorMessage(i.payload.response?.data.message));
  };

  const renderErrorMessage = () => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(""), 3000);
    }

    return (
      <NotificationAlert
        showNotify={!isEmpty(errorMessage)}
        message={errorMessage}
        status="error"
        title="알림"
      />
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2} paddingTop={3}>
        {renderErrorMessage()}
        <InputComponent
          register={register}
          name="ID"
          placeholder="아이디"
          errorForm={errors.ID}
          styleError={{ color: "red" }}
          disableUnderline={true}
          sx={styleInputField}
        />
        <InputComponent
          register={register}
          name="password"
          type="password"
          placeholder="비밀번호"
          errorForm={errors.password}
          styleError={{ color: "red" }}
          disableUnderline={true}
          sx={styleInputField}
        />
        <Button variant="contained" type="submit">
          {status === "loading" ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "로그인"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
