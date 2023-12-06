import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import HeaderWithBack from "./HeaderWithBack";
import { Avatar } from "@rneui/themed";
import FollowButton from "./FollowButton";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context";
import { months } from "../constants/months";

const Profile = ({ isVisible, setIsVisible, user }) => {
  const { user: loggedInUser } = useContext(AuthContext);
  const joinedAt = new Date(user?.createdAt);
  return (
    <Modal visible={isVisible} animationType="slide">
      <HeaderWithBack setIsVisible={setIsVisible} title={"Profile"} />

      <View style={tw`relative`}>
        {user?.bannerImage ? (
          <Image source={{ uri: user?.bannerImage }} style={tw`w-full h-60`} />
        ) : (
          <View style={tw`bg-neutral-200 w-full h-60`}></View>
        )}
        <Avatar
          size={150}
          rounded
          source={{ uri: user?.image }}
          avatarStyle={tw`border-2 border-white`}
          containerStyle={tw`-top-20 left-4`}
        />
        <FollowButton
          followed={user?.followers?.includes(loggedInUser?.id)}
          id={user?.id}
          email={loggedInUser?.email}
          style={"absolute right-4 bottom-24 w-24"}
        />
      </View>

      <View style={tw`mx-5 -my-12`}>
        <Text style={tw`text-lg font-bold`}>{user?.name}</Text>
        <Text style={tw`text-neutral-500 text-sm`}>@{user?.username}</Text>
        <Text style={tw`mt-2`}>{user?.bio || "No bio added"}</Text>
        <View style={tw`flex-row mt-3 gap-x-2 items-center`}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={tw`text-neutral-500`}>
            Joined in {months[joinedAt.getMonth()]} {joinedAt.getFullYear()}
          </Text>
        </View>
        <View style={tw`flex-row gap-x-6 mt-3`}>
          <TouchableOpacity style={tw`flex-row gap-x-2`}>
            <Text style={tw`font-bold`}>{user?.following?.length}</Text>
            <Text style={tw`text-neutral-500`}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row gap-x-2`}>
            <Text style={tw`font-bold`}>{user?.followers?.length}</Text>
            <Text style={tw`text-neutral-500`}>Followers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Profile;
