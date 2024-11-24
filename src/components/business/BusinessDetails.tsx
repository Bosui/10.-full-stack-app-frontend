import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./BusinessDetails.module.scss";

const BusinessDetails: React.FC = () => {
  const location = useLocation();
  const business = location.state?.business;

  if (!business) {
    return <div>Verslo informacija nerasta</div>;
  }

  return (
    <div className={styles.detailsContainer}>
      <img
        src={business.imageUrls[0]}
        alt={business.name}
        className={styles.image}
      />
      <div className={styles.details}>
        <h1>{business.name}</h1>
        <p>
          <strong>About:</strong> {business.about}
        </p>
        <p>
          <strong>Category:</strong> {business.category}
        </p>
        <p>
          <strong>Address:</strong> {business.address}
        </p>
        <p>
          <strong>Contact Person:</strong> {business.contactPerson}
        </p>
        <p>
          <strong>Email:</strong> {business.email}
        </p>
      </div>
    </div>
  );
};

export default BusinessDetails;
