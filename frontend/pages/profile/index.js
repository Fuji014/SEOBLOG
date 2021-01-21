import { useState, useEffect } from "react";

// actions
import { getUserProfile, updateUserProfile } from "../../redux/actions/profile";

// bootrap
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Form,
  Input,
  Label,
  Button,
} from "reactstrap";

// components
import Layout from "../../components/Layout";
import Private from "../../components/Private/private";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import BreadCrub from "../../components/BreadCrub";

// config
import { API } from "../../config";

// next
import Image from "next/image";
import { withRouter } from "next/router";

// redux
import { compose } from "redux";
import { connect } from "react-redux";

const ProfileIndex = (props) => {
  // destruct props
  const { profile, getUserProfile, updateUserProfile } = props;

  // destruct profile
  const { profile: profileData, loading, error } = profile;

  // useState
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    // fetch user profile
    if (!profileData) {
      getUserProfile();
    } else {
      setUsername(profileData.username);
      setName(profileData.name);
      setEmail(profileData.email);
      setAbout(profileData.about);
    }
  }, [getUserProfile, profileData]);

  // functions
  const submitHandle = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("about", about);
    form.append("password", password);
    form.append("photo", photo);
    updateUserProfile(form);

    // reset field onsubmit
    setPassword("");
  };

  const uploadHandle = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <Layout>
      <Private>
        <BreadCrub />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message color="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandle}>
            <Row>
              <Col md={8}>
                <ListGroup>
                  <ListGroupItem>
                    <FormGroup>
                      <Label>Username</Label>
                      <Input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>About</Label>
                      <Input
                        type="textarea"
                        placeholder="Write Something..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter name"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup>
                  <ListGroupItem>
                    <FormGroup>
                      <Label>Photo</Label>
                      {profileData?.photo && (
                        <div className="container-fluid">
                          <section>
                            <div className="row">
                              <Image
                                key={profileData._id}
                                src={`${API}/profile/${profileData.username}`}
                                alt={profileData.name}
                                className="img-fluid"
                                width={350}
                                height={150}
                              />
                            </div>
                          </section>
                        </div>
                      )}
                      <Input
                        type="file"
                        name="photo"
                        className="my-3"
                        onChange={uploadHandle}
                      />
                    </FormGroup>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      type="submit"
                      color="primary"
                      className="btn btn-block"
                    >
                      Submit
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Private>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: () => dispatch(getUserProfile()),
  updateUserProfile: (data) => dispatch(updateUserProfile(data)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileIndex);
