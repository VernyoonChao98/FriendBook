import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllPosts, cleanPost } from "../../store/post";

import CreatePostModal from "../Modal/CreatePostModal";

import Posts from "../Posts";

function Home() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts()).then(() => {
      setIsLoaded(true);
    });

    return () => {
      dispatch(cleanPost());
    };
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="home__main__content">
        <div className="home__middle_container">
          <CreatePostModal />
          <Posts />
        </div>
      </div>
    )
  );
}

export default Home;
