import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  items: { label: string; onClick: () => void }[];
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setFocusedIndex((prev) => (prev + 1) % items.length);
      } else if (event.key === "ArrowUp") {
        setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (event.key === "Enter" && focusedIndex >= 0) {
        items[focusedIndex].onClick();
        onClose();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, focusedIndex, items]);

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${styles.dropdownItem} ${index === focusedIndex ? styles.focused : ""}`}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          tabIndex={0} // Leidžia elementą fokusuoti
          onKeyPress={(e) => e.key === "Enter" && item.onClick()}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
