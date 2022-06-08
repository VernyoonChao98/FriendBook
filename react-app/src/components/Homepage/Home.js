import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  createAPost,
  editAPost,
  deleteAPost,
} from "../../store/post";

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

  const createPost = (e) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      content: "hard coded",
    };

    dispatch(createAPost(payload));
  };

  const editPost = (e, postId) => {
    e.preventDefault();
    const payload = {
      postId,
      content: "edited the postsssss",
    };
    dispatch(editAPost(payload));
  };

  const deletePost = (e, postId) => {
    e.preventDefault();
    const payload = {
      postId,
    };
    dispatch(deleteAPost(payload));
  };

  return (
    isLoaded && (
      <div>
        <span>Home</span>
        <div>
          {Object.values(posts).map((post) => {
            return (
              <div key={post.id}>
                <span>{post.content}</span>
                <button
                  onClick={(e) => {
                    editPost(e, post.id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    deletePost(e, post.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={createPost}>Create Post</button>
      </div>
    )
  );
}

export default Home;
