import { useState, useEffect } from "react";
import renderHTML from "react-render-html";

// action
import { getPublicUser } from "../../redux/actions/user";

// bootstrap
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

// components
import Layout from "../../components/Layout";
import BreadCrub from "../../components/BreadCrub";
import LatestBlog from "../../components/Blog/LatestBlog";

// config
import { API } from "../../config";

// next
import { withRouter } from "next/router";
import Image from "next/image";

// redux
import { compose } from "redux";
import { connect } from "react-redux";

function UserProfile(props) {
  // destruct props
  const { user: userProfile, getPublicUser, router } = props;

  // destruct user
  const { user, blog } = userProfile;

  // get username param
  const { username } = router.query;

  // breadCrub
  const bread = [
    { name: "Home", path: "/" },
    { name: "Profile", path: `/profile/${username}` },
  ];

  useState(() => {
    getPublicUser(username);
  }, [getPublicUser]);

  return (
    <Layout>
      <BreadCrub bread={bread} />

      <section className="card--author">
        <img
          src="/images/img_avatar.png"
          className="rounded-circle card__image"
          alt="Cinque Terre"
          width="90"
          height="85"
        />
        <div>
          <h3>{user?.name}</h3>
          <p>
            Stefanie Flaxman is Copyblogger’s Editor-in-Chief. She teaches
            better writing, disciplined creativity, and non-sleazy marketing.
            Get more from Stefanie on YouTube.
          </p>
        </div>
      </section>

      <Row className="my-5">
        <Col className="p-3" md={8}>
          <h4>List of Blogs</h4>
          <ListGroup className="my-3 list-group-flush">
            {blog?.map((x) => (
              <ListGroupItem>
                <Image
                  src={`${API}/blog/photo/${x.slug}`}
                  width="1000"
                  height="500"
                  className="img img-fluid featured-image"
                />
                <Row className="my-4">
                  <Col md={4}>
                    <h3>{x.title}</h3>
                  </Col>
                  <Col md={8}>
                    <h6>{x.exerpt && renderHTML(x.exerpt)}</h6>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col className="p-3" md={4} style={{ height: "fit-content" }}>
          <div className="bg-primary text-white p-3">
            <h4 className="text-white">Contact Author</h4>
            <Form className="p-3">
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter Email" />
              </FormGroup>
              <FormGroup>
                <Label>Message</Label>
                <Input type="textarea" placeholder="Write Something..." />
              </FormGroup>
              <Button type="submit" className="my-4 btn btn-block btn-success">
                Submit
              </Button>
            </Form>
          </div>
          <LatestBlog />
        </Col>
      </Row>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  getPublicUser: (username) => dispatch(getPublicUser(username)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(UserProfile);
