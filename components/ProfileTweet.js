import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import axios, { AxiosError } from "axios";
import tw from "twrnc";
import { Avatar } from "@rneui/themed";
import { formatDistanceToNowStrict } from "date-fns";
import { Divider } from "@rneui/base";
import { ActivityIndicator } from "react-native";

const ProfileTweet = ({ tweet }) => {
  const { data, error } = useQuery({
    queryKey: ["gettweetuser"],
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
      alert(error.data.response.error);
      if (error.response.status === 401) {
        router.replace("/login");
      }
    } else {
      alert("Some error occured. Please try again later!");
    }
  }
  return (
    <>
      <View style={tw`flex-row gap-x-3 m-3`}>
        {data?.user?.image ? (
          <Avatar size={40} rounded source={{ uri: data?.user?.image }} />
        ) : (
          <ActivityIndicator />
        )}
        <View>
          <View style={tw`flex-row gap-x-2 items-center`}>
            <Text style={tw`font-extrabold`}>{data?.user?.name}</Text>
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

      <Divider />
    </>
  );
};

export default ProfileTweet;
