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
  location: string | React.ReactNode;
  imageUrls: string[];
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

  const filteredBusinesses = businesses?.filter((business: Business) =>
    categoryName
      ? typeof business.category === "string" &&
        business.category.toLowerCase() === categoryName.toLowerCase()
      : true
  );

  const handleCardClick = async (id: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/businesses/${id}`
      );
      navigate(`/business-details/${id}`, { state: { business: response.data } });
    } catch (error) {
      console.error("Error fetching business details:", error);
      alert("Failed to load business details.");
    }
  };

  return (
    <div className={classNames(styles.container, className)}>
      {filteredBusinesses?.map((business) => (
        <div
          key={business._id}
          className={classNames(styles.card)}
          onClick={() => handleCardClick(business._id)}
        >
          <img
            src={business.imageUrls[0]}
            alt={business.name}
            className={styles.image}
          />
          <div className={styles.content}>
            <span className={styles.category}>{business.category}</span>
            <h3 className={styles.name}>{business.name}</h3>
            <p className={styles.address}>
              {typeof business.location === "string" ? business.location : "Unknown location"}
            </p>
            <button className={styles.bookButton}>View details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessList;
