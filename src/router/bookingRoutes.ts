import express from "express";
import Booking from "../models/Booking";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Atspausdinkite užklausos turinį
    console.log("Request body:", req.body);

    const newBooking = new Booking(req.body);
    await newBooking.save();

    console.log("Booking created successfully:", newBooking);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error creating booking:", err); // Log the error to debug
    res.status(400).json({
      message: "Error creating booking",
      error: (err as Error)?.message ?? err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err); // Log error
    res
      .status(500)
      .json({ message: "Error fetching bookings for the user", error: err });
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const userBookings = await Booking.find({ userEmail: req.params.email });
    res.json(userBookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err); // Log error
    res
      .status(500)
      .json({ message: "Error fetching bookings for the user", error: err });
  }
});

export default router;
