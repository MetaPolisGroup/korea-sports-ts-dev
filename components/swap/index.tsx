import React from "react";
import classes from "./Swap.module.css";
import Image from "next/image";
import InputComponent from "@/components/ui/Input";
import * as yup from "yup";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";

const Swap = () => {
  const { balance, point } = useAppSelector((state: RootState) => state.user);

  const schema = yup
    .object({
      title: yup.string().required().min(10).max(50),
      content: yup.string().required().min(20).max(200),
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
  return (
    <section>
      <div className={classes["header-swap"]}>
        <div className={classes["swap-point"]}>
          <div className={classes["current-input"]}>
            <h5>
              현재 보유머니현황 : <span>{balance.toLocaleString("es-US")}</span>
            </h5>
            <form>
              <InputComponent
                register={register}
                name="balance"
                disableUnderline={true}
                className={classes["input-field"]}
                placeholder="충전할 게임머니"
              />
              <Button
                startIcon={<ChevronRightIcon />}
                style={{
                  color: "#fff",
                  background: "var(--color-blue)",
                  marginLeft: "10px",
                }}
              >
                게임머니로 전환
              </Button>
            </form>
          </div>
          <div className={classes["point-input"]}>
            <h5>
              현재 게임머니현황 : <span>{point.toLocaleString("es-US")}</span>
            </h5>
            <form>
              <InputComponent
                register={register}
                name="balance"
                disableUnderline={true}
                className={classes["input-field"]}
                placeholder="회수할 게임머니"
              />
              <Button
                startIcon={<ChevronRightIcon />}
                style={{
                  color: "#fff",
                  background: "var(--color-blue)",
                  marginLeft: "10px",
                }}
              >
                보유머니로 전환
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Swap;
