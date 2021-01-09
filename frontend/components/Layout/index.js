// components
import { Container } from "reactstrap";
import Header from "../Header";
import Footer from "../Footer";

const Layout = (props) => {
  return (
    <>
      <Header />
      <Container>
        <div className="main py-3">{props.children}</div>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
