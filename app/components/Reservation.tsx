"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    date: "",
    time: "",
    numberOfGuests: 1,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const reservationPayload = {
      name: formData.name,
      contactNumber: formData.contactNumber,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      partySize: Number(formData.numberOfGuests),
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong.");
      }

      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        date: "",
        time: "",
        numberOfGuests: 1,
      });
      setMessage("Your reservation has been successfully placed!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Failed to make a reservation: ${error.message}`);
      } else {
        setMessage("Failed to make a reservation. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="sm">
        {/* Heading */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 300,
            letterSpacing: "0.15em",
            color: "var(--primary)",
            mb: 3,
            textAlign: "center",
          }}
        >
          Reserve Your Table
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--muted)",
            mb: 6,
            lineHeight: 1.8,
            textAlign: "center",
          }}
        >
          Experience our curated coffee and culinary delights in a relaxing
          atmosphere. Book a table for your next visit.
        </Typography>

        {/* Form */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            backgroundColor: "var(--secondary)",
            mb: 6,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: "var(--muted)" } }}
            />
            <TextField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Contact Number"
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Number of Guests"
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleInputChange}
              inputProps={{ min: 1 }}
              required
              fullWidth
              variant="outlined"
            />

            <Button
              type="submit"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                px: 4,
                borderRadius: "999px",
                backgroundColor: "var(--primary)",
                color: "var(--foreground)",
                fontWeight: 600,
                letterSpacing: 2,
                "&:hover": {
                  opacity: 0.9,
                  backgroundColor: "var(--primary)",
                },
              }}
            >
              {loading ? "Reserving..." : "Confirm Reservation"}
            </Button>
          </form>

          {/* Feedback */}
          {message && (
            <Alert
              severity={message.includes("Failed") ? "error" : "success"}
              sx={{ mt: 3, borderRadius: 2 }}
            >
              {message}
            </Alert>
          )}
        </Paper>

        {/* Image Below Form */}
        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          }}
        >
          <img
            src="https://placehold.co/1000x800/2d2d2d/a1a1a1?text=Make+a+Reservation"
            alt="Elegant cafe table with a reservation sign"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
