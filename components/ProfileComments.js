import { ScrollView } from "react-native";
import React, { useContext } from "react";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import ProfileComment from "./ProfileComment";
import { AuthContext } from "../context";

const ProfileComments = () => {
  const { user } = useContext(AuthContext);

  const { data, error } = useQuery({
    queryKey: ["getcommentsbyid"],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/getcommentsbyid`,
        { id: user?.id }
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
      {data?.comments?.map((comment) => {
        return <ProfileComment comment={comment} key={comment.id} />;
      })}
    </ScrollView>
  );
};

export default ProfileComments;
