import React from "react";

import BoxChat from "./BoxChat";
import { RootState } from "@/store";
import { useAppSelector } from "@/store/hook";
import classes from "./CustomerService.module.css";

interface IProp {
  data: any;
  idTicketSelected: string;
  onAction: (ticket: any) => void;
  handleRefresh: () => void;
}

const Tickets: React.FC<IProp> = ({
  data,
  idTicketSelected,
  onAction,
  handleRefresh,
}) => {
  const isTicketSelected = data?.id === idTicketSelected || false;

  const { id } = useAppSelector((state: RootState) => state.user);

  if (data?.user_id !== id || data?.type !== "Support") return null;

  const dateCreate = new Date(data?.created_at);
  const createAt = `${dateCreate?.getFullYear()}-${
    dateCreate?.getMonth() + 1
  }-${dateCreate?.getDate()}`;

  const handleToggleTicket = () => {
    if (isTicketSelected) {
      return onAction({});
    }

    return onAction(data);
  };

  return (
    <>
      <div
        key={data?.id}
        className={isTicketSelected ? classes.active : classes.unActive}
        onClick={handleToggleTicket}
      >
        <p>{data?.title}</p>
        <p>{createAt}</p>
      </div>
      {isTicketSelected ? (
        <div className={classes.boxChatMoblie}>
          <BoxChat data={data} handleRefresh={handleRefresh} />
        </div>
      ) : null}
    </>
  );
};

export default Tickets;
