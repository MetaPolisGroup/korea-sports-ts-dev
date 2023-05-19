import React, { useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputComponent from "../ui/Input";

import { isEmpty } from "lodash";
import { BankName } from "@/data";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { queryBuilderFunc } from "@/lib/query-func";
import classes from "./signUp-form.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import NotificationAlert from "@/components/ui/notification-alert";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  ComfirmCodeRegistration,
  Register,
} from "@/store/slices/userSlipSlice";
import { RootState } from "@/store";
import { setUser } from "@/store/slices/userSlipSlice";

interface TBank {
  value: string;
  isHaveError: boolean;
}

const styleInputField = {
  backgroundColor: "white",
  padding: "6px 16px",
  borderRadius: "8px",
};

const SignUpForm = () => {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [bankName, setBankName] = useState<TBank>({
    value: "default",
    isHaveError: false,
  });
  const { status } = useAppSelector((state: RootState) => state.user);

  const password = useRef<string | undefined>();

  const styleSelect = {
    backgroundColor: "white",
    borderRadius: "8px",
    width: "100%",
    color: bankName.isHaveError ? "red" : "black",
  };

  const handleCheckFieldInDB = async (
    fieldName: string,
    value: string | undefined,
    table: string = "users"
  ) => {
    if (value === undefined || !isCheck) return true;

    if (value !== "") {
      const response = await queryBuilderFunc(table, fieldName, "==", value);

      return isEmpty(response);
    }

    return false;
  };

  const schema = yup
    .object({
      id: yup
        .string()
        .test(
          "checkID",
          "입력 데이터가 잘못되었거나 이미 존재합니다.",
          function (value) {
            return handleCheckFieldInDB("id", value);
          }
        ),
      key: yup.string(),
      nickname: yup
        .string()
        .test("checkNickName", "2~20자 사이의 닉네임.", function (value) {
          if (value === undefined || !isCheck) return true;
          if (value.length < 2 || value.length > 20) return false;
          return true;
        }),
      recommendID: yup.string(),
      phone: yup
        .string()
        .test(
          "checkPhone",
          "입력 데이터가 잘못되었거나 이미 존재합니다.",
          function (value) {
            const _value = Number(value);
            if (Number.isNaN(_value)) return false;

            return handleCheckFieldInDB("phone", value);
          }
        ),
      password: yup
        .string()
        .test("checkPass", "암호가 비어 있지 않습니다!", function (value) {
          password.current = value;
          if (value === undefined || !isCheck) return true;
          if (value.length === 0) return false;
          return true;
        }),
      confirm_password: yup
        .string()
        .test(
          "checkPassConfirm",
          "비밀번호가 일치해야합니다",
          function (value) {
            if (
              value === undefined ||
              !isCheck ||
              password.current === undefined
            )
              return true;
            if (value !== password.current) return false;
            return true;
          }
        ),
      bankName: yup.string(),
      accoutNo: yup
        .string()
        .test("checkBankNO", "계정 NO가 이미 존재합니다.", function (value) {
          return handleCheckFieldInDB("bank.account_number", value);
        }),
      accountHolder: yup
        .string()
        .test(
          "checkHolder",
          "입력 데이터가 잘못되었거나 이미 존재합니다.",
          function (value) {
            if (value === undefined || !isCheck) return true;
            if (value === "") return false;
            return true;
          }
        ),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChangeBank = (bank: string) => {
    setBankName({ value: bank, isHaveError: false });
  };

  const onSubmit = (data: FormData) => {
    if (!isCheck) {
      dispatch(ComfirmCodeRegistration({ subCode: data?.key })).then(
        (response) => {
          if (response.payload === true) {
            setIsCheck(true);
          }
          if (
            response.payload === undefined ||
            response?.payload?.statusCode === 404
          ) {
            setErrorMessage("구독 코드를 찾을 수 없습니다.");
          }

          dispatch(setUser({ status: "idle" }));
        }
      );
    }

    if (isCheck) {
      if (bankName.value === "default")
        return setBankName({ value: bankName.value, isHaveError: true });

      const dataInput = {
        subCode: data?.key,
        id: data?.id,
        nickname: data?.nickname,
        phone: data?.phone,
        password: data?.password,
        bankName: bankName?.value,
        bankAccountNumber: data?.accoutNo,
        bankAccountHolder: data?.accountHolder,
        recommendId: data?.recommendID ?? "",
      };

      dispatch(Register(dataInput))
        .then((response) => {
          if (response?.payload?.statusCode === 404) {
            dispatch(setUser({ status: "idle" }));
            return setErrorMessage(response?.payload?.message);
          }

          const _token = (response.payload as any).token;
          signIn("credentials", { token: _token, redirect: false }).then(
            (result: any) => {
              console.log({ result });
              if (result.error) {
                console.error(result.error);
              } else {
                router.push(
                  {
                    pathname: "/sports",
                    query: { loginFormat: "signUp" },
                  },
                  "/sports"
                );
              }
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const renderListBank = () => {
    const renderBankName = () => {
      return (
        BankName?.map((bank) => {
          return (
            <MenuItem value={bank?.value} key={bank?.id}>
              {bank?.label}
            </MenuItem>
          );
        }) ?? null
      );
    };

    return (
      <div className={classes.fieldSignUp}>
        <Select
          name="bankName"
          id="demo-simple-select"
          labelId="demo-simple-select-label"
          value={bankName.value}
          onChange={(e) => handleChangeBank(e.target.value)}
          sx={styleSelect}
          error={bankName.isHaveError}
        >
          <MenuItem value={"default"} selected>
            --- 은행선택 ---
          </MenuItem>
          {renderBankName()}
        </Select>
      </div>
    );
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
      <Box
        display="flex"
        gap={2}
        flexDirection="column"
        color="whitesmoke"
        paddingTop={3}
        className={!isCheck ? classes.boxFormCheckKey : classes.boxFormSignUp}
      >
        <React.Fragment>
          {renderErrorMessage()}
          <InputComponent
            register={register}
            name="id"
            placeholder="ID 사용자"
            errorForm={errors.id}
            styleError={{ color: "red" }}
            disableUnderline={true}
            sx={styleInputField}
            className={classes.fieldSignUp}
          />
          <InputComponent
            register={register}
            name="nickname"
            placeholder="별명"
            errorForm={errors.nickname}
            styleError={{ color: "red" }}
            disableUnderline={true}
            sx={styleInputField}
            className={classes.fieldSignUp}
          />
          <InputComponent
            register={register}
            name="phone"
            placeholder="핸드폰"
            errorForm={errors.phone}
            styleError={{ color: "red" }}
            disableUnderline={true}
            sx={styleInputField}
            className={classes.fieldSignUp}
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
            className={classes.fieldSignUp}
          />

          <InputComponent
            register={register}
            name="confirm_password"
            type="password"
            placeholder="비밀번호 확인"
            errorForm={errors.confirm_password}
            styleError={{ color: "red" }}
            disableUnderline={true}
            sx={styleInputField}
            className={classes.fieldSignUp}
          />

          {renderListBank()}

          <InputComponent
            register={register}
            name="accoutNo"
            type="string"
            placeholder="은행 계좌 번호"
            disableUnderline={true}
            sx={styleInputField}
            errorForm={errors.accoutNo}
            styleError={{ color: "red" }}
            className={classes.fieldSignUp}
          />

          <InputComponent
            register={register}
            name="accountHolder"
            type="string"
            placeholder="은행 계정 이름"
            disableUnderline={true}
            sx={styleInputField}
            errorForm={errors.accountHolder}
            styleError={{ color: "red" }}
            className={classes.fieldSignUp}
          />

          <InputComponent
            register={register}
            name="recommendID"
            type="string"
            placeholder="리퍼러 ID"
            disableUnderline={true}
            sx={styleInputField}
            className={classes.fieldSignUp}
          />

          <InputComponent
            register={register}
            name="key"
            placeholder="가입코드를 입력하세요"
            styleError={{ color: "red" }}
            disableUnderline={true}
            sx={styleInputField}
            className={classes.fieldCheckValue}
          />
          <Button variant="contained" type="submit">
            {status === "loading" ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "확인"
            )}
          </Button>
        </React.Fragment>
      </Box>
    </form>
  );
};

export default SignUpForm;
