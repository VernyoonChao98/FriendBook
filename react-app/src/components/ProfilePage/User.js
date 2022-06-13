import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { io } from "socket.io-client";

import { getUserProfile, cleanUserProfile } from "../../store/userprofile";

import { getUsersPosts, cleanPost } from "../../store/post";

import CreatePostModal from "../Modal/CreatePostModal";
import EditUserProfileModal from "../Modal/EditUserProfileModal";
import EditUserBannerModal from "../Modal/EditUserBannerModal";

import Posts from "../Posts";

let socket;

function User() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const userProfile = useSelector((state) => state.userprofile)[userId];

  const [isLoaded, setIsLoaded] = useState(false);
  // const [previewUrl, setPreviewUrl] = useState();

  const roomUrl = window.location.pathname;

  useEffect(() => {
    socket = io();

    const socketPayload = {
      roomUrl,
    };

    const payload = {
      userId,
    };

    socket.emit("join", socketPayload);

    socket.on("updatedProfile", async (payload) => {
      console.log("owner changed profile");
      if (parseInt(payload.userId) !== sessionUser.id) {
        console.log("not the owner and others will update their thing");
        dispatch(getUserProfile(payload)).then(() => {
          dispatch(getUsersPosts(payload));
        });
      }
    });

    socket.on("updatedBanner", async (payload) => {
      console.log("owner changed banner");
      if (parseInt(payload.userId) !== sessionUser.id) {
        console.log("not the owner and others will update their thing");
        dispatch(getUserProfile(payload));
      }
    });

    dispatch(getUserProfile(payload))
      .then(() => {
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
  }, [dispatch, userId, roomUrl, sessionUser.id]);

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
              src={userProfile.banner_url}
              alt="banner"
            ></img>
          </div>
          <div className="userprofile__top__user__info__container">
            <div className="test">
              <img
                className="userprofile__top__avatar"
                src={userProfile.avatar_url}
                alt="avatar"
              ></img>
              <div>
                <span className="userprofile__top__username">
                  {userProfile.username}
                </span>
                <span className="">0 friends</span>
              </div>
            </div>
            {sessionUser.id === userProfile.id ? (
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
                {userProfile.firstname} {userProfile.lastname}
              </span>
            </div>
            <div className="userprofile__main__content__header__container">
              <span className="userprofile__main__content__header">Bio</span>
              <span className="userprofile__main__content__bio__content">
                {userProfile.bio.length === 0 ? (
                  <>Add A Bio</>
                ) : (
                  <>{userProfile.bio}</>
                )}
              </span>
            </div>
            <div className="userprofile__main__content__header__container">
              <span className="userprofile__main__content__header">
                Birthday
              </span>
              <span className="userprofile__main__content__bio__content">
                {moment(userProfile.birthday).format("L")}
              </span>
            </div>
            {sessionUser.id === userProfile.id ? (
              <EditUserProfileModal socket={socket} />
            ) : null}
          </div>
          <div className="userprofile__all__user__posts">
            {sessionUser.id === userProfile.id ? <CreatePostModal /> : null}
            <Posts />
          </div>
        </div>
      </div>
    )
  );
}
export default User;
