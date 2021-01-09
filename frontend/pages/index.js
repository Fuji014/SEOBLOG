// components
import Layout from "../components/Layout";

// redux
import { useDispatch, useSelector } from "react-redux";

// bootrap

// actions

const index = () => {
  const dispatch = useDispatch();

  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  );
};

export default index;
