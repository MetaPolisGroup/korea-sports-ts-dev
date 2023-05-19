import React, { useState } from "react";
import InputComponent from "../ui/Input";
import * as yup from "yup";
import Button from "@mui/material/Button";
import classes from "./Point.module.css";
import pointApi from "@/services/pointApi";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import { setShowNotificationAlert } from "@/store/slices/uiSlice";
import { pointRules } from "@/utils/point-rules";
import PointHistory from "./point-history";

const Point = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id, point } = useAppSelector((state: RootState) => state.user);
  const { rules } = useAppSelector((state: RootState) => state.bettingRules);
  const dispatch = useAppDispatch();
  const schema = yup
    .object({
      point: yup
        .string()
        .test(
          "checkPoint",
          "비워둘 수 없으며 숫자만 입력할 수 있습니다.",
          (value) => {
            const _value = Number(value);
            if (Number.isNaN(_value) || value === undefined || value === "")
              return false;
            return true;
          }
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  type FormData = yup.InferType<typeof schema>;

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    const isValidPoint = pointRules(rules, data);
    if (data.point === "0") {
      dispatch(
        setShowNotificationAlert({
          status: "error",
          title: "오류",
          message: "포인트 수는 0보다 커야 합니다.",
          isShow: true,
        })
      );
      setIsLoading(false);
      return;
    }
    if (Number(data?.point) > point) {
      dispatch(
        setShowNotificationAlert({
          status: "error",
          title: "오류",
          message: "사용할 포인트가 충분하지 않습니다.",
          isShow: true,
        })
      );
      setIsLoading(false);
      return;
    }

    if (!isValidPoint.isValid) {
      dispatch(
        setShowNotificationAlert({
          status: "error",
          title: "오류",
          message: isValidPoint.message,
          isShow: true,
        })
      );
      setIsLoading(false);
      return;
    }

    const res = pointApi.post({
      id: id!,
      point: Number(data?.point),
    });

    res.then((response) => {
      if (response) {
        dispatch(
          setShowNotificationAlert({
            status: "success",
            title: "성공",
            message: response,
            isShow: true,
          })
        );
        setIsLoading(false);
      }
    });
    res.catch((err) => {
      dispatch(
        setShowNotificationAlert({
          status: "error",
          title: "오류",
          message: err,
          isShow: true,
        })
      );
    });
  };

  return (
    <div>
      <h1>포인트전환</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
        <div>
          <label htmlFor="point">점</label>
          <InputComponent
            register={register}
            name="point"
            errorForm={errors.point}
            disableUnderline={true}
            className={classes["input-field"]}
          />
        </div>
        {!isLoading ? (
          <Button
            variant="contained"
            type="submit"
            sx={{ marginLeft: "10px", width: "50px", height: "38px" }}
          >
            환전
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ marginLeft: "10px", width: "50px", height: "38px" }}
          >
            <CircularProgress size={20} sx={{ color: "white" }} />
          </Button>
        )}
      </form>
      <PointHistory />
    </div>
  );
};

export default Point;
