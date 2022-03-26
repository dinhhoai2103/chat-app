import { PlusSquareOutlined } from "@ant-design/icons";
import { Collapse, Typography, Button } from "antd";
import React from "react";
import styled from "styled-components";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p,
    button {
      color: #ffffff;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
   {
    display: block;
    margin-bottom: 5px;
    color: #ffffff;
  }
`;

export default function RoomList() {
  return (
    <>
      <Collapse ghost defaultActiveKey={["1"]}>
        <PanelStyled header="Room list" key="1">
          <LinkStyled>Room 1</LinkStyled>
          <LinkStyled>Room 2</LinkStyled>
          <LinkStyled>Room 3</LinkStyled>
          <Button icon={<PlusSquareOutlined />} type="text">
            Add new room
          </Button>
        </PanelStyled>
      </Collapse>
    </>
  );
}
