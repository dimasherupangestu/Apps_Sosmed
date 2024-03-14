import { useParams } from "react-router-dom";

import { Layout } from "../layout/layout";
import { DetailReply } from "../components/DetailReply";

export const DetailStatusPages = () => {
  const { id } = useParams();

  return (
    <>
      <Layout>
        <DetailReply />
      </Layout>
    </>
  );
};
