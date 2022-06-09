import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  createAPost,
  editAPost,
  deleteAPost,
  createAComment,
  editAComment,
  deleteAComment,
} from "../../store/post";

import CreatePostModal from "./Modal/CreatePostModal";
import EditPostModal from "./Modal/EditPostModal";
import DeletePostModal from "./Modal/DeletePostModal";
import CreateCommentForm from "./Forms/CreateCommentForm";
import EditCommentModal from "./Modal/EditCommentModal";
import DeleteCommentModal from "./Modal/DeleteCommentModal";

// import { createAComment } from "../../store/comment";

function Home() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getAllPosts()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    isLoaded && (
      <div>
        <span>Home</span>
        <CreatePostModal />
        <div>
          {Object.values(posts)
            .reverse()
            .map((post) => {
              return (
                <div key={post.id}>
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
    )
  );
}

export default Home;
