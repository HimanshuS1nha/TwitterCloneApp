import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import tw from "twrnc";
import { Avatar, Divider } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import LikeButton from "./LikeButton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../context";
import { formatDistanceToNowStrict } from "date-fns";
import TweetPage from "./TweetPage";
import Profile from "./Profile";
import { router } from "expo-router";

const Tweet = ({ tweet }) => {
  const { user } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  const { data, error } = useQuery({
    queryKey: ["getuser" + tweet?.userId],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/getuser`,
        { id: tweet?.userId }
      );
      return data;
    },
  });
  if (error) {
    if (error instanceof AxiosError) {
      alert(error?.data?.response?.error);
      if (error?.response?.status === 401) {
        router.replace("/login");
      }
    } else {
      alert("Some error occured. Please try again later!");
    }
  }
  return (
    <>
      <TweetPage
        isVisible={isVisible}
        tweet={tweet}
        user={data?.user}
        setIsVisible={setIsVisible}
        key={tweet?.id}
      />
      <Profile
        isVisible={profileVisible}
        setIsVisible={setProfileVisible}
        user={data?.user}
      />
      <View style={tw`m-3`}>
        <View style={tw`flex-row gap-x-3`}>
          <Avatar size={40} rounded source={{ uri: data?.user?.image }} />
          <View>
            <View style={tw`flex-row gap-x-2 items-center`}>
              <TouchableOpacity
                onPress={() => {
                  data?.user?.id !== user?.id && setProfileVisible(true);
                }}
              >
                <Text style={tw`font-extrabold`}>{data?.user?.name}</Text>
              </TouchableOpacity>
              <Text style={tw`text-sm text-neutral-600`}>
                @{data?.user?.username}
              </Text>
              <Text style={tw`text-neutral-600 text-xs`}>
                {formatDistanceToNowStrict(new Date(tweet?.createdAt))}
              </Text>
            </View>
            <Text style={tw`text-sm`}>{tweet?.content}</Text>
          </View>
        </View>
        <View style={tw`mx-12.5 mt-3 flex-row gap-x-8`}>
          <TouchableOpacity
            style={tw`flex-row gap-x-2 items-center`}
            onPress={() => setIsVisible(true)}
          >
            <FontAwesome5 name="comment" size={24} color="black" />
            <Text>{tweet?.Comments?.length}</Text>
          </TouchableOpacity>
          <LikeButton
            likeCount={tweet?.likedBy?.length}
            liked={tweet?.likedBy?.includes(user.id)}
            tweetId={tweet?.id}
            endpoint={"liked"}
          />
        </View>
      </View>

      <Divider />
    </>
  );
};

export default Tweet;
