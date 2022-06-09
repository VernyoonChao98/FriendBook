import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/post";

import CreatePostModal from "./Modal/CreatePostModal";
import EditPostModal from "./Modal/EditPostModal";
import DeletePostModal from "./Modal/DeletePostModal";
import CreateCommentForm from "./Forms/CreateCommentForm";
import EditCommentModal from "./Modal/EditCommentModal";
import DeleteCommentModal from "./Modal/DeleteCommentModal";

function Home() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="home__main__content">
        <div className="home__middle_container">
          <CreatePostModal />
          <div className="home__all__post__container">
            {Object.values(posts)
              .reverse()
              .map((post) => {
                return (
                  <div className="home__each__post__container" key={post.id}>
                    <span>{post.user.username}</span>
                    <span>{post.content}</span>
                    <EditPostModal post={post} />
                    <DeletePostModal post={post} />
                    <CreateCommentForm post={post} />
                    {Object.values(post.comments).map((comment) => {
                      return (
                        <div key={comment.id}>
                          <span>{comment.user.username} </span>
                          <span>{comment.content}</span>
                          <EditCommentModal comment={comment} />
                          <DeleteCommentModal comment={comment} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    )
  );
}

export default Home;
