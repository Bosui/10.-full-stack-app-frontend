import { useState } from "react";
import styles from "./Avatar.module.scss";
import Dropdown from "./Dropdown";
import MyBooking from "./MyBooking"; // Naujas komponentas užsakymams atvaizduoti

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false); // Atidarymo būsena užsakymams

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMyBooking = () => {
    setIsBookingOpen(true);
    setIsOpen(false); // Uždaro dropdown meniu
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
            { label: "My Booking", onClick: handleMyBooking }, // Atidaro užsakymų sąrašą
            { label: "Logout", onClick: () => console.log("Logout") },
          ]}
          onClose={() => setIsOpen(false)}
        />
      )}
      {isBookingOpen && (
        <MyBooking onClose={() => setIsBookingOpen(false)} /> // Užsakymų komponentas
      )}
    </div>
  );
};

export default Avatar;
