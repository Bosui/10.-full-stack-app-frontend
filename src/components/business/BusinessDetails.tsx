import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BusinessDetails.module.scss";
import Sidebar from "./Sidebar";

interface Business {
  _id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  contactPerson: string;
  email: string;
  imageUrls: string[];
}

const BusinessDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID iš URL
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await axios.get<Business>(
          `${import.meta.env.VITE_APP_API_BASE_URL}/businesses/${id}`
        );
        setBusiness(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Nepavyko užkrauti verslo detalių");
        setIsLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!business) {
    return <div>Verslo informacija nerasta</div>;
  }

  return (
    <div className={styles.detailsPage}>
      <div className={styles.detailsContent}>
        <div className={styles.businessHeader}>
          <img
            src={business.imageUrls[0]}
            alt={business.name}
            className={styles.image}
          />
          <div>
            <h1>{business.name}</h1>
            <p>{business.category}</p>
            <p>{business.address}</p>
            <p>Contact: {business.contactPerson}</p>
            <p>Email: {business.email}</p>
          </div>
        </div>
        <div className={styles.description}>
          <h2>Description</h2>
          <p>{business.description}</p>
        </div>
      </div>
      <Sidebar business={business} />
    </div>
  );
};

export default BusinessDetails;
