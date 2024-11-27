import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext"; // Importuojame kontekstą
import styles from "./MyBooking.module.scss";

interface Booking {
  _id: string;
  businessId: string;
  date: string;
  time: string;
  status: string;
}

interface MyBookingProps {
  onClose: () => void; // Funkcija uždaryti užsakymų sąrašą
}

const MyBooking: React.FC<MyBookingProps> = ({ onClose }) => {
  const { user } = useContext(UserContext); // Gauname vartotojo duomenis
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) {
        setError("User email not available.");
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/bookings/user/${user.email}`
        );
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [user?.email]); // Stebime email, jei keičiasi

  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.myBookingContainer}>
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className={styles.bookingItem}>
              <p>
                <strong>Business ID:</strong> {booking.businessId}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBooking;
