import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function FriendNumber() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const userProfile = useSelector((state) => state.userprofile)[userId];

  //   console.log(Object?.values(userProfile?.sender)?.length);

  return (
    <span className="">
      {userProfile ? (
        <>
          {Object?.values(userProfile?.sender)?.length +
            Object?.values(userProfile?.recipient)?.length ===
          0 ? (
            <></>
          ) : (
            <>
              {Object?.values(userProfile?.sender)?.length +
                Object?.values(userProfile?.recipient)?.length ===
              1 ? (
                <>
                  {Object?.values(userProfile?.sender)?.length +
                    Object?.values(userProfile?.recipient)?.length}{" "}
                  Friend
                </>
              ) : (
                <>
                  {Object?.values(userProfile?.sender)?.length +
                    Object?.values(userProfile?.recipient)?.length}{" "}
                  Friends
                </>
              )}
            </>
          )}
        </>
      ) : null}
    </span>
  );
}

export default FriendNumber;
