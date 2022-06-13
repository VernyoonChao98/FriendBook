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

  const [bio, setBio] = useState(userProfile.bio);
  const [avatarImage, setAvatarImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState([]);

  const roomUrl = window.location.pathname;

  const editMyUserProfile = async (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = [];

    if (bio.length > 100) {
      validationErrors.push("Post exceeds character limit 100.");
    }

    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

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
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
    setSubmitted(true);
  };

  return (
    <div>
      <form
        className="edit__user__profile__container"
        onSubmit={editMyUserProfile}
      >
        <div className="create__post__header__container">
          <div className="create__post__header">Edit Profile</div>
          <button
            className="close__modal"
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="edit__user__profile__image">
          <div>
            {submitted === true ? (
              <>
                <img
                  className="edit__user__profile__preview__image"
                  src={`${previewUrl}`}
                  alt="previewImage"
                ></img>
              </>
            ) : (
              <>
                <div className="edit__user__profile__preview__image"></div>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={updateAvatarImage}
          ></input>
        </div>
        <textarea
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          className="edit__user__profile__bio__input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          type="text"
          rows={4}
          cols={35}
          required
          wrap="soft"
          maxLength={101}
          placeholder="Tell me something about yourself"
        />
        {errors.map((error, ind) => (
          <div className="home__comment__errors" key={ind}>
            {error}
          </div>
        ))}
        <button
          className="create__post__text__button"
          onClick={editMyUserProfile}
        >
          Confirm Edit Profile
        </button>
      </form>
    </div>
  );
}

export default EditUserProfileForm;
