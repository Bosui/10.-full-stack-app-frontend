// src/components/BusinessCard.tsx
import { useNavigate } from "react-router-dom";
import styles from "./BusinessList.module.scss";

interface Business {
  _id: string;
  name: string;
  category: string;
  location: string;
  imageUrls: string[];
}

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/business/${business._id}`); // Navigacija į naują puslapį
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img
        src={business.imageUrls[0]}
        alt={business.name}
        className={styles.image}
      />
      <div className={styles.content}>
        <span className={styles.category}>{business.category}</span>
        <h3 className={styles.name}>{business.name}</h3>
        <p className={styles.address}>{business.location}</p>
        <button className={styles.bookButton}>View details</button>
      </div>
    </div>
  );
};

export default BusinessCard;
