import React, { useState, useEffect } from "react";

import EditPostModal from "./Home/Modal/EditPostModal";
import DeletePostModal from "./Home/Modal/DeletePostModal";

function MenuForPost({ post }) {
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
        <div className="menu__container">
          <EditPostModal setShowMenu={setShowMenu} post={post} />
          <DeletePostModal post={post} />
        </div>
      )}
    </div>
  );
}

export default MenuForPost;
