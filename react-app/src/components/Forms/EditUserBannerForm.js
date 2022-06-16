import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { editBannerImage } from "../../store/userprofile";

function EditUserBannerForm({ socket, setShowModal }) {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [bannerImage, setBannerImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const roomUrl = window.location.pathname;

  const editMyBannerImage = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    const payload = {
      userId,
      banner_url: bannerImage,
      roomUrl,
    };

    await dispatch(editBannerImage(payload));

    await socket.emit("updatedBanner", payload);
    setImageLoading(false);
    setShowModal(false);
  };

  const updateBannerImage = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
    setSubmitted(true);
  };

  return (
    <div>
      <form
        className="edit__user__profile__container"
        onSubmit={editMyBannerImage}
      >
        <div className="create__post__header__container">
          <div className="create__post__header">Edit Cover Photo</div>
          <button
            className="close__modal"
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
        </div>
        <div>
          {submitted === true ? (
            <>
              <img
                className="edit__user__banner__preview__image"
                src={`${previewUrl}`}
                alt="previewImage"
              ></img>
            </>
          ) : (
            <>
              <div className="edit__user__banner__preview__image"></div>
            </>
          )}
        </div>
        {imageLoading && <p className="image__upload__loading">Loading...</p>}
        <input
          type="file"
          accept="image/*"
          onChange={updateBannerImage}
        ></input>
        {submitted === true ? (
          <button
            className="create__post__text__button"
            onClick={editMyBannerImage}
          >
            Edit Banner
          </button>
        ) : (
          <button
            disabled
            className="create__post__text__button__disabled"
            onClick={editMyBannerImage}
          >
            Edit Banner
          </button>
        )}
      </form>
    </div>
  );
}

export default EditUserBannerForm;
