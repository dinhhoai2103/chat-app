import { PlusSquareOutlined } from "@ant-design/icons";
import { Collapse, Typography, Button } from "antd";
import AddRoom from "components/Modal/AddRoom";
import { AppContext } from "Context/AppContext";
import React, { useContext } from "react";
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
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    useContext(AppContext);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };
  const handleSelectRoom = (id) => () => {
    setSelectedRoomId(id);
  };
  return (
    <>
      <Collapse ghost defaultActiveKey={["1"]}>
        <PanelStyled header="Room list" key="1">
          {rooms?.map((room) => (
            <LinkStyled
              key={`room-${room.id}`}
              onClick={handleSelectRoom(room.id)}
            >
              {room?.name}
            </LinkStyled>
          ))}
          <Button
            icon={<PlusSquareOutlined />}
            type="text"
            onClick={handleAddRoom}
          >
            Add new room
          </Button>
        </PanelStyled>
      </Collapse>
      <AddRoom />
    </>
  );
}
