import { Container, Row, Col } from "reactstrap";

import { APP_NAME } from "../../config";

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; {APP_NAME}</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
