import { ScrollView } from "react-native";
import React from "react";
import User from "./User";

const SearchUsers = ({ users }) => {
  return (
    <ScrollView>
      {users?.map((user) => {
        return <User user={user} key={user?.id} />;
      })}
    </ScrollView>
  );
};

export default SearchUsers;
