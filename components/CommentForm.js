import { View } from "react-native";
import React, { useContext, useState } from "react";
import tw from "twrnc";
import { Avatar, Input, Button } from "@rneui/themed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AuthContext } from "../context";
import { router } from "expo-router";

const CommentForm = ({ tweetId, image }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [comment, setComment] = useState("");

  const { mutate: handleComment, isPending } = useMutation({
    mutationKey: ["comment" + tweetId],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/comment`,
        {
          id: tweetId,
          comment,
          email: user.email,
        }
      );
      return data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["gettweets"]);
    },
    onSettled: () => {
      setComment("");
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
  return (
    <View style={tw`bg-gray-200 px-3 flex-row gap-x-1 items-center`}>
      <Avatar size={40} rounded source={{ uri: image }} />
      <Input
        placeholder="Tweet your reply"
        inputStyle={tw`border border-black bg-white px-4 py-2 rounded-full`}
        inputContainerStyle={tw`border-transparent w-[57%`}
        containerStyle={tw`mt-6 py-0`}
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <Button
        title={"Reply"}
        containerStyle={tw`w-20 rounded-full absolute right-2`}
        onPress={handleComment}
        disabled={isPending}
      />
    </View>
  );
};

export default CommentForm;
