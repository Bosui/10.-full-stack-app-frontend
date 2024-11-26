import React, { useState } from "react";
import styles from "./Avatar.module.scss";
import Dropdown from "./Dropdown";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

const Avatar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatar} onClick={toggleDropdown}>
        A {/* Placeholder for avatar initial */}
      </div>
      {isOpen && (
        <Dropdown
          items={[
            { label: "My Account", onClick: () => console.log("My Account") },
            { label: "My Booking", onClick: () => console.log("My Booking") },
            { label: "Logout", onClick: () => console.log("Logout") },
          ]}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Avatar;
