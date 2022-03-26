import React from "react";
import { Col, Row } from "antd";
import Chat from "./Chat";
import SideBar from "./SideBar";

export default function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={6}>
          <SideBar></SideBar>
        </Col>
        <Col span={18}>
          <Chat></Chat>
        </Col>
      </Row>
    </div>
  );
}
