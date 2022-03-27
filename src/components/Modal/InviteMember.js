import { Form, Modal, Select, Spin, Avatar } from "antd";
import { AppContext } from "Context/AppContext";
import { debounce } from "lodash";
import React, { useContext, useState, useMemo } from "react";
import {
  getDocs,
  doc,
  updateDoc,
  query,
  collection,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "config/firebase";

const DebounceSelect = ({ fetchOption, debounceTimeout = 300, ...props }) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOption(value, props.currMember).then((newOption) => {
        setOptions(newOption);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOption]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options &&
        options.length > 0 &&
        options.map((option) => (
          <Select.Option
            key={option.id}
            value={option.value}
            title={option.label}
          >
            <Avatar src={option.photoURL} size="small">
              {option.photoURL ? "" : option.label?.charAt(0).toUpperCase()}
            </Avatar>
            {`${option.label}`}
          </Select.Option>
        ))}
    </Select>
  );
};
export default function InviteMember() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();
  const handleOk = () => {
    const docNotification = doc(db, "rooms", selectedRoomId);
    updateDoc(docNotification, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    }).then(() => {
      form.resetFields();
      setIsInviteMemberVisible(false);
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsInviteMemberVisible(false);
  };
  const fetchUser = async (search, currMember) => {
    const q = query(
      collection(db, "users"),
      where("keywords", "array-contains", search),
      orderBy("displayName"),
      limit(20)
    );
    const querySnapshot = await getDocs(q).then((result) =>
      result.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((user) => !currMember.includes(user.value))
    );
    return querySnapshot;
  };
  return (
    <div>
      <Modal
        title="Invite member"
        visible={isInviteMemberVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Name"
            name="search-user"
            value={value}
            placeholder="Select member"
            fetchOption={fetchUser}
            onChange={(value) => setValue(value)}
            currMember={selectedRoom?.members}
            style={{ width: "100%" }}
          ></DebounceSelect>
        </Form>
      </Modal>
    </div>
  );
}
