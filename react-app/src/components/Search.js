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
    }
    return () => {
      dispatch(cleanUsers());
    };
  }, [dispatch, searchInput]);

  return (
    <div
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
        <div>
          {Object.values(searchedUsers).length ? (
            <>
              {Object.values(searchedUsers).map((user) => {
                return (
                  <NavLink
                    onClick={(e) => {
                      setSearchInput("");
                      setFocused(false);
                    }}
                    to={`/profile/${user.id}`}
                  >
                    {user.username}
                  </NavLink>
                );
              })}
            </>
          ) : (
            <>No users found</>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
