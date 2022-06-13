import React, { useState, useEffect } from "react";

import EditCommentModal from "../Modal/EditCommentModal";
import DeleteCommentModal from "../Modal/DeleteCommentModal";

function MenuForComment({ socket, post, comment }) {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div>
      <button className="menu__button" onClick={openMenu}>
        ...
      </button>
      {showMenu && (
        <div className="menu__container__comments">
          <EditCommentModal
            socket={socket}
            setShowMenu={setShowMenu}
            post={post}
            comment={comment}
          />
          <DeleteCommentModal comment={comment} />
        </div>
      )}
    </div>
  );
}

export default MenuForComment;
