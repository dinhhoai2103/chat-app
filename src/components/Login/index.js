import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { auth } from "config/firebase";
import {
  signInWithPopup,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
} from "firebase/auth";
import { addDocument, generateKeywords } from "config/services";

const { Title } = Typography;

const fbProvider = new FacebookAuthProvider();
const GgProvider = new GoogleAuthProvider();
const Login = () => {
  const handleFacebookLogin = async () => {
    await signInWithPopup(auth, fbProvider)
      .then(async (result) => {
        const { user } = result;
        const additionalUserInfo = getAdditionalUserInfo(result);
        if (additionalUserInfo?.isNewUser) {
          await addDocument("users", {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
            keywords: generateKeywords(user.displayName.toLocaleLowerCase()),
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, GgProvider)
      .then(async (result) => {
        const { user } = result;
        const additionalUserInfo = getAdditionalUserInfo(result);
        if (additionalUserInfo?.isNewUser) {
          await addDocument("users", {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
            keywords: generateKeywords(user.displayName.toLocaleLowerCase()),
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Row justify="center">
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Chat Room
          </Title>
          <Button
            style={{ width: "100%", marginBottom: 5 }}
            onClick={handleGoogleLogin}
          >
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
