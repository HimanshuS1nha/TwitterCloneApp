import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import User from "./User";

const FollowUser = ({ id }) => {
  const { data, error } = useQuery({
    queryKey: ["getuser" + id],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/getuser`,
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
  return <User user={data?.user} />;
};

export default FollowUser;
