import React, { useState, useEffect } from "react";

import EditCommentModal from "./Home/Modal/EditCommentModal";
import DeleteCommentModal from "./Home/Modal/DeleteCommentModal";

function MenuForComment({ comment }) {
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
      <button onClick={openMenu}>...</button>
      {showMenu && (
        <div>
          <EditCommentModal setShowMenu={setShowMenu} comment={comment} />
          <DeleteCommentModal comment={comment} />
        </div>
      )}
    </div>
  );
}

export default MenuForComment;
