import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { cleanUsers, getAllUsers } from "../store/users";

function Search() {
  const dispatch = useDispatch();
  const searchedUsers = useSelector((state) => state.users);
  const [searchInput, setSearchInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [ignoreBlur, setIgnoreBlur] = useState(false);

  useEffect(() => {
    if (searchInput.length > 0) {
      dispatch(getAllUsers(searchInput));
    } else {
      setTimeout(() => dispatch(cleanUsers()), 100);
    }

    if (searchInput.length === 0) {
      return () => {
        console.log("hello");
        dispatch(cleanUsers());
      };
    }
  }, [dispatch, searchInput]);

  return (
    <div
      className="search"
      onMouseDown={(e) => {
        setIgnoreBlur(true);
      }}
      onMouseUp={(e) => {
        setIgnoreBlur(false);
      }}
    >
      <input
        type="text"
        value={searchInput}
        placeholder="Search Friendbook"
        onFocus={(e) => {
          setFocused(true);
        }}
        onBlur={(e) => {
          if (ignoreBlur) return;
          setFocused(false);
        }}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      ></input>
      {focused && (
        <div className="search__options">
          {Object.values(searchedUsers).length ? (
            <>
              {Object.values(searchedUsers).map((user) => {
                return (
                  <NavLink
                    key={user.id}
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={(e) => {
                      setSearchInput("");
                      setFocused(false);
                    }}
                    to={`/profile/${user.id}`}
                  >
                    <div className="each__search__options">
                      <img
                        className="home__create__comment__avatar"
                        src={user.avatar_url}
                        alt="createCommentAvatar"
                      />{" "}
                      {user.username}
                    </div>
                  </NavLink>
                );
              })}
            </>
          ) : (
            <div className="each__search__options">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
