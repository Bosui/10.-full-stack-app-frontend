<<<<<<< HEAD
import { PropsWithChildren } from "react";
import styles from "./Avatar.module.scss";

const Avatar = ({ children }: PropsWithChildren) => {
  return <div className={styles.avatar}>{children}</div>;
=======
import { useState } from "react";
import styles from "./Avatar.module.scss";
import Dropdown from "./Dropdown";

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
>>>>>>> 79bf93f (Initial commit)
};

export default Avatar;
