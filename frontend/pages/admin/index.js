// components
import Layout from "../../components/Layout";
import Admin from "../../components/Private/admin";

// bootrap
import { Row, Col } from "reactstrap";

// actions

const adminIndex = () => {
  return (
    <Layout>
      <Admin>
        <Row>
          <Col>
            <h1>Admin Dashboard</h1>
          </Col>
        </Row>
      </Admin>
    </Layout>
  );
};

export default adminIndex;
