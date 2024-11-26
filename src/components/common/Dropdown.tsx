import { useEffect } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  items: { label: string; onClick: () => void }[];
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.querySelector(`.${styles.dropdown}`);
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.dropdown}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.dropdownItem}
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
