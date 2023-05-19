import NoticeList from "@/components/ListNoice/ListNoice";
import Layout from "@/components/layout/layout";
import React from "react";

const SendingNotePage = () => {
  return (
    <Layout title="Sending Note" description="">
      <NoticeList title="Send note" />
    </Layout>
  );
};

export default SendingNotePage;
