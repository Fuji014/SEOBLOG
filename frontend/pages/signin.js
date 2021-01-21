import React, { useState, useEffect } from "react";

// next
import { useRouter } from "next/router";

// bootstrap
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";

// components
import Layout from "../components/Layout";
import FormContainer from "../components/UI/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

// actions
import { userLogin, userLoginReset, isAuth } from "../redux/actions/auth";

// redux
import { useDispatch, useSelector } from "react-redux";

const SignIn = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // user state
  const userState = useSelector((state) => state.auth);
  const { error, loading, success } = userState;

  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect
  useEffect(() => {
    if (success) {
      dispatch(userLoginReset());
      if (isAuth() && isAuth().role === 1) {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    }
  }, [success, dispatch, router.push]);

  useEffect(() => {
    isAuth() && router.push("/");
  }, [router.push]);

  // functions
  const signinHandle = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    dispatch(userLogin(data));
  };

  return (
    <Layout>
      <FormContainer>
        <h1>Signin</h1>
        {loading && <Loader />}
        {error && <Message color="danger">{error}</Message>}
        <Form onSubmit={signinHandle}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </FormGroup>
          <Button color="primary">LOGIN</Button>
          <Row className="py-3">
            <Col>
              New User? <a>Signup</a>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </Layout>
  );
};

export default SignIn;
