import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { io } from "socket.io-client";

import {
  getUserProfile,
  editBannerImage,
  cleanUserProfile,
} from "../../store/userprofile";

import { getUsersPosts, cleanPost } from "../../store/post";

import CreatePostModal from "../Modal/CreatePostModal";
import EditUserProfileModal from "../Modal/EditUserProfileModal";

import Posts from "../Posts";

let socket;

function User() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const userProfile = useSelector((state) => state.userprofile)[userId];

  const [isLoaded, setIsLoaded] = useState(false);
  const [bannerImage, setBannerImage] = useState();
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

  const editMyBannerImage = (e) => {
    e.preventDefault();
    const payload = {
      userId,
      banner_url: bannerImage,
    };

    dispatch(editBannerImage(payload));
  };

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

  const updateBannerImage = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
  };

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
                <span className="">0 friends</span>
              </div>
            </div>
            <form onSubmit={editMyBannerImage}>
              <input
                type="file"
                accept="image/*"
                onChange={updateBannerImage}
              ></input>
              <button onClick={editMyBannerImage}>Edit Banner</button>
            </form>
            <button>Edit banner button for modal eventually</button>
          </div>
        </div>
        <div className="userprofile__main__content__container">
          <div className="userprofile__main__content__bio">
            <span>Intro</span>
            <span>
              Name: {userProfile?.firstname} {userProfile?.lastname}
            </span>
            <span>Bio: {userProfile?.bio}</span>
            <span>Birthday: {moment(userProfile?.birthday).format("L")}</span>
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
