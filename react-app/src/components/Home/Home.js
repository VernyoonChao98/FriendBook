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

  const createComment = (e, postId) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      post_id: postId,
      content: "hard Comment",
    };

    dispatch(createAComment(payload));
  };

  const editComment = (e, commentId) => {
    e.preventDefault();
    const payload = {
      commentId,
      content: "edited the commentsssss",
    };

    dispatch(editAComment(payload));
  };

  const deleteComment = (e, commentId) => {
    e.preventDefault();
    const payload = {
      commentId,
    };

    dispatch(deleteAComment(payload));
  };

  return (
    isLoaded && (
      <div>
        <span>Home</span>
        <CreatePostModal />
        <div>
          {Object.values(posts).map((post) => {
            return (
              <div key={post.id}>
                <span>{post.content}</span>
                <EditPostModal post={post} />
                <DeletePostModal post={post} />
                <button
                  onClick={(e) => {
                    createComment(e, post.id);
                  }}
                >
                  Create A Comment
                </button>
                {Object.values(post.comments).map((comment) => {
                  return (
                    <div key={comment.id}>
                      <span>{comment.id}</span>
                      <span>{comment.content}</span>
                      <button
                        onClick={(e) => {
                          editComment(e, comment.id);
                        }}
                      >
                        Edit Comment
                      </button>
                      <button
                        onClick={(e) => {
                          deleteComment(e, comment.id);
                        }}
                      >
                        Delete Comment
                      </button>
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
