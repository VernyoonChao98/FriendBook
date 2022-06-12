import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getUserProfile,
  editUserProfile,
  editBannerImage,
  cleanUserProfile,
} from "../../store/userprofile";
import { getUsersPosts, cleanPost } from "../../store/post";

import { getUser } from "../../store/session";

import CreatePostModal from "../Modal/CreatePostModal";

import Posts from "../Posts";

function User() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userProfile = useSelector((state) => state.userprofile)[userId];

  const [isLoaded, setIsLoaded] = useState(false);
  const [bio, setBio] = useState("");
  const [avatarImage, setAvatarImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  // const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    const payload = {
      userId,
    };
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
    };
  }, [dispatch, userId]);

  const editMyUserProfile = (e) => {
    e.preventDefault();

    const payload = {
      userId,
      bio,
      avatar_url: avatarImage,
    };
    dispatch(editUserProfile(payload)).then(() => {
      if (parseInt(userId) === userProfile.id) {
        const payload = {
          userId,
        };
        dispatch(getUser(payload));
        dispatch(getUsersPosts(payload));
      }
    });
    setBio("");
  };

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

  const updateAvatarImage = (e) => {
    const file = e.target.files[0];
    setAvatarImage(file);
  };

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
            <span>Bio: {userProfile?.bio}asdasdascac aczxcsazdxfqasdas</span>
            <span>Birthday: {moment(userProfile?.birthday).format("L")}</span>
            <form onSubmit={editMyUserProfile}>
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                type="text"
                required
                placeholder="Biography"
              />
              <input
                type="file"
                accept="image/*"
                onChange={updateAvatarImage}
              ></input>
              <button onClick={editMyUserProfile}>Edit Profile</button>
              <button>button to open edit profile modal eventually</button>
            </form>
          </div>
          <div className="userprofile__all__user__posts">
            <CreatePostModal />
            <Posts />
          </div>
        </div>
      </div>
    )
  );
}
export default User;
