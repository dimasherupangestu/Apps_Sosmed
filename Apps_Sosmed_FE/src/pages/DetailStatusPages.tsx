import { useParams } from "react-router-dom";

import { DetailStatus } from "../components/DetailStatus";
import { Layout } from "../layout/layout";

export const DetailStatusPages = () => {
  const { id } = useParams();

  return (
    <>
      <Layout>
        <DetailStatus />
      </Layout>
    </>
  );
};
