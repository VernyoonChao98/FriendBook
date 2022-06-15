import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function FriendsPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const friends = useSelector((state) => state.friends.friends);
  const pendingReceivedFQs = useSelector(
    (state) => state.friends.pendingReceivedFQ
  );
  const pendingSentFQs = useSelector((state) => state.friends.pendingSentFQ);

  console.log(Object.values(friends));
  console.log(Object.values(pendingReceivedFQs));
  console.log(Object.values(pendingSentFQs));

  return (
    <div>
      <div>
        <span>My Friends</span>
        <div className="friend__friend__all__container">
          {Object.values(friends).map((friend) => {
            return (
              <div className="friend__friend__each__container" key={friend.id}>
                {friend.recipient_id.id !== sessionUser.id ? (
                  <div className="friendpage__friend__container">
                    <img
                      className="friendpage__friend__avatar"
                      src={friend.recipient_id.avatar_url}
                      alt="avatar"
                    ></img>
                    <div>{friend.recipient_id.username}</div>
                    <div>
                      {friend.recipient_id.firstname}{" "}
                      {friend.recipient_id.lastname}
                    </div>
                    <div>{moment(friend.created_at).format("L")}</div>
                  </div>
                ) : null}
                {friend.sender_id.id !== sessionUser.id ? (
                  <div className="friendpage__friend__container">
                    <img
                      className="friendpage__friend__avatar"
                      src={friend.sender_id.avatar_url}
                      alt="avatar"
                    ></img>
                    <div>{friend.sender_id.username}</div>
                    <div>
                      {friend.sender_id.firstname} {friend.sender_id.lastname}
                    </div>
                    <div>{moment(friend.created_at).format("L")}</div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <span>Friend Requests</span>
        {Object.values(pendingReceivedFQs).map((friend) => {
          return (
            <div key={friend.id}>
              {friend.recipient_id.id !== sessionUser.id ? (
                <>{friend.recipient_id.username}</>
              ) : null}
              {friend.sender_id.id !== sessionUser.id ? (
                <>{friend.sender_id.username}</>
              ) : null}
            </div>
          );
        })}
      </div>
      <div>
        <span>Sent Requests</span>
        {Object.values(pendingSentFQs).map((friend) => {
          return (
            <div key={friend.id}>
              {friend.recipient_id.id !== sessionUser.id ? (
                <>{friend.recipient_id.username}</>
              ) : null}
              {friend.sender_id.id !== sessionUser.id ? (
                <>{friend.sender_id.username}</>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsPage;
