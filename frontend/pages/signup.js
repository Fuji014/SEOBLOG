import React, { useState, useEffect } from "react";

// next
import { useRouter } from "next/router";

// bootstrap
import { Form, FormGroup, Input, Label, Button, Row, Col } from "reactstrap";

// actions
import { userSignup, userSignupReset, isAuth } from "../redux/actions/auth";

// redux
import { useDispatch, useSelector } from "react-redux";

// components
import Layout from "../components/Layout";
import FormContainer from "../components/UI/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // user state
  const userState = useSelector((state) => state.auth);
  const { loading, error, success } = userState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (success) {
      dispatch(userSignupReset());
      router.push("/");
    }
  }, [success, router.push, dispatch]);

  useEffect(() => {
    isAuth() && router.push("/");
  }, [router.push]);

  const signupHandle = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password not match");
    } else {
      const data = {
        name,
        email,
        password,
      };

      dispatch(userSignup(data));
    }
  };

  return (
    <Layout>
      <FormContainer>
        <h1>Signup</h1>
        {loading && <Loader />}
        {error && <Message color="danger">{error}</Message>}
        {message && <Message color="danger">{message}</Message>}
        <Form onSubmit={signupHandle}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </FormGroup>
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
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Input>
          </FormGroup>

          <Button type="submit" color="primary">
            Register
          </Button>

          <Row className="py-3">
            <Col>
              Have an Account? <a>Signin</a>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </Layout>
  );
};

export default SignUp;
