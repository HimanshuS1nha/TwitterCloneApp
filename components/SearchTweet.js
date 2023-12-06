import { View, Text } from "react-native";
import React from "react";
import { Avatar, Divider } from "@rneui/themed";
import tw from "twrnc";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { router } from "expo-router";

const SearchTweet = ({ tweet }) => {
  const { data, error } = useQuery({
    queryKey: ["getsearchuser" + tweet.userId],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/getuser`,
        { id: tweet.userId }
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
      <View style={tw`flex-row gap-x-3 mb-3 mx-3 py-2`}>
        <Avatar size={40} rounded source={{ uri: data?.user?.image }} />
        <View>
          <View style={tw`flex-row gap-x-2 items-center`}>
            <Text style={tw`font-extrabold`}>{data?.user?.name}</Text>
            <Text style={tw`text-xs text-neutral-600`}>
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

export default SearchTweet;
