import axios from "axios";
import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BusinessList.module.scss";
import { useBusinesses } from "./hooks";

interface Business {
  _id: string;
  name: string;
  category: string;
  imageUrls: string[];
  location?: string; // Savybė turi būti string arba undefined
}

interface BusinessListProps {
  categoryName?: string;
  className?: string;
}

const BusinessList: React.FC<BusinessListProps> = ({ categoryName, className }) => {
  const { data: businesses, isLoading, error } = useBusinesses();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading businesses</div>;
  }

  const handleCardClick = async (id: string) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

      if (!baseUrl) {
        throw new Error("API base URL is not defined in environment variables.");
      }

      const url = `${baseUrl}/businesses/${id}`;
      const response = await axios.get(url);

      navigate(`/business-details/${id}`, { state: { business: response.data } });
    } catch (err) {
      console.error("Error fetching business details:", err);
      alert("Failed to fetch business details.");
    }
  };

  const filteredBusinesses = categoryName
    ? businesses?.filter((business) => business.category === categoryName)
    : businesses;

  return (
    <div className={classNames(styles.container, className)}>
      {filteredBusinesses?.map((business) => (
        <div
          key={business._id}
          className={classNames(styles.card)}
          onClick={() => handleCardClick(business._id)}
        >
          <img
            src={business.imageUrls[0] || ""}
            alt={business.name}
            className={styles.image}
          />
          <div className={styles.content}>
            <span className={styles.category}>{business.category}</span>
            <h3 className={styles.name}>{business.name}</h3>
            <p className={styles.address}>{business.location || "No location provided"}</p>
            <button className={styles.bookButton}>View details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessList;
