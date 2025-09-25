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
import Image from "next/image";

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

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
    <Box
      component="section"
      sx={{ py: { xs: 10, md: 16 }, bgcolor: "var(--background)" }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 500,
            textAlign: "center",
            mb: 2,
            color: "var(--primary)",
            letterSpacing: "2px",
          }}
        >
          Reserve Your Table
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "var(--muted)",
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.8,
          }}
        >
          Experience our curated coffee and culinary delights in a relaxing
          atmosphere. Book a table for your next visit.
        </Typography>

        {/* Flex Layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "stretch",
          }}
        >
          {/* Form */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: { xs: 3, md: 4 },
              borderRadius: "var(--radius)",
              bgcolor: "var(--secondary)",
              boxShadow: "var(--shadow)",
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
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{ style: { color: "var(--muted)" } }}
                InputProps={{
                  style: {
                    backgroundColor: "var(--secondary)",
                    color: "var(--foreground)",
                  },
                }}
              />
              <TextField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: "var(--muted)" } }}
                InputProps={{
                  style: {
                    backgroundColor: "var(--secondary)",
                    color: "var(--foreground)",
                  },
                }}
              />
              <TextField
                label="Contact Number"
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: "var(--muted)" } }}
                InputProps={{
                  style: {
                    backgroundColor: "var(--secondary)",
                    color: "var(--foreground)",
                  },
                }}
              />
              <TextField
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                  style: { color: "var(--muted)" },
                }}
                InputProps={{
                  style: {
                    backgroundColor: "var(--secondary)",
                    color: "var(--foreground)",
                  },
                }}
              />
              <TextField
                label="Time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                  style: { color: "var(--muted)" },
                }}
                InputProps={{
                  style: {
                    backgroundColor: "var(--secondary)",
                    color: "var(--foreground)",
                  },
                }}
              />
              <TextField
                label="Number of Guests"
                type="number"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                fullWidth
                required
                inputProps={{ min: 1 }}
                InputLabelProps={{ style: { color: "var(--muted)" } }}
                InputProps={{
                  style: {
                    backgroundColor: "var(--secondary)",
                    color: "var(--foreground)",
                  },
                }}
              />

              <Button
                type="submit"
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.4,
                  borderRadius: "var(--radius)",
                  fontWeight: 600,
                  letterSpacing: 1,
                  backgroundColor: "var(--primary)",
                  color: "var(--foreground)",
                  "&:hover": {
                    opacity: 0.9,
                    transform: "translateY(-1px)",
                    backgroundColor: "var(--primary)",
                  },
                }}
              >
                {loading ? "Reserving..." : "Confirm Reservation"}
              </Button>
            </form>

            {message && (
              <Alert
                severity={message.includes("Failed") ? "error" : "success"}
                sx={{ mt: 3, borderRadius: 2 }}
              >
                {message}
              </Alert>
            )}
          </Paper>

          {/* Image */}
          <Box
            sx={{
              flex: 1,
              borderRadius: "var(--radius)",
              overflow: "hidden",
              position: "relative",
              minHeight: { xs: 250, md: "100%" },
              boxShadow: "var(--shadow)",
            }}
          >
            <Image
              src="/reservation.jpg"
              alt="Elegant cafe table with a reservation sign"
              fill
              style={{
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
