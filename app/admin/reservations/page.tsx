"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface Reservation {
  _id?: string;
  name: string;
  partySize: number;
  contactNumber: string;
  email: string;
  date: string; // ISO string
  time: string;
  table?: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Reservation | null>(null);
  const [formData, setFormData] = useState<Reservation>({
    name: "",
    partySize: 1,
    contactNumber: "",
    email: "",
    date: "",
    time: "",
    table: "",
    notes: "",
    status: "pending",
  });

  // Fetch reservations
  const fetchReservations = async () => {
    const res = await fetch("/api/reservations");
    const data = await res.json();
    if (data.success) setReservations(data.data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Open Add/Edit dialog
  const handleOpen = (reservation?: Reservation) => {
    if (reservation) {
      setEditing(reservation);
      setFormData(reservation);
    } else {
      setEditing(null);
      setFormData({
        name: "",
        partySize: 1,
        contactNumber: "",
        email: "",
        date: "",
        time: "",
        table: "",
        notes: "",
        status: "pending",
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save (Create or Update)
  const handleSave = async () => {
    if (editing) {
      // Update
      const res = await fetch("/api/reservations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        fetchReservations();
        handleClose();
      }
    } else {
      // Create
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        fetchReservations();
        handleClose();
      }
    }
  };

  // Delete reservation
  const handleDelete = async (id: string) => {
    const res = await fetch("/api/reservations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    const data = await res.json();
    if (data.success) fetchReservations();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reservations
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        Add Reservation
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Party Size</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Table</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation._id}>
                <TableCell>{reservation.name}</TableCell>
                <TableCell>{reservation.partySize}</TableCell>
                <TableCell>{reservation.contactNumber}</TableCell>
                <TableCell>{reservation.email}</TableCell>
                <TableCell>
                  {new Date(reservation.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>{reservation.table}</TableCell>
                <TableCell>{reservation.notes}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(reservation)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      reservation._id && handleDelete(reservation._id)
                    }
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editing ? "Edit Reservation" : "Add Reservation"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Party Size"
            name="partySize"
            type="number"
            fullWidth
            value={formData.partySize}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Contact Number"
            name="contactNumber"
            fullWidth
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.date ? formData.date.split("T")[0] : ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Time"
            name="time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.time}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Table"
            name="table"
            fullWidth
            value={formData.table}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Notes"
            name="notes"
            fullWidth
            multiline
            rows={2}
            value={formData.notes}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            label="Status"
            name="status"
            fullWidth
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editing ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
