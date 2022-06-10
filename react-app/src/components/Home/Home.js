import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

import { getAllPosts } from "../../store/post";

import CreatePostModal from "./Modal/CreatePostModal";
import CreateCommentForm from "./Forms/CreateCommentForm";

import MenuForPost from "../MenuForPost";
import MenuForComment from "../MenuForComment";

function Home() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
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
                    <div className="home__post__user__info">
                      <div className="home__post__user__left">
                        <img
                          className="home__avatar"
                          src={post.user.avatar_url}
                          alt="postAvatar"
                        />
                        <div className="home__post__user__text">
                          <NavLink
                            to={`/profile/${post.user_id}`}
                            className="home__post__username__text"
                          >
                            {post.user.username}
                          </NavLink>
                          <span>{moment(post.created_at).format("lll")}</span>
                        </div>
                      </div>
                      {sessionUser.id === post.user_id ? (
                        <MenuForPost post={post} />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="home__post__content">
                      <div>{post.content}</div>
                      <div>
                        <div className="home__post__comment__count">
                          {Object.values(post.comments).length === 0 ? (
                            <></>
                          ) : (
                            <>
                              {Object.values(post.comments).length === 1 ? (
                                <>
                                  {Object.values(post.comments).length} Comment
                                </>
                              ) : (
                                <>
                                  {Object.values(post.comments).length} Comments
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {Object.values(post.comments).map((comment) => {
                      return (
                        <div
                          className="home__each__comment__container"
                          key={comment.id}
                        >
                          <div className="home__comment__user__left">
                            <img
                              className="comment_avatar"
                              src={comment.user.avatar_url}
                              alt="commentAvatar"
                            />
                          </div>
                          <div className="home__comment__container">
                            <div className="home__comment__content">
                              <div className="home__comment__user__text">
                                <NavLink
                                  to={`/profile/${comment.user_id}`}
                                  className="home__comment__username__text"
                                >
                                  {comment.user.username}
                                </NavLink>
                              </div>
                              {comment.content}
                            </div>
                            {sessionUser.id === comment.user_id ? (
                              <MenuForComment comment={comment} />
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <CreateCommentForm post={post} />
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
