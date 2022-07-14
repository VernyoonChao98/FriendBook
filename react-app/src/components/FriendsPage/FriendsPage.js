import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

import { io } from "socket.io-client";

import {
  cleanFriends,
  getAllFriends,
  getAllPendingSentFQ,
  getAllPendingReceivedFQ,
  createFriendFQ,
  acceptReceivedFQ,
  cancelPendingFQ,
} from "../../store/friend";

import { getAllUsers, cleanUsers } from "../../store/users";

let socket;

function FriendsPage() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const otherUsers = useSelector((state) => state.users);
  const friends = useSelector((state) => state.friends.friends);
  const pendingReceivedFQs = useSelector(
    (state) => state.friends.pendingReceivedFQ
  );
  const pendingSentFQs = useSelector((state) => state.friends.pendingSentFQ);

  useEffect(() => {
    socket = io({
      // autoConnect: false,
    });
    // socket.connect();

    socket.on("friends", async (payload) => {
      if (payload.user_id !== sessionUser.id) {
        await dispatch(cleanFriends());
        await dispatch(cleanUsers());
        await dispatch(getAllFriends({ userId: sessionUser.id }));
        await dispatch(getAllPendingSentFQ({ userId: sessionUser.id }));
        await dispatch(getAllPendingReceivedFQ({ userId: sessionUser.id }));
        // await dispatch(getAllUsers());
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, sessionUser.id]);

  const handleAcceptReceivedFQ = async (e, friendId) => {
    e.preventDefault();
    const payload = {
      friendId,
      user_id: sessionUser.id,
    };
    await dispatch(acceptReceivedFQ(payload));
    await socket.emit("friends", payload);
  };

  const handleCancelPendingFQ = async (e, friendId) => {
    e.preventDefault();
    const payload = {
      friendId,
      user_id: sessionUser.id,
    };
    await dispatch(cancelPendingFQ(payload));
    await socket.emit("friends", payload);
  };

  const handleSendFQ = async (e, user_b) => {
    e.preventDefault();
    const payload = {
      user_a: sessionUser.id,
      user_b,
      user_id: sessionUser.id,
    };
    await dispatch(createFriendFQ(payload)).then((data) => {
      setErrors([]);
      if (data) {
        const validationErrors = [];
        validationErrors.push(data);
        setErrors(validationErrors);
      } else {
        socket.emit("friends", payload);
      }
    });
  };

  return (
    <div className="friendpage__main__content">
      <div className="height">
        <span className="friendpage__container__text">
          My Friends ({Object.values(friends).length})
        </span>
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
                    <div>{friend.recipient_id.firstname}</div>
                    <div>{friend.recipient_id.lastname}</div>
                    <div>{moment(friend.created_at).format("L")}</div>
                    <button
                      className="friendpage__remove__friend__button"
                      onClick={(e) => {
                        handleCancelPendingFQ(e, friend.id);
                      }}
                    >
                      Remove Friend
                    </button>
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
                    <div>{friend.sender_id.firstname}</div>
                    <div>{friend.sender_id.lastname}</div>
                    <div>{moment(friend.created_at).format("L")}</div>
                    <button
                      className="friendpage__remove__friend__button"
                      onClick={(e) => {
                        handleCancelPendingFQ(e, friend.id);
                      }}
                    >
                      Remove Friend
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="height">
        <span className="friendpage__container__text">
          Friend Requests ({Object.values(pendingReceivedFQs).length})
        </span>
        <div className="friend__friend__all__container">
          {Object.values(pendingReceivedFQs).map((friend) => {
            return (
              <div key={friend.id}>
                {friend.recipient_id.id !== sessionUser.id ? (
                  <div className="friendpage__friend__container">
                    <img
                      className="friendpage__friend__avatar"
                      src={friend.recipient_id.avatar_url}
                      alt="avatar"
                    ></img>
                    <div>{friend.recipient_id.username}</div>
                    <div>{friend.recipient_id.firstname}</div>
                    <div>{friend.recipient_id.lastname}</div>
                    <div>{moment(friend.created_at).format("L")}</div>
                    <div className="friendpage__two__buttons">
                      <button
                        className="friendpage__accept__friend__button"
                        onClick={(e) => {
                          handleAcceptReceivedFQ(e, friend.id);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="friendpage__remove__friend__button"
                        onClick={(e) => {
                          handleCancelPendingFQ(e, friend.id);
                        }}
                      >
                        Deny
                      </button>
                    </div>
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
                    <div>{friend.sender_id.firstname}</div>
                    <div>{friend.sender_id.lastname}</div>
                    <div>{moment(friend.created_at).format("L")}</div>
                    <div className="friendpage__two__buttons">
                      <button
                        className="friendpage__accept__friend__button"
                        onClick={(e) => {
                          handleAcceptReceivedFQ(e, friend.id);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="friendpage__remove__friend__button"
                        onClick={(e) => {
                          handleCancelPendingFQ(e, friend.id);
                        }}
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="height">
        <span className="friendpage__container__text">
          Sent Requests ({Object.values(pendingSentFQs).length})
        </span>
        <div className="friend__friend__all__container">
          {Object.values(pendingSentFQs).map((friend) => {
            return (
              <div key={friend.id}>
                {friend.recipient_id.id !== sessionUser.id ? (
                  <div className="friendpage__friend__container">
                    <img
                      className="friendpage__friend__avatar"
                      src={friend.recipient_id.avatar_url}
                      alt="avatar"
                    ></img>
                    <div>{friend.recipient_id.username}</div>
                    <div>{friend.recipient_id.firstname}</div>
                    <div>{friend.recipient_id.lastname}</div>
                    <div>{moment(friend.created_at).format("L")}</div>
                    <button
                      className="friendpage__remove__friend__button"
                      onClick={(e) => {
                        handleCancelPendingFQ(e, friend.id);
                      }}
                    >
                      Cancel
                    </button>
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
                    <div>{friend.sender_id.firstname}</div>
                    <div>{friend.sender_id.lastname}</div>
                    <div>{moment(friend.created_at).format("L")}</div>
                    <button
                      className="friendpage__remove__friend__button"
                      onClick={(e) => {
                        handleCancelPendingFQ(e, friend.id);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="height">
        <span className="friendpage__container__text">People you may know</span>
        {errors.map((error, ind) => (
          <div className="friendpage__friend__error" key={ind}>
            {error}
          </div>
        ))}
        <div className="friend__friend__all__container">
          {Object.values(otherUsers).map((user) => {
            return (
              <div key={user.id} className="friend__friend__each__container">
                {user.id !== sessionUser.id ? (
                  <div className="friendpage__friend__container">
                    <img
                      className="friendpage__friend__avatar"
                      src={user.avatar_url}
                      alt="avatar"
                    ></img>
                    <NavLink to={`/profile/${user.id}`}>
                      {user.username}
                    </NavLink>
                    <div>{user.firstname}</div>
                    <div>{user.lastname}</div>
                    <button
                      className="friendpage__send__friend__button"
                      onClick={(e) => {
                        handleSendFQ(e, user.id);
                      }}
                      onBlur={() => {
                        setErrors([]);
                      }}
                    >
                      Send Friend Request
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

export default FriendsPage;
