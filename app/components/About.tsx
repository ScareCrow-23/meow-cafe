"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function About() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 } }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 6, md: 12 },
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            flex: 1,
            height: { xs: 300, md: 500 },
            minWidth: { md: "50%" },
          }}
        >
          <Image
            src="/story.jpg"
            alt="Interior of the cafe with a customer enjoying a cup of coffee"
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        {/* Text Section */}
        <Box
          sx={{
            flex: 1,
            px: { xs: 1, md: 0 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 300,
              letterSpacing: "0.15em",
              mb: 4,
              color: "var(--primary)",
            }}
          >
            Our Passion for Coffee
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "var(--muted)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              mb: 3,
            }}
          >
            At <strong>The Daily Grind</strong>, we believe coffee is more than
            just a beverage—it’s an experience. Our journey began with a simple
            passion for crafting the perfect cup, and it has grown into a
            commitment to quality, from bean to brew.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "var(--muted)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              mb: 5,
            }}
          >
            We meticulously source our beans from sustainable farms around the
            globe, ensuring every sip tells a story of care and dedication. It’s
            a taste of artistry, served just for you.
          </Typography>

          <Button
            href="/about"
            sx={{
              color: "var(--foreground)",
              fontWeight: 600,
              fontSize: "0.9rem",
              letterSpacing: 2,
              textTransform: "uppercase",
              px: 3,
              py: 1.2,
              borderRadius: "999px",
              backgroundColor: "var(--primary)",
              "&:hover": {
                opacity: 0.9,
                backgroundColor: "var(--primary)",
              },
            }}
          >
            Learn More About Our Story →
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
