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
  Menu,
  ListItemIcon,
  ListItemText,
  CircularProgress,
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
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useDebounce } from "@/app/hooks/useDebounce";

interface BookingNote {
  _id: string;
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

interface NoteActionPayload {
  noteAction: "add" | "update" | "delete";
  note?: string;
  noteId?: string;
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
  const [newNote, setNewNote] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [markedFilter, setMarkedFilter] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [editingNote, setEditingNote] = useState<{
    id: string;
    content: string;
  } | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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
      setActionLoading(bookingId);
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
    } finally {
      setActionLoading(null);
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

  const handleNoteAction = async (
    action: "add" | "update" | "delete",
    noteId?: string
  ) => {
    if (!selectedBooking) return;

    try {
      const payload: NoteActionPayload = {
        noteAction: action,
      };

      if (action === "add") {
        payload.note = newNote;
      } else if (action === "update" && editingNote) {
        payload.noteId = editingNote.id;
        payload.note = editingNote.content;
      } else if (action === "delete" && noteId) {
        payload.noteId = noteId;
      }

      const response = await fetch(`/api/bookings/${selectedBooking._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedBooking(data.booking);
        setNewNote("");
        setEditingNote(null);
        setAnchorEl(null);
        fetchBookings(); // Refresh the bookings list
      }
    } catch (error) {
      console.error("Error handling note:", error);
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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "grey.100",
        }}
      >
        <CircularProgress size={60} />
      </Box>
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
                        disabled={actionLoading === booking._id}
                        sx={{
                          "& .MuiSelect-select": {
                            py: 0.5,
                            px: 1,
                          },
                        }}
                      >
                        {actionLoading === booking._id ? (
                          <CircularProgress size={20} sx={{ mx: 1 }} />
                        ) : (
                          <>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="confirmed">Confirmed</MenuItem>
                            <MenuItem value="cancelled">Cancelled</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                          </>
                        )}
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

        {/* Updated Notes Dialog */}
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
                <Paper
                  key={note._id || index}
                  variant="outlined"
                  sx={{ p: 2, position: "relative" }}
                >
                  {editingNote?.id === note._id ? (
                    <TextField
                      fullWidth
                      multiline
                      value={editingNote.content}
                      onChange={(e) => {
                        if (editingNote) {
                          setEditingNote({
                            id: editingNote.id,
                            content: e.target.value,
                          });
                        }
                      }}
                      size="small"
                      autoFocus
                    />
                  ) : (
                    <Typography variant="body1">{note.content}</Typography>
                  )}
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                    mt={1}
                  >
                    By {note.createdBy} on{" "}
                    {new Date(note.createdAt).toLocaleString()}
                  </Typography>

                  <IconButton
                    size="small"
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                      setSelectedNote(note._id);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Paper>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            {editingNote ? (
              <>
                <Button onClick={() => setEditingNote(null)} color="inherit">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleNoteAction("update")}
                  disabled={!editingNote.content.trim()}
                >
                  Update Note
                </Button>
              </>
            ) : (
              <>
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
                  onClick={() => handleNoteAction("add")}
                  disabled={!newNote.trim()}
                >
                  Add Note
                </Button>
              </>
            )}
          </DialogActions>

          {/* Note Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(null);
              setSelectedNote(null);
            }}
          >
            <MenuItem
              onClick={() => {
                const note = selectedBooking?.notes.find(
                  (n) => n._id === selectedNote
                );
                if (note) {
                  setEditingNote({ id: note._id, content: note.content });
                }
                setAnchorEl(null);
              }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (selectedNote) {
                  handleNoteAction("delete", selectedNote);
                }
              }}
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Dialog>
      </Container>
    </Box>
  );
}
