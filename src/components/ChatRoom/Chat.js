import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Tooltip, Input, Alert } from "antd";
import InviteMember from "components/Modal/InviteMember";
import { addDocument } from "config/services";
import { AppContext } from "Context/AppContext";
import { AuthContext } from "Context/AuthContext";
import useFirestore from "hooks/useFirestore";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import Message from "./Message";

const { TextArea } = Input;

const RoomStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid rgb(96, 120, 171);
  .header {
    &_room {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &_name {
      margin: 0;
      font-weight: 600;
    }
    &_des {
      font-size: 12px;
    }
  }
`;

const GroupMemberStyled = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-right: 12px;
  }
`;

const ContentWrapper = styled.div`
  padding: 12px;
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .ant-form-item {
    flex: 1;
    margin: 0;
    margin-right: 24px;
  }
`;
export default function Chat() {
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = async () => {
    if (message && message.trim().length > 0) {
      await addDocument("messages", {
        message,
        uid,
        photoURL,
        displayName,
        roomId: selectedRoom.id,
      });
      setMessage("");
      form.resetFields(["message"]);
    }
  };

  const conditionMessage = useMemo(() => {
    if (selectedRoom && selectedRoom.id) {
      return {
        name: "roomId",
        operator: "==",
        value: selectedRoom?.id,
      };
    }
  }, [selectedRoom?.id]);
  const messages = useFirestore("messages", conditionMessage);
  return selectedRoom && Object.keys(selectedRoom).length > 0 ? (
    <>
      <RoomStyled>
        <HeaderWrapper>
          <div className="header_room">
            <p className="header_name">{selectedRoom?.name}</p>
            <span className="header_des">{selectedRoom?.description}</span>
          </div>
          <GroupMemberStyled>
            <Button
              type="text"
              icon={<UserAddOutlined />}
              onClick={() => setIsInviteMemberVisible(true)}
            >
              Invite
            </Button>
            <Avatar.Group size="small" maxCount={2}>
              {members &&
                members.length > 0 &&
                members.map((member) => (
                  <Tooltip key={member.id} title={member.displayName}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
            </Avatar.Group>
          </GroupMemberStyled>
        </HeaderWrapper>

        <ContentWrapper>
          <MessageListStyled>
            {messages &&
              messages.length > 0 &&
              messages.map((message) => (
                <Message
                  key={message.id}
                  displayName={message.displayName}
                  message={message.message}
                  createAt={message.createdAt}
                  photoURL={message.photoURL}
                />
              ))}
          </MessageListStyled>
          <FormStyled form={form}>
            <Form.Item name="message">
              <TextArea
                onChange={handleChangeMessage}
                onPressEnter={handleSendMessage}
                placeholder="Message"
                autoComplete="off"
              />
            </Form.Item>
            <Button type="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </FormStyled>
        </ContentWrapper>
      </RoomStyled>
      <InviteMember />
    </>
  ) : (
    <Alert type="info" message="Please select room!" />
  );
}
