import { Form, Input, Modal, Button } from "antd";
import { addDocument } from "config/services";
import { AppContext } from "Context/AppContext";
import { AuthContext } from "Context/AuthContext";
import React, { useContext } from "react";

export default function AddRoom() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleOk = async (value) => {
    const newValue = { ...value };
    if (!newValue.description && newValue.description.length < 1) {
      newValue.description = "";
    }
    await addDocument("rooms", { ...newValue, members: [uid] });
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  return (
    <div>
      <Modal
        title="Add new room chat"
        visible={isAddRoomVisible}
        footer={[]}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(value) => handleOk(value)}
        >
          <Form.Item
            label="Room's name"
            name="name"
            rules={[{ required: true, message: "Please input room's name" }]}
          >
            <Input placeholder="Enter room's name" />
          </Form.Item>
          <Form.Item label="Room's description" name="description">
            <Input.TextArea placeholder="Enter room's description" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
            <Button
              type=""
              htmlType="submit"
              style={{ marginRight: 8 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
