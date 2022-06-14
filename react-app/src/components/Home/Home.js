import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { io } from "socket.io-client";

import { getAllPosts, cleanPost } from "../../store/post";

import CreatePostModal from "../Modal/CreatePostModal";

import Posts from "../Posts";

let socket;

function Home() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    socket = io({
      autoConnect: false,
    });
    socket.connect();

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
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="home__main__content">
        <div className="home__middle_container">
          <CreatePostModal socket={socket} />
          <Posts socket={socket} />
        </div>
      </div>
    )
  );
}

export default Home;
