import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { io } from "socket.io-client";

import { getAllPosts, cleanPost } from "../../store/post";

import { getAllFriends, cleanFriends } from "../../store/friend";

import CreatePostModal from "../Modal/CreatePostModal";

import Posts from "../Posts";

import FriendList from "../FriendList";

let socket;

function Home() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    socket = io({
      // autoConnect: false,
    });
    // socket.connect();

    socket.emit("online", sessionUser);

    socket.on("online", async (payload) => {
      dispatch(getAllFriends({ userId: sessionUser.id }));
    });

    socket.on("offline", async (payload) => {
      dispatch(getAllFriends({ userId: sessionUser.id }));
    });

    socket.on("friends", async (payload) => {
      dispatch(cleanFriends());
      dispatch(getAllFriends({ userId: sessionUser.id }));
    });

    socket.on("updatedProfileHome", async (payload) => {
      dispatch(getAllPosts());
    });

    socket.on("createPostHome", async (payload) => {
      dispatch(getAllPosts());
    });

    socket.on("editPostHome", async (payload) => {
      dispatch(getAllPosts());
    });

    socket.on("deletePostHome", async (payload) => {
      await dispatch(cleanPost());
      await dispatch(getAllPosts());
    });

    socket.on("createCommentHome", async (payload) => {
      dispatch(getAllPosts());
    });

    socket.on("editCommentHome", async (payload) => {
      dispatch(getAllPosts());
    });

    socket.on("deleteCommentHome", async (payload) => {
      dispatch(getAllPosts());
    });

    dispatch(getAllPosts()).then(() => {
      setIsLoaded(true);
    });

    return () => {
      dispatch(cleanPost());
      socket.disconnect();
    };
  }, [dispatch, sessionUser]);

  return (
    isLoaded && (
      <div className="home__main__content">
        <div className="home__middle__container">
          <CreatePostModal socket={socket} />
          <Posts socket={socket} />
        </div>
        <div className="home__right__container">
          <FriendList />
        </div>
      </div>
    )
  );
}

export default Home;
