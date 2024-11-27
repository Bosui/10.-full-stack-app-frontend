import { UserContext } from "@/context/UserContext"; // Kontekstas prisijungimui/atsijungimui
import { ROUTES } from "@/router/consts";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyBooking from "../MyBooking"; // Komponentas užsakymams atvaizduoti
import styles from "./Avatar.module.scss";
import Dropdown from "./Dropdown";

interface AvatarProps {
  name?: string; // Vartotojo vardas (inicialams)
  imageUrl?: string; // URL, jei avatar yra paveikslėlis
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown meniu būsena
  const [isBookingOpen, setIsBookingOpen] = useState(false); // "My Booking" būsena

  const { user, logout } = useContext(UserContext); // Naudojame UserContext
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMyBooking = () => {
    setIsBookingOpen(true);
    setIsOpen(false); // Uždaro dropdown meniu
  };

  const handleLogout = () => {
    logout(); // Atsijungiame
    setIsOpen(false); // Uždaro dropdown meniu
    navigate(ROUTES.LOGIN); // Peradresuojame į prisijungimo puslapį
  };

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatar} onClick={toggleDropdown}>
        {imageUrl ? (
          <img src={imageUrl} alt={name || "User Avatar"} className={styles.image} />
        ) : (
          (user?.name?.[0] || "?") // Inicialas iš konteksto arba "?"
        )}
      </div>
      {isOpen && (
        <Dropdown
          items={[
            { label: "My Account", onClick: () => console.log("My Account") },
            { label: "My Booking", onClick: handleMyBooking },
            { label: "Logout", onClick: handleLogout }, // Atsijungimo funkcija
          ]}
          onClose={() => setIsOpen(false)}
        />
      )}
      {isBookingOpen && <MyBooking onClose={() => setIsBookingOpen(false)} />}
    </div>
  );
};

export default Avatar;
