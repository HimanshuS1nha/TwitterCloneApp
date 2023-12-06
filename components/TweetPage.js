import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Avatar, Divider } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { formatDistanceToNowStrict } from "date-fns";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import HeaderWithBack from "./HeaderWithBack";

const TweetPage = ({ tweet, user, isVisible, setIsVisible }) => {
  return (
    <Modal visible={isVisible} animationType="slide">
      <HeaderWithBack setIsVisible={setIsVisible} title={"Tweet"} />

      <View style={tw`m-3`}>
        <View style={tw`flex-row gap-x-3`}>
          <Avatar size={40} rounded source={{ uri: user?.image }} />
          <View>
            <View style={tw`flex-row gap-x-2 items-center`}>
              <Text style={tw`font-extrabold`}>{user?.name}</Text>
              <Text style={tw`text-sm text-neutral-600`}>
                @{user?.username}
              </Text>
              <Text style={tw`text-neutral-600 text-xs`}>
                {formatDistanceToNowStrict(new Date(tweet?.createdAt))}
              </Text>
            </View>
            <Text style={tw`text-sm`}>{tweet?.content}</Text>
          </View>
        </View>
        <View style={tw`mx-12.5 mt-3 flex-row gap-x-8`}>
          <View style={tw`flex-row gap-x-2 items-center`}>
            <FontAwesome5 name="comment" size={24} color="black" />
            <Text>{tweet?.Comments?.length}</Text>
          </View>
          <LikeButton
            likeCount={tweet?.likedBy?.length}
            liked={tweet?.likedBy?.includes(user?.id)}
            tweetId={tweet?.id}
          />
        </View>
      </View>

      <Divider />

      <CommentForm tweetId={tweet?.id} image={user?.image} />

      {tweet?.Comments?.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            username={user?.username}
          />
        );
      })}
    </Modal>
  );
};

export default TweetPage;
