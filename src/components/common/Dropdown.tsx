import { useEffect } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  items: { label: string; onClick: () => void }[]; // Kiekvienas punktas turi label ir onClick funkciją
  onClose: () => void; // Uždaryti dropdown
}

const Dropdown: React.FC<DropdownProps> = ({ items, onClose }) => {

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.querySelector(`.${styles.dropdown}`);
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        onClose(); // Uždaryti dropdown paspaudus šalia
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
            item.onClick(); // Vykdome onClick iš funkcijos
            onClose(); // Uždarome dropdown
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
