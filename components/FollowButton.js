import React, { useState } from "react";
import { Button } from "@rneui/themed";
import tw from "twrnc";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";

const FollowButton = ({ followed, id, email, style }) => {
  const [isFollowing, setIsFollowing] = useState(followed);

  const { mutate: handleFollow, isPending } = useMutation({
    mutationKey: ["follow" + id],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/follow`,
        {
          id,
          email,
        }
      );
      return data;
    },
    onMutate: () => {
      setIsFollowing((prev) => !prev);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(error?.data?.response?.error);
        if (error?.response?.status === 401) {
          router.replace("/login");
        }
      } else {
        alert("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <>
      {isFollowing ? (
        <Button
          title={"Unfollow"}
          buttonStyle={tw`bg-gray-300`}
          titleStyle={tw`text-black`}
          containerStyle={tw`rounded-full ${style}`}
          onPress={handleFollow}
          disabled={isPending}
        />
      ) : (
        <Button
          title={"Follow"}
          containerStyle={tw`rounded-full ${style}`}
          onPress={handleFollow}
          disabled={isPending}
        />
      )}
    </>
  );
};

export default FollowButton;
