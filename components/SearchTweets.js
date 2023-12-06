import { View, Text, ScrollView } from "react-native";
import React from "react";
import SearchTweet from "./SearchTweet";

const SearchTweets = ({ tweets }) => {
  return (
    <ScrollView>
      {tweets?.map((tweet) => {
        return <SearchTweet tweet={tweet} key={tweet?.id} />;
      })}
    </ScrollView>
  );
};

export default SearchTweets;
