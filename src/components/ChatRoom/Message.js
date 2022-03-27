import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import React from "react";
import styled from "styled-components";

const MessageWrapper = styled.div`
  margin-bottom: 12px;
  .user {
    margin-left: 5px;
    font-weight: 600;
  }
  .time {
    margin-left: 10px;
    font-size: 12px;
    color: #a7a7a7;
  }
  .message {
    margin-left: 24px;
  }
`;

export default function Message({ displayName, message, createAt, photoURL }) {
  const formatTime = (seconds) => {
    let formattedTime = "";
    if (seconds) {
      formattedTime = formatRelative(new Date(seconds * 1000), new Date());

      formattedTime =
        formattedTime.charAt(0).toUpperCase() + formattedTime.slice(1);
    }
    return formattedTime;
  };
  return (
    <MessageWrapper>
      <div>
        <Avatar src={photoURL}></Avatar>
        <Typography.Text className="user">{displayName}</Typography.Text>
        <Typography.Text className="time">
          {formatTime(createAt?.seconds)}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="message">{message}</Typography.Text>
      </div>
    </MessageWrapper>
  );
}
