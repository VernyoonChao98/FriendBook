import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, cleanUserProfile } from "../store/userprofile";

function User() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId } = useParams();
  const userProfile = useSelector((state) => state.userprofile)[userId];

  useEffect(() => {
    const payload = {
      userId,
    };

    dispatch(getUserProfile(payload)).then(() => {
      setIsLoaded(true);
    });

    return () => {
      dispatch(cleanUserProfile());
    };
  }, [dispatch]);

  return (
    isLoaded && (
      <div>
        <span>{userProfile.firstname}</span>
        <span>{userProfile.lastname}</span>
      </div>
    )
  );
}
export default User;
