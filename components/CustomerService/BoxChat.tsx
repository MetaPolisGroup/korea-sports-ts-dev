import React, { useState } from "react";

import { isEmpty } from "lodash";
import { RootState } from "@/store";
import EmptyData from "../ui/EmptyData/input";
import { useAppDispatch, useAppSelector } from "@/store/hook";

import customerApi from "@/services/customerApi";
import classes from "./CustomerService.module.css";
import { setShowNotificationAlert } from "@/store/slices/uiSlice";

interface IProp {
  data: any;
  handleRefresh: () => void;
}

const BoxChat: React.FC<IProp> = ({ data, handleRefresh }) => {
  const [content, setContent] = useState<string>("");

  const { id } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const onSubmitReply = () => {
    if (content.length < 20 || content.length > 1000) return handleRefresh();

    customerApi
      .replyTicket({
        content: content,
        ticket_id: data?.id,
        user_id: `${id}`,
      })
      .then((res) => {
        if (!res) {
          return dispatch(
            setShowNotificationAlert({
              status: "error",
              title: "오류",
              message: "시스템에 문제가 발생했습니다. 다시 시도해 주세요.",
              isShow: true,
            })
          );
        }

        setContent("");
        handleRefresh();
      });
  };

  const renderContentChat = () => {
    if (isEmpty(data?.collectionBData)) return null;

    return data?.collectionBData?.map((message: any) => {
      const isSender = message?.sender_id === id;
      return (
        <div
          key={message?.id}
          className={isSender ? classes.sender : classes.respondent}
        >
          {isSender ? (
            <div>{message?.content}</div>
          ) : (
            <div>{`Admin: ${message?.content}`}</div>
          )}
        </div>
      );
    });
  };

  const renderErrorInput = () => {
    if (content === "" || (content.length > 20 && content.length < 1000))
      return null;

    return (
      <div className={classes.error}>콘텐츠는 20~1000자 사이여야 합니다.</div>
    );
  };

  if (isEmpty(data)) return <EmptyData message="선택한 채팅 없음" />;

  return (
    <div className={classes.Chat}>
      <div className={classes.boxChat}>{renderContentChat()}</div>
      <div className={classes.boxReply}>
        <input
          type="text"
          name="contentReply"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={onSubmitReply}>보내다</button>
        {renderErrorInput()}
      </div>
    </div>
  );
};

export default BoxChat;
