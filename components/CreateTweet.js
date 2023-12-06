import { View } from "react-native";
import React, { useContext, useState } from "react";
import tw from "twrnc";
import { Avatar, Input, Button, Divider } from "@rneui/themed";
import { AuthContext } from "../context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const CreateTweet = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [tweet, setTweet] = useState("");

  const { mutate: handleTweet, isPending } = useMutation({
    mutationKey: ["create-tweet"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/create-tweet`,
        { content: tweet, email: user?.email }
      );
      return data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["gettweets"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["gettweets"]);
      setTweet("");
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
      <View style={tw`m-3`}>
        <View style={tw`flex-row`}>
          <Avatar size={40} rounded source={{ uri: user?.image }} />
          <Input
            placeholder="What's Happening"
            inputStyle={tw`border border-white bg-white py-2 rounded-full`}
            inputContainerStyle={tw`border-transparent w-76`}
            value={tweet}
            onChangeText={(text) => setTweet(text)}
          />
        </View>
        <View style={tw`flex-row justify-end`}>
          <Button
            title={"Tweet"}
            containerStyle={tw`w-28 rounded-full`}
            onPress={handleTweet}
            disabled={isPending}
          />
        </View>
      </View>

      <Divider />
    </>
  );
};

export default CreateTweet;
