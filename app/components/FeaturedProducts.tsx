"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const featuredItems = [
  {
    name: "Espresso Elegance",
    description: "A rich, full-bodied single-origin espresso.",
    price: "$4.50",
    image: "https://placehold.co/600x600/171717/ededed?text=Espresso",
  },
  {
    name: "Artisan Croissant",
    description: "Flaky, buttery, and baked to golden perfection.",
    price: "$3.75",
    image: "https://placehold.co/600x600/171717/ededed?text=Croissant",
  },
  {
    name: "Velvet Latte",
    description: "Our signature latte with a smooth, velvety texture.",
    price: "$5.25",
    image: "https://placehold.co/600x600/171717/ededed?text=Latte",
  },
];

export default function FeaturedMenu() {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 10, md: 16 }, textAlign: "center" }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 300,
            letterSpacing: "0.15em",
            mb: 8,
            color: "var(--primary)",
          }}
        >
          Featured Selections
        </Typography>

        {/* Flexbox for Featured Items */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 6, md: 8 },
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {featuredItems.map((item, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                backgroundColor: "var(--secondary)",
                borderRadius: 3,
                boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-6px)" },
                maxWidth: 360,
                margin: "0 auto",
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{
                  borderRadius: "12px 12px 0 0",
                  height: 280,
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ px: 3, py: 4, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "var(--foreground)", mb: 1 }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--muted)", fontStyle: "italic", mb: 2 }}
                >
                  {item.description}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, color: "var(--primary)" }}
                >
                  {item.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* View Full Menu Button */}
        <Button
          component={Link}
          href="/menu"
          sx={{
            mt: 8,
            backgroundColor: "var(--primary)",
            color: "var(--foreground)",
            px: 6,
            py: 1.8,
            borderRadius: "999px",
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: 2,
            textTransform: "uppercase",
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            "&:hover": {
              opacity: 0.9,
              backgroundColor: "var(--primary)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
            },
          }}
        >
          View Full Menu
        </Button>
      </Container>
    </Box>
  );
}
