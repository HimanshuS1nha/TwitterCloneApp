import { ScrollView, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import CreateTweet from "../../components/CreateTweet";
import Tweet from "../../components/Tweet";
import { AuthContext } from "../../context";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import tw from "twrnc";

const Home = () => {
  const { user } = useContext(AuthContext);

  const { data, error } = useQuery({
    queryKey: ["gettweets"],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/gettweets`,
        { email: user?.email }
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
    <SafeView>
      <Header title={"Home"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateTweet />

        {!data && <ActivityIndicator size={40} style={tw`mt-4`} />}

        {data?.tweets.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet?.id} />;
        })}
      </ScrollView>
    </SafeView>
  );
};

export default Home;
