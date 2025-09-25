"use client";

import { Box, Button, Typography, Container } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "var(--foreground)",
          px: 3,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 300,
            letterSpacing: "0.2em",
            mb: 3,
            fontSize: { xs: "2.5rem", md: "4rem" },
          }}
        >
          The Art of Coffee
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 300,
            maxWidth: "40rem",
            mx: "auto",
            mb: 6,
            lineHeight: 1.7,
          }}
        >
          Crafted with passion, served with purpose. Discover a moment of calm
          in every cup.
        </Typography>

        <Button
          href="/menu"
          sx={{
            backgroundColor: "var(--primary)",
            color: "var(--foreground)",
            px: 5,
            py: 1.8,
            borderRadius: "999px",
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: 2,
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: "var(--primary)",
              opacity: 0.9,
              boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
            },
          }}
        >
          Explore Our Menu
        </Button>
      </Container>
    </Box>
  );
}
