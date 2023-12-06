import React from "react";
import HeaderWithBack from "./HeaderWithBack";
import { Modal } from "react-native";
import FollowUser from "./FollowUser";

const FollowPage = ({ isVisible, setIsVisible, users }) => {
  return (
    <Modal visible={isVisible} animationType="slide">
      <HeaderWithBack title={""} setIsVisible={setIsVisible} />

      {users?.map((id) => {
        return <FollowUser id={id} key={id} />;
      })}
    </Modal>
  );
};

export default FollowPage;
