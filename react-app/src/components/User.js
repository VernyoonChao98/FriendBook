import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  editUserProfile,
  editBannerImage,
  cleanUserProfile,
} from "../store/userprofile";

function User() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userProfile = useSelector((state) => state.userprofile)[userId];

  console.log(userProfile);

  const [isLoaded, setIsLoaded] = useState(false);
  const [avatarImage, setAvatarImage] = useState();
  const [bannerImage, setBannerImage] = useState();

  useEffect(() => {
    const payload = {
      userId,
    };

    dispatch(getUserProfile(payload)).then(() => {
      setIsLoaded(true);
    });

    return () => {
      dispatch(cleanUserProfile());
      setIsLoaded(false);
    };
  }, [dispatch, userId]);

  const editMyUserProfile = (e) => {
    e.preventDefault();
    const payload = {
      userId,
      bio: "changed",
      avatar_url: avatarImage,
    };
    dispatch(editUserProfile(payload));
  };

  const editMyBannerImage = (e) => {
    e.preventDefault();
    const payload = {
      userId,
      banner_url: bannerImage,
    };

    dispatch(editBannerImage(payload));
  };

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
        <span>{userProfile?.firstname}</span>
        <img src={userProfile?.avatar_url} alt="avatar"></img>
        <img src={userProfile?.banner_url} alt="banner"></img>
        <span>{userProfile?.lastname}</span>
        <span>{userProfile?.username}</span>
        <span>{userProfile?.bio}</span>
        <span>{userProfile?.birthday}</span>
        <form onSubmit={editMyUserProfile}>
          <input
            type="file"
            accept="image/*"
            onChange={updateAvatarImage}
          ></input>
          <button onClick={editMyUserProfile}>Edit Profile</button>
        </form>
        <form onSubmit={editMyBannerImage}>
          <input
            type="file"
            accept="image/*"
            onChange={updateBannerImage}
          ></input>
          <button onClick={editMyBannerImage}>Edit Banner</button>
        </form>
      </div>
    )
  );
}
export default User;
