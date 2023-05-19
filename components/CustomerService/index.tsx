import React, { useState, useEffect } from "react";

import * as yup from "yup";
import BoxChat from "./BoxChat";
import Tickets from "./Tickets";
import { RootState } from "@/store";

import { Button } from "@mui/material";
import { db } from "@/helpers/db-config";
import { useForm } from "react-hook-form";
import customerApi from "@/services/customerApi";

import InputComponent from "@/components/ui/Input";
import classes from "./CustomerService.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector, useAppDispatch } from "@/store/hook";

import { setShowNotificationAlert } from "@/store/slices/uiSlice";

import {
  collection,
  collectionGroup,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const CustomerService: React.FC = () => {
  const [ticketList, setTicketList] = useState();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [ticketCurrent, setTicketCurrent] = useState<any>({});

  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state: RootState) => state.user);

  const getDataTicket = async () => {
    const collectionAQuery = collection(db, "tickets");

    const queryConstraints = [
      ["user_id", "==", id],
      ["delete", "==", false],
      ["type", "==", "Support"],
    ];

    const collectionASnapshot = await getDocs(
      query(
        collectionAQuery,
        queryConstraints as any,
        orderBy("created_at", "desc")
      )
    );

    const collectionBQuery = query(
      collectionGroup(db, "messages"),
      orderBy("created_at", "asc")
    );

    const collectionBUnsubscribe = onSnapshot(collectionBQuery, (snapshot) => {
      const result: any[] = [];
      collectionASnapshot.forEach((doc) => {
        const data = doc.data();
        const subCollectionDocs = snapshot.docs.filter(
          (subDoc) => subDoc.ref.parent.parent?.id === doc.id
        );
        result.push({
          id: doc.id,
          ...data,
          collectionBData: subCollectionDocs.map((subDoc) => ({
            id: subDoc.id,
            ...subDoc.data(),
          })),
        });
      });

      setTicketList(result as any);
    });
    return () => {
      collectionBUnsubscribe();
    };
  };

  useEffect(() => {
    getDataTicket();
  }, [refresh]);

  useEffect(() => {
    const _listTicket = ticketList ?? [];
    const updateTicketCurrent = _listTicket?.find?.(
      (element: any) => element?.id === ticketCurrent?.id
    );

    setTicketCurrent(updateTicketCurrent ?? ticketCurrent);
  }, [ticketList]);

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

  const onSubmit = (data: FormData) => {
    customerApi
      .createTicket({
        content: data.content,
        title: data.title,
        user_id: id!,
      })
      .then((res) => {
        if (res) {
          setRefresh(!refresh);
          dispatch(
            setShowNotificationAlert({
              status: "success",
              title: "성공",
              message: "성공적인 대화 만들기",
              isShow: true,
            })
          );
        }
      });
  };

  const handleReloadPage = () => {
    setRefresh(!refresh);
  };

  const renderTicketList = () => {
    return (ticketList ?? [])?.map((item: any) => {
      if (item?.user_id !== id || item?.type !== "Support") return null;

      return (
        <Tickets
          data={item}
          idTicketSelected={ticketCurrent?.id}
          onAction={(ticket) => setTicketCurrent(ticket)}
          handleRefresh={handleReloadPage}
        />
      );
    });
  };

  return (
    <div className={classes.customerService}>
      <div className={classes.left}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            register={register}
            name="title"
            placeholder="제목"
            errorForm={errors.title}
            styleError={{ color: "red" }}
            style={{ marginBottom: 6 }}
          />
          <InputComponent
            register={register}
            name="content"
            placeholder="메시지"
            errorForm={errors.content}
            styleError={{ color: "red" }}
            style={{ marginBottom: 6 }}
          />
          <Button variant="contained" type="submit">
            채팅 만들기
          </Button>
        </form>

        <div className={classes.ticketList}>{renderTicketList()}</div>
      </div>

      <div className={classes.right}>
        <BoxChat data={ticketCurrent} handleRefresh={handleReloadPage} />
      </div>
    </div>
  );
};

export default CustomerService;
