import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Avatar, Divider } from "@rneui/themed";
import tw from "twrnc";
import { formatDistanceToNowStrict } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context";
import { AxiosError } from "axios";

const ProfileComment = ({ comment }) => {
  const { user } = useContext(AuthContext);
  const { data, error } = useQuery({
    queryKey: ["gettweetuser"],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/getuser`,
        { id: comment.userId }
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
        <Avatar
          size={40}
          rounded
          source={{
            uri: user?.image,
          }}
        />
        <View>
          <View style={tw`flex-row gap-x-2 items-center`}>
            <Text style={tw`font-extrabold`}>{user?.name}</Text>
            <Text style={tw`text-sm text-neutral-600`}>@{user?.username}</Text>
            <Text style={tw`text-neutral-600 text-xs`}>
              {formatDistanceToNowStrict(new Date(comment.createdAt))}
            </Text>
          </View>
          <Text style={tw`text-gray-500 text-sm`}>
            Replying to <Text style={tw`text-blue-500`}>@HimanshuSinha</Text>
          </Text>
          <Text style={tw`text-sm`}>{comment.content}</Text>
        </View>
      </View>

      <Divider />
    </>
  );
};

export default ProfileComment;
