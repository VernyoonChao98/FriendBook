import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { editBannerImage } from "../../store/userprofile";

function EditUserBannerForm({ socket, setShowModal }) {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [bannerImage, setBannerImage] = useState();

  const roomUrl = window.location.pathname;

  const editMyBannerImage = async (e) => {
    e.preventDefault();
    const payload = {
      userId,
      banner_url: bannerImage,
      roomUrl,
    };

    await dispatch(editBannerImage(payload));

    await socket.emit("updatedBanner", payload);
    setShowModal(false);
  };

  const updateBannerImage = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
  };

  return (
    <div>
      <form onSubmit={editMyBannerImage}>
        <input
          type="file"
          accept="image/*"
          onChange={updateBannerImage}
        ></input>
        <button onClick={editMyBannerImage}>Edit Banner</button>
      </form>
    </div>
  );
}

export default EditUserBannerForm;
