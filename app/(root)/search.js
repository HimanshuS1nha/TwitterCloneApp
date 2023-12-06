import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import SafeView from "../../components/SafeView";
import Header from "../../components/Header";
import SearchHeader from "../../components/SearchHeader";
import { Tab, TabView } from "@rneui/themed";
import tw from "twrnc";
import { useMutation } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import axios, { AxiosError } from "axios";
import { AuthContext } from "../../context";
import SearchUsers from "../../components/SearchUsers";
import SearchTweets from "../../components/SearchTweets";
import { router } from "expo-router";

const Search = () => {
  const { user } = useContext(AuthContext);

  const [index, setIndex] = useState(0);
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchTweets, setSearchTweets] = useState([]);

  const { mutate: handleSearch } = useMutation({
    mutationKey: ["search"],
    mutationFn: async (searchTerm) => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/search`,
        {
          searchTerm,
          email: user.email,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      setSearchTweets(data?.tweets);
      setSearchUsers(data?.users);
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

  const debouncedRequest = debounce(async (searchTerm) => {
    handleSearch(searchTerm);
  }, 500);
  return (
    <SafeView>
      <Header title={"Search"} />
      <SearchHeader onChange={debouncedRequest} />
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "blue",
          height: 3,
        }}
        dense
        style={tw`-mt-2`}
      >
        <Tab.Item title="Users" titleStyle={tw`text-blue-500 text-sm`} />
        <Tab.Item title="Tweets" titleStyle={tw`text-blue-500 text-sm`} />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={tw`w-full mt-2`}>
          <SearchUsers users={searchUsers} />
        </TabView.Item>
        <TabView.Item style={tw`w-full mt-2`}>
          <SearchTweets tweets={searchTweets} />
        </TabView.Item>
      </TabView>
    </SafeView>
  );
};

export default Search;
