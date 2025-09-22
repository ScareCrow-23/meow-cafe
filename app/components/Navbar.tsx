"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(23, 23, 23, 0.8)", // matches secondary/80
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Brand */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h5"
            sx={{
              color: "var(--foreground)",
              fontWeight: 300,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily: "inherit",
            }}
          >
            The Daily Grind
          </Typography>
        </Link>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          {["Home", "Menu", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "var(--foreground)",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    width: 0,
                    height: "1px",
                    backgroundColor: "var(--primary)",
                    transition: "width 0.3s ease",
                  },
                  "&:hover:after": {
                    width: "100%",
                  },
                }}
              >
                {item}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Order Button */}
        <Button
          href="/order"
          sx={{
            backgroundColor: "var(--primary)",
            color: "var(--foreground)",
            px: 4,
            py: 1.5,
            borderRadius: "999px",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "var(--primary)",
              opacity: 0.9,
            },
          }}
        >
          Order Now
        </Button>

        {/* Mobile Menu Icon */}
        <IconButton
          edge="end"
          sx={{
            display: { xs: "flex", md: "none" },
            color: "var(--foreground)",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
