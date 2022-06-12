import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../../store/session";
import { getUsersPosts } from "../../store/post";
import { editUserProfile } from "../../store/userprofile";

function EditUserProfileForm({ socket, setShowModal }) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userProfile = useSelector((state) => state.userprofile)[userId];

  const [bio, setBio] = useState("");
  const [avatarImage, setAvatarImage] = useState();

  const roomUrl = window.location.pathname;

  const editMyUserProfile = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      bio,
      avatar_url: avatarImage,
      roomUrl,
    };

    await dispatch(editUserProfile(payload)).then(async () => {
      if (parseInt(userId) === userProfile.id) {
        const payload = {
          userId,
        };
        await dispatch(getUser(payload));
        await dispatch(getUsersPosts(payload));
      }
    });

    await socket.emit("updatedProfile", payload);
    setBio("");
    setShowModal(false);
  };

  const updateAvatarImage = (e) => {
    const file = e.target.files[0];
    setAvatarImage(file);
  };

  return (
    <div>
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
        <button onClick={editMyUserProfile}>Confirm Edit</button>
      </form>
    </div>
  );
}

export default EditUserProfileForm;
