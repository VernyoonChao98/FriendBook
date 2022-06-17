import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../../store/session";
import { getUsersPosts } from "../../store/post";
import { editUserProfile } from "../../store/userprofile";

function EditUserProfileForm({ socket, setShowModal }) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const uploadHiddenInput = useRef();
  const sessionUser = useSelector((state) => state.session.user);
  const userProfile = useSelector((state) => state.userprofile)[userId];

  const [bio, setBio] = useState(userProfile.bio);
  const [avatarImage, setAvatarImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState([]);

  const roomUrl = window.location.pathname;

  const editMyUserProfile = async (e) => {
    e.preventDefault();
    setErrors([]);

    setImageLoading(true);

    const validationErrors = [];

    if (bio.length > 100) {
      validationErrors.push("Bio exceeds character limit 100.");
    }

    if (validationErrors.length) {
      setErrors(validationErrors);
      setImageLoading(false);
      return;
    }

    const payload = {
      userId,
      bio,
      avatar_url: avatarImage,
      roomUrl,
      user_id: sessionUser.id,
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
    await socket.emit("updatedProfileHome", payload);
    if (avatarImage) {
      await socket.emit("friends", payload);
    }
    setBio("");
    setImageLoading(false);
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

  const handleUpload = (e) => {
    e.preventDefault();
    uploadHiddenInput.current.click();
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
          {imageLoading && <p className="image__upload__loading">Loading...</p>}
          <button className="upload__image__button" onClick={handleUpload}>
            Choose Image
          </button>
          <input
            name="upload"
            type="file"
            accept="image/*"
            ref={uploadHiddenInput}
            onChange={updateAvatarImage}
            hidden
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
