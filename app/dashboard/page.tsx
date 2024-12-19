"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  InputAdornment,
  Stack,
  Chip,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  Search as SearchIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  ViewList as PlanIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useDebounce } from '@/app/hooks/useDebounce';

interface BookingNote {
  content: string;
  createdAt: string;
  createdBy: string;
}

interface Booking {
  _id: string;
  name: string;
  phone: string;
  persons: number;
  preferableDate: string;
  plan: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes: BookingNote[];
  isMarked: boolean;
  lastUpdated: string;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  // const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [markedFilter, setMarkedFilter] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        status: statusFilter,
        isMarked: markedFilter,
      });

      const response = await fetch(`/api/bookings/get?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleToggleMark = async (
    bookingId: string,
    currentMarked: boolean
  ) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isMarked: !currentMarked }),
      });
      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error("Error toggling mark:", error);
    }
  };

  const handleAddNote = async () => {
    if (!selectedBooking || !newNote.trim()) return;

    try {
      const response = await fetch(`/api/bookings/${selectedBooking._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote }),
      });

      if (response.ok) {
        setNewNote("");
        fetchBookings();
        const data = await response.json();
        setSelectedBooking(data.booking);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (session?.user?.role !== "admin") {
      router.push("/unauthorized");
    }

    if (session?.user?.role === "admin") {
      fetchBookings();
    }
  }, [session, status, router, page, search, statusFilter, markedFilter]);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch]);

  const stats = {
    totalBookings: bookings.length,
    totalPersons: bookings.reduce((acc, booking) => acc + booking.persons, 0),
    uniquePlans: new Set(bookings.map((b) => b.plan)).size,
  };

  // const fadeIn = {
  //   initial: { opacity: 0, y: 20 },
  //   animate: { opacity: 1, y: 0 },
  //   transition: { duration: 0.5 },
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
      </div>
    );
  }

  return (
    <Box sx={{ bgcolor: "grey.100", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            Bookings Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={fetchBookings}
          >
            Refresh Data
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            {
              title: "Total Bookings",
              value: stats.totalBookings,
              icon: <CalendarIcon />,
              color: "primary.main",
            },
            {
              title: "Total Persons",
              value: stats.totalPersons,
              icon: <GroupIcon />,
              color: "success.main",
            },
            {
              title: "Unique Plans",
              value: stats.uniquePlans,
              icon: <PlanIcon />,
              color: "secondary.main",
            },
          ].map((stat) => (
            <Grid item xs={12} md={4} key={stat.title}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        bgcolor: stat.color,
                        color: "white",
                        p: 1.5,
                        borderRadius: 2,
                        mr: 2,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        {stat.title}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                fullWidth
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                fullWidth
                value={markedFilter}
                onChange={(e) => setMarkedFilter(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All Bookings</MenuItem>
                <MenuItem value="true">Marked</MenuItem>
                <MenuItem value="false">Unmarked</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Paper>

        {/* Bookings Table */}
        <Paper>
          <Box sx={{ overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mark</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Persons</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleToggleMark(booking._id, booking.isMarked)
                        }
                        color="warning"
                      >
                        {booking.isMarked ? <StarIcon /> : <StarBorderIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.phone}</TableCell>
                    <TableCell>{booking.persons}</TableCell>
                    <TableCell>
                      {new Date(booking.preferableDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip label={booking.plan} color="success" size="small" />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusUpdate(booking._id, e.target.value)
                        }
                        size="small"
                        sx={{
                          "& .MuiSelect-select": {
                            py: 0.5,
                            px: 1,
                          },
                        }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="confirmed">Confirmed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => setSelectedBooking(booking)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Pagination */}
          <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                variant="outlined"
              >
                Previous
              </Button>
              <Typography>
                Page {page} of {totalPages}
              </Typography>
              <Button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                variant="outlined"
              >
                Next
              </Button>
            </Stack>
          </Box>
        </Paper>

        {/* Notes Dialog */}
        <Dialog
          open={selectedBooking !== null}
          onClose={() => setSelectedBooking(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Notes for {selectedBooking?.name}
            <IconButton
              onClick={() => setSelectedBooking(null)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              {selectedBooking?.notes.map((note, index) => (
                <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body1">{note.content}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    By {note.createdBy} on{" "}
                    {new Date(note.createdAt).toLocaleString()}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <TextField
              fullWidth
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a note..."
              size="small"
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleAddNote}
              disabled={!newNote.trim()}
            >
              Add Note
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
