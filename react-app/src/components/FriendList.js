import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExternalLink } from "react-external-link";

function FriendList() {
  const friends = useSelector((state) => state.friends.friends);
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="homepage__contacts__container">
      <div className="homepage__contacts__text">Sponsors</div>
      <ExternalLink
        className="external_link"
        href="https://www.linkedin.com/in/vernyoon-chao-783494123/"
      >
        <div className="linkedIn"></div>
        LinkedIn
      </ExternalLink>
      <ExternalLink
        className="external_link"
        href="https://github.com/VernyoonChao98"
      >
        <div className="github"></div>
        Github
      </ExternalLink>
      <ExternalLink
        className="external_link"
        href="https://github.com/VernyoonChao98/FriendBook"
      >
        <div className="github"></div>
        Project Repo
      </ExternalLink>
      <div className="homepage__contacts__text">Contacts</div>
      {Object.values(friends).map((friend) => {
        return (
          <div key={friend.id} className="homepage__friendslist">
            <div className="homepage__all__friends__container">
              {friend.recipient_id.id !== sessionUser.id ? (
                <div>
                  {friend.recipient_id.online ? (
                    <div className="homepage__friend__display">
                      <img
                        className="homepage__friend__avatar"
                        src={friend.recipient_id.avatar_url}
                        alt="avatar"
                      />
                      <div className="homepage__friends__online__dot"></div>
                      <div>{friend.recipient_id.username}</div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div>
                  {friend.sender_id.online ? (
                    <div className="homepage__friend__display">
                      <img
                        className="homepage__friend__avatar"
                        src={friend.sender_id.avatar_url}
                        alt="avatar"
                      />
                      <div className="homepage__friends__online__dot"></div>
                      <div>{friend.sender_id.username}</div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FriendList;
