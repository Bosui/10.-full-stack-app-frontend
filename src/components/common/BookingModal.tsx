import axios from "axios";
import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { UserContext } from "../../context/UserContext"; // Importuojame UserContext
import styles from "./BookingModal.module.scss";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  businessId,
}) => {
  const { user } = useContext(UserContext); // Naudojame vartotojo duomenis iš konteksto
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

    if (!user?.email || !user?.name) {
      alert("User information is missing. Please log in.");
      return;
    }

    const bookingData = {
      businessId,
      date: selectedDate.toISOString(),
      time: selectedTime,
      userEmail: user.email,
      userName: user.name,
      status: "pending",
    };

    try {
    setIsSubmitting(true);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_BASE_URL}/bookings`,
      bookingData
    );

    alert("Booking successfully created!");
    console.log("Booking created successfully:", response.data);
    onClose(); // Uždaro modalą
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating booking:", error.response || error.message);
      alert(
        error.response?.data?.message || "Failed to create booking. Please try again."
      );
    } else {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  } finally {
    setIsSubmitting(false);
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
              {timeSlots.map((time) => (
                <button
                  type="button"
                  key={time}
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
