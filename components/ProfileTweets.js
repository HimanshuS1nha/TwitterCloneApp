import { ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import ProfileTweet from "./ProfileTweet";
import tw from "twrnc";

const ProfileTweets = ({ id }) => {
  const { data, error } = useQuery({
    queryKey: ["gettweetsbyid"],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/gettweetsbyid`,
        { id }
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
    <ScrollView>
      {!data && <ActivityIndicator size={40} style={tw`mt-4`} />}
      {data?.tweets?.map((tweet) => {
        return <ProfileTweet tweet={tweet} key={tweet?.id} />;
      })}
    </ScrollView>
  );
};

export default ProfileTweets;
