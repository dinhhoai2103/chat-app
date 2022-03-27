import React, { useContext } from "react";
import { AuthContext } from "Context/AuthContext";
import { Avatar, Button, Typography } from "antd";
import styled from "styled-components";
import { auth } from "config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid rgb(96, 120, 171);
  .username {
    color: #ffffff;
    margin-left: 10px;
  }
`;

export default function UserInfo() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserWrapper>
      <div>
        <Avatar src={user?.photoURL}>
          {user?.photoURL ? "" : user?.displayName?.chartAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="username">
          {user?.displayName}
        </Typography.Text>
      </div>
      <div>
        <Button ghost onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </UserWrapper>
  );
}
