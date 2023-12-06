import { ScrollView, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../context";
import { router } from "expo-router";
import NotificationItem from "../../components/NotificationItem";
import tw from "twrnc";

const Notifications = () => {
  const { user } = useContext(AuthContext);

  const { data, error } = useQuery({
    queryKey: ["getnotifications"],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/getnotifications`,
        { email: user.email }
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
    }
  }
  return (
    <SafeView>
      <Header title={"Notifications"} />

      <ScrollView>
        {!data && <ActivityIndicator size={40} style={tw`mt-4`} />}
        {data?.notifications.map((notification) => {
          return (
            <NotificationItem
              notification={notification}
              key={notification.id}
            />
          );
        })}
      </ScrollView>
    </SafeView>
  );
};

export default Notifications;
