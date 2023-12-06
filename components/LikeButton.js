import { Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AuthContext } from "../context";
import { router } from "expo-router";

const LikeButton = ({ likeCount, liked, tweetId, endpoint }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [isLiked, setIsLiked] = useState(liked);
  const [noOfLikes, setNoOfLikes] = useState(likeCount);

  const { mutate: handleLike, isPending } = useMutation({
    mutationKey: ["liked" + tweetId],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/${endpoint}`,
        {
          tweetId,
          email: user?.email,
        }
      );
      return data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["gettweets"]);
      if (isLiked) {
        setIsLiked(false);
        setNoOfLikes((prev) => (prev -= 1));
      } else {
        setIsLiked(true);
        setNoOfLikes((prev) => (prev += 1));
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["gettweets"]);
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

  const Icon = isLiked ? FontAwesome : Feather;
  return (
    <TouchableOpacity
      style={tw`flex-row gap-x-2 items-center`}
      onPress={handleLike}
      disabled={isPending}
    >
      <Icon name="heart" size={24} color={isLiked ? "red" : "black"} />
      <Text>{noOfLikes}</Text>
    </TouchableOpacity>
  );
};

export default LikeButton;
