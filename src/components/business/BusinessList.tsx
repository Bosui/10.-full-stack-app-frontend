// src/components/BusinessList.tsx
import axios from "axios";
import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BusinessList.module.scss";
import { useBusinesses } from "./hooks"; // Hook'as duomenų gavimui iš backend

const BusinessList: React.FC = () => {
  const { data: businesses, isLoading, error } = useBusinesses(); // Gauti duomenis iš backend
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading businesses</div>;
  }

  const handleCardClick = async (id: string) => {
    try {
      // Aplinka: Vite aplinkos kintamieji
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

      if (!baseUrl) {
        throw new Error("API base URL is not defined in environment variables.");
      }

      const url = `${baseUrl}/businesses/${id}`;
      console.log("Siunčiama užklausa:", JSON.stringify({ url }, null, 2));

      const response = await axios.get(url);
      console.log("Atsakymas iš backend:", response.data);

      // Navigacija su gautais duomenimis
      navigate(`/business-details/${id}`, { state: { business: response.data } });
    } catch (error) {
      console.error("Klaida siunčiant užklausą į backend:", error);
      alert("Nepavyko užkrauti verslo detalių. Patikrinkite tinklo jungtį ar serverio statusą.");
    }
  };

  return (
    <div className={styles.container}>
      {businesses?.map((business) => (
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
            <p className={styles.address}>{business.location || "No location provided"}</p>
            <button className={styles.bookButton}>View details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessList;
