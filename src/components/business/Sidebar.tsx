import React, { useState } from "react";
import BookingModal from "../common/BookingModal";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  business: {
    _id: string;
    name: string;
    address: string;
    contactPerson: string;
    email: string;
  };
  userEmail: string;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ business, userEmail, userName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.sidebar}>
      <button className={styles.bookButton} onClick={toggleModal}>
        Book Appointment
      </button>
      <div className={styles.businessSummary}>
        <h3>{business.name}</h3>
        <p>{business.address}</p>
        <p>Contact: {business.contactPerson}</p>
        <p>Email: {business.email}</p>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        businessId={business._id}
        // userEmail={userEmail}
        //       userName={userName}
        userEmail="test@example.com" // Tikras vartotojo el. paštas
        userName="John Doe"         // Tikras vartotojo vardas
      />
    </div>
  );
};

export default Sidebar;
