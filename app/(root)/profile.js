import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import tw from "twrnc";
import { AuthContext } from "../../context";
import { Avatar, Button, Tab, TabView } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { months } from "../../constants/months";
import ProfileTweets from "../../components/ProfileTweets";
import ProfileComments from "../../components/ProfileComments";
import EditProfileModal from "../../components/EditProfileModal";
import FollowPage from "../../components/FollowPage";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const joinedAt = new Date(user?.createdAt);

  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [followersModalVisible, setFollowersModalVisible] = useState("");
  const [followingModalVisible, setFollowingModalVisible] = useState("");

  return (
    <SafeView>
      <FollowPage
        isVisible={followersModalVisible}
        setIsVisible={setFollowersModalVisible}
        users={user?.followers}
      />

      <FollowPage
        isVisible={followingModalVisible}
        setIsVisible={setFollowingModalVisible}
        users={user?.following}
      />

      <Header title={"Profile"} />
      <EditProfileModal isVisible={isVisible} setIsVisible={setIsVisible} />

      <View style={tw`relative`}>
        {user.bannerImage ? (
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
        <Button
          title={"Edit Profile"}
          containerStyle={tw`w-28 rounded-full absolute right-4 bottom-24`}
          onPress={() => setIsVisible(true)}
        />
      </View>

      <View style={tw`mx-5 -my-16`}>
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
          <TouchableOpacity
            style={tw`flex-row gap-x-2`}
            onPress={() => setFollowingModalVisible(true)}
          >
            <Text style={tw`font-bold`}>{user?.following?.length}</Text>
            <Text style={tw`text-neutral-500`}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row gap-x-2`}
            onPress={() => setFollowersModalVisible(true)}
          >
            <Text style={tw`font-bold`}>{user?.followers?.length}</Text>
            <Text style={tw`text-neutral-500`}>Followers</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "blue",
          height: 3,
        }}
        dense
        style={tw`mt-20`}
      >
        <Tab.Item title="Tweets" titleStyle={tw`text-blue-500 text-sm`} />
        <Tab.Item title="Replies" titleStyle={tw`text-blue-500 text-sm`} />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={tw`w-full`}>
          <ProfileTweets id={user.id} />
        </TabView.Item>
        <TabView.Item style={tw`w-full`}>
          <ProfileComments />
        </TabView.Item>
      </TabView>
    </SafeView>
  );
};

export default Profile;
