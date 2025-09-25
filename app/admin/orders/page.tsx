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
  Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface OrderItem {
  menuItem: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id?: string;
  name: string;
  contactNumber: string;
  email: string;
  totalAmount: number;
  deliveryMethod: "Dine-in" | "Delivery";
  tableNumber?: number;
  deliveryAddress?: string;
  order: OrderItem[];
  status:
    | "Pending"
    | "Confirmed"
    | "Preparing"
    | "Ready for pickup/delivery"
    | "Completed"
    | "Cancelled";
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Order | null>(null);
  const [formData, setFormData] = useState<Partial<Order>>({
    status: "Pending",
  });

  // Fetch orders
  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    if (data.success) setOrders(data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Open dialog for updating status
  const handleOpen = (order: Order) => {
    setEditing(order);
    setFormData({ _id: order._id, status: order.status });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Handle status update
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (editing && formData._id) {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
        handleClose();
      }
    }
  };

  // Delete order
  const handleDelete = async (id: string) => {
    const res = await fetch("/api/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    const data = await res.json();
    if (data.success) fetchOrders();
  };

  // Status chip color
  const statusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "default";
      case "Confirmed":
        return "info";
      case "Preparing":
        return "warning";
      case "Ready for pickup/delivery":
        return "secondary";
      case "Completed":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Table/Address</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.name}</TableCell>
                <TableCell>
                  {order.contactNumber}
                  <br />
                  {order.email}
                </TableCell>
                <TableCell>{order.deliveryMethod}</TableCell>
                <TableCell>
                  {order.deliveryMethod === "Dine-in"
                    ? `Table ${order.tableNumber}`
                    : order.deliveryAddress}
                </TableCell>
                <TableCell>
                  {order.order.map((item, idx) => (
                    <div key={idx}>
                      {item.name} x{item.quantity} (${item.price})
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <b>₹{order.totalAmount}</b>
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={statusColor(order.status)}
                  />
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(order)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => order._id && handleDelete(order._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Status Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="dense"
            label="Status"
            name="status"
            fullWidth
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Preparing">Preparing</MenuItem>
            <MenuItem value="Ready for pickup/delivery">
              Ready for pickup/delivery
            </MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
