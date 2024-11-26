import axios from "axios";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./BookingModal.module.scss";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string;
  userEmail: string;
  userName: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  businessId,
  userEmail,
  userName,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and time.");
      return;
    }

    const bookingData = {
      businessId, // Iš props
      date: selectedDate.toISOString(), // ISO formato data
      time: selectedTime, // Pasirinktas laikas
      userEmail, // Iš props
      userName, // Iš props
      status: "pending", // Numatytoji status reikšmė
    };

    try {
      setIsSubmitting(true);
      console.log("Sending booking data:", bookingData); // Debug logas

      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/bookings`, // URL iš .env
        bookingData
      );

      console.log("Booking created successfully:", response.data);
      alert("Booking successfully created!");
      onClose(); // Uždaro modalą
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false); // Atstatome submit būseną
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Book a Service</h2>
        <p>Select Date and Time slot to book a service</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Select Date</label>
            <Calendar
              onChange={(date) => setSelectedDate(date as Date)}
              value={selectedDate}
              minDate={new Date()}
              className={styles.calendar}
            />
          </div>
          <div className={styles.field}>
            <label>Select Time Slot</label>
            <div className={styles.timeSlots}>
              {timeSlots.map((time, index) => (
                <button
                  type="button"
                  key={index}
                  className={`${styles.timeSlot} ${
                    selectedTime === time ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
