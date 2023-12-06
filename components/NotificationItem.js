import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { Avatar, Divider } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const NotificationItem = ({ notification }) => {
  const { data, error } = useQuery({
    queryKey: ["getuser" + notification.notificationBy],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/getuser`,
        { id: notification.notificationBy }
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
      <View style={tw`px-5 my-3`}>
        <View style={tw`flex-row gap-x-6`}>
          <Image
            rounded
            source={require("../assets/logoblue.png")}
            style={tw`mt-1 w-[40px] h-[30px]`}
          />
          <View>
            <Avatar
              size={40}
              rounded
              source={{ uri: data?.user.image }}
              containerStyle={tw`mb-2`}
            />
            <Text style={tw`mb-4 font-semibold`}>{data?.user.name}</Text>
            <Text style={tw`text-neutral-600 w-[50%]`}>
              {notification.content}
            </Text>
          </View>
        </View>
      </View>

      <Divider />
    </>
  );
};

export default NotificationItem;
