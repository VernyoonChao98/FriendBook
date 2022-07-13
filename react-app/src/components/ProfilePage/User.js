import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import moment from "moment";

import { io } from "socket.io-client";

import { getUserProfile, cleanUserProfile } from "../../store/userprofile";

import { getUsersPosts, cleanPost } from "../../store/post";

import {
  cleanFriends,
  getAllFriends,
  getAllPendingSentFQ,
  getAllPendingReceivedFQ,
} from "../../store/friend";

import { getAllUsers, cleanUsers } from "../../store/users";

import CreatePostModal from "../Modal/CreatePostModal";
import EditUserProfileModal from "../Modal/EditUserProfileModal";
import EditUserBannerModal from "../Modal/EditUserBannerModal";

import Posts from "../Posts";

let socket;

function User() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const userProfile = useSelector((state) => state.userprofile)[userId];
  const friends = useSelector((state) => state.friends.friends);

  console.log(userProfile?.sender);

  const [isLoaded, setIsLoaded] = useState(false);
  // const [previewUrl, setPreviewUrl] = useState();

  const roomUrl = window.location.pathname;

  useEffect(() => {
    socket = io({
      // autoConnect: false,
    });

    // socket.connect();

    const regex = /[^\d]/g;

    if (userId.match(regex)) {
      history.push("/404");
      socket.disconnect();
      return;
    }

    const socketPayload = {
      roomUrl,
    };

    const payload = {
      userId,
    };

    socket.emit("join", socketPayload);

    socket.on("updatedProfile", async (payload) => {
      if (parseInt(payload.userId) !== sessionUser.id) {
        dispatch(getUserProfile(payload)).then(() => {
          dispatch(getUsersPosts(payload));
        });
      }
    });

    socket.on("updatedBanner", async (payload) => {
      if (parseInt(payload.userId) !== sessionUser.id) {
        dispatch(getUserProfile(payload));
      }
    });

    socket.on("createPost", async () => {
      if (parseInt(payload.userId) !== sessionUser.id) {
        dispatch(getUsersPosts(payload));
      }
    });

    socket.on("editPost", async () => {
      if (parseInt(payload.userId) !== sessionUser.id) {
        dispatch(getUsersPosts(payload));
      }
    });

    socket.on("deletePost", async () => {
      if (parseInt(payload.userId) !== sessionUser.id) {
        await dispatch(cleanPost());
        await dispatch(getUsersPosts(payload));
      }
    });

    socket.on("createComment", async () => {
      dispatch(getUsersPosts(payload));
    });

    socket.on("editComment", async () => {
      dispatch(getUsersPosts(payload));
    });

    socket.on("deleteComment", async () => {
      dispatch(getUsersPosts(payload));
    });

    socket.on("friends", async (payload) => {
      if (payload.user_id !== sessionUser.id) {
        await dispatch(cleanFriends());
        await dispatch(cleanUsers());
        await dispatch(getAllFriends({ userId: sessionUser.id }));
        await dispatch(getAllPendingSentFQ({ userId: sessionUser.id }));
        await dispatch(getAllPendingReceivedFQ({ userId: sessionUser.id }));
        // await dispatch(getAllUsers());
      }
    });

    dispatch(getUserProfile(payload))
      .then((data) => {
        if (!data.ok) {
          history.push("/404");
          socket.disconnect();
          return;
        }
        dispatch(getUsersPosts(payload));
      })
      .then(() => {
        setIsLoaded(true);
      });

    return () => {
      dispatch(cleanPost());
      dispatch(cleanUserProfile());
      setIsLoaded(false);
      socket.emit("leave", socketPayload);
      socket.disconnect();
    };
  }, [dispatch, history, userId, roomUrl, sessionUser.id]);

  // const updateImage = (e) => {
  //   console.log(e.target.files, "this is line 47");
  //   const file = e.target.files[0];
  //   setImgUrl(file);
  //   setShowModal(true);
  //   if (file) {
  //     setPreviewUrl(URL.createObjectURL(file));
  //   }
  //   setSubmitted(true);
  // };

  return (
    isLoaded && (
      <div>
        <div className="userprofile__top__container">
          <div className="userprofile__top__banner__container">
            <img
              className="userprofile__top__banner"
              src={userProfile?.banner_url}
              alt="banner"
            ></img>
          </div>
          <div className="userprofile__top__user__info__container">
            <div className="test">
              <img
                className="userprofile__top__avatar"
                src={userProfile?.avatar_url}
                alt="avatar"
              ></img>
              <div>
                <span className="userprofile__top__username">
                  {userProfile?.username}
                </span>
                <span className="">
                  {Object?.values(userProfile?.sender)?.length +
                    Object?.values(userProfile?.recipient)?.length ===
                  0 ? (
                    <></>
                  ) : (
                    <>
                      {Object?.values(userProfile?.sender)?.length +
                        Object?.values(userProfile?.recipient)?.length ===
                      1 ? (
                        <>
                          {Object?.values(userProfile?.sender)?.length +
                            Object?.values(userProfile?.recipient)?.length}{" "}
                          Friend
                        </>
                      ) : (
                        <>
                          {Object?.values(userProfile?.sender)?.length +
                            Object?.values(userProfile?.recipient)?.length}{" "}
                          Friends
                        </>
                      )}
                    </>
                  )}
                </span>
                {sessionUser?.id !== userProfile?.id ? (
                  <button>Add Friend</button>
                ) : null}
              </div>
            </div>
            {sessionUser?.id === userProfile?.id ? (
              <EditUserBannerModal socket={socket} />
            ) : null}
          </div>
        </div>
        <div className="userprofile__main__content__container">
          <div className="userprofile__main__content__bio">
            <span className="userprofile__main__content__intro">Intro</span>
            <div className="userprofile__main__content__header__container">
              <span className="userprofile__main__content__header">Name</span>
              <span className="userprofile__main__content__bio__content">
                {userProfile?.firstname} {userProfile?.lastname}
              </span>
            </div>
            <div className="userprofile__main__content__header__container">
              <span className="userprofile__main__content__header">Bio</span>
              <span className="userprofile__main__content__bio__content">
                {userProfile?.bio?.length === 0 ? (
                  <>Add A Bio</>
                ) : (
                  <>{userProfile?.bio}</>
                )}
              </span>
            </div>
            <div className="userprofile__main__content__header__container">
              <span className="userprofile__main__content__header">
                Birthday
              </span>
              <span className="userprofile__main__content__bio__content">
                {moment(userProfile?.birthday).format("L")}
              </span>
            </div>
            {sessionUser?.id === userProfile?.id ? (
              <EditUserProfileModal socket={socket} />
            ) : null}
          </div>
          <div className="userprofile__all__user__posts">
            {sessionUser?.id === userProfile?.id ? (
              <CreatePostModal socket={socket} />
            ) : null}
            <Posts socket={socket} />
          </div>
        </div>
      </div>
    )
  );
}
export default User;
