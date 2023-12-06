import { View, Text } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { Divider, Avatar } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import LikeButton from "./LikeButton";
import { formatDistanceToNowStrict } from "date-fns";
import { AuthContext } from "../context";
import { router } from "expo-router";

const Comment = ({ comment, username }) => {
  const { user } = useContext(AuthContext);

  const { data, error } = useQuery({
    queryKey: ["getuser" + comment?.userId],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/getuser`,
        { id: comment?.userId }
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
      <View style={tw`m-3`}>
        <View style={tw`flex-row gap-x-3`}>
          <Avatar size={40} rounded source={{ uri: data?.user?.image }} />
          <View>
            <View style={tw`flex-row gap-x-2 items-center`}>
              <Text style={tw`font-extrabold`}>{data?.user?.name}</Text>
              <Text style={tw`text-sm text-neutral-600`}>
                @{data?.user?.username}
              </Text>
              <Text style={tw`text-neutral-600 text-xs`}>
                {formatDistanceToNowStrict(new Date(comment?.createdAt))}
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-x-1`}>
              <Text style={tw`text-gray-600 text-xs`}>Replying to</Text>
              <Text style={tw`text-blue-500 text-xs`}>@{username}</Text>
            </View>
            <Text style={tw`text-sm`}>{comment?.content}</Text>
          </View>
        </View>
        <View style={tw`mx-12.5 mt-3`}>
          <LikeButton
            likeCount={comment?.likedBy?.length}
            liked={comment?.likedBy?.includes(user.id)}
            tweetId={comment?.id}
            endpoint="comment/liked"
          />
        </View>
      </View>

      <Divider />
    </>
  );
};

export default Comment;
