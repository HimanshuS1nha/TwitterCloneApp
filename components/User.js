import { View, Text } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { Avatar, Divider } from "@rneui/themed";
import FollowButton from "./FollowButton";
import { AuthContext } from "../context";

const User = ({ user }) => {
  const { user: loggedInUser } = useContext(AuthContext);
  return (
    <>
      <View style={tw`flex-row items-center mx-3 mb-3 w-full gap-x-3`}>
        <Avatar
          size={40}
          rounded
          source={{
            uri: user?.image,
          }}
          containerStyle={tw`mt-1.5`}
        />
        <View style={tw`flex-row justify-between items-center mt-2`}>
          <View style={tw`gap-y-1 items-center`}>
            <Text style={tw`font-semibold`}>{user?.name}</Text>
            <Text style={tw`text-xs text-neutral-600`}>@{user?.username}</Text>
          </View>
        </View>
        <View style={tw`pt-2 absolute right-8`}>
          <FollowButton
            followed={user?.followers?.includes(loggedInUser?.id)}
            id={user?.id}
            email={loggedInUser?.email}
            style={""}
          />
        </View>
      </View>

      <Divider />
    </>
  );
};

export default User;
