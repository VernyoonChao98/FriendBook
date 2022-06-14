import React, { useState, useEffect } from "react";

import EditPostModal from "../Modal/EditPostModal";
import DeletePostModal from "../Modal/DeletePostModal";

function MenuForPost({ socket, post }) {
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
          <EditPostModal
            socket={socket}
            setShowMenu={setShowMenu}
            post={post}
          />
          <DeletePostModal socket={socket} post={post} />
        </div>
      )}
    </div>
  );
}

export default MenuForPost;
