import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { auth } from "config/firebase";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const { Title } = Typography;

const fbProvider = new FacebookAuthProvider();

const Login = () => {
  const handleFacebookLogin = () => {
    signInWithPopup(auth, fbProvider);
  };

  return (
    <>
      <Row justify="center">
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Chat Room
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Login with Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFacebookLogin}>
            Login with Facebook
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Login;