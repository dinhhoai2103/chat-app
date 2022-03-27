import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Tooltip, Input } from "antd";
import React from "react";
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
  return (
    <RoomStyled>
      <HeaderWrapper>
        <div className="header_room">
          <p className="header_name">Room 1</p>
          <span className="header_des">This is room 1</span>
        </div>
        <GroupMemberStyled>
          <Button type="text" icon={<UserAddOutlined />}>
            Invite
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
          </Avatar.Group>
        </GroupMemberStyled>
      </HeaderWrapper>

      <ContentWrapper>
        <MessageListStyled>
          <Message
            displayName="Hoai"
            message="Hello"
            createAt={new Date()}
            photoURL={null}
          />
        </MessageListStyled>
        <FormStyled>
          <Form.Item>
            <TextArea placeholder="Message" autoComplete="off" />
          </Form.Item>
          <Button type="primary">Send</Button>
        </FormStyled>
      </ContentWrapper>
    </RoomStyled>
  );
}
