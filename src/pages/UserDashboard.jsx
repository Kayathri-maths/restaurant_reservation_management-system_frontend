import {
  CalendarPlus,
  Trash2,
  LogOut,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";
import LoadingSpinner from "../components/LoadingSpinner";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "",
    guests: "",
  });

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const loadReservations = async () => {
    try {
      const response = await api.get("/api/reservations");
      if (response.data.success) {
        setReservations(response.data.data);
      }
    } catch (error) {
      setToast({
        message: "Failed to load reservations",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.timeSlot || !formData.guests) {
      setToast({ message: "Please fill in all fields", type: "error" });
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post("/api/reservations", formData);

      if (response.data.success) {
        setToast({
          message: "Reservation created successfully!",
          type: "success",
        });
        setFormData({ date: "", timeSlot: "", guests: "" });
        loadReservations();
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create reservation";
      setToast({ message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }

    try {
      const response = await api.delete(`/api/reservations/${id}`);

      if (response.data.success) {
        setToast({
          message: "Reservation cancelled successfully",
          type: "success",
        });
        loadReservations();
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to cancel reservation";
      setToast({ message, type: "error" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                My Reservations
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, {user?.name}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CalendarPlus className="text-blue-600" />
            Book a Table
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                min={getTodayDate()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slot
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                value={formData.timeSlot}
                onChange={(e) =>
                  setFormData({ ...formData, timeSlot: e.target.value })
                }
                disabled={submitting}
              >
                <option value="">Select time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                min="1"
                max="20"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="2"
                value={formData.guests}
                onChange={(e) =>
                  setFormData({ ...formData, guests: e.target.value })
                }
                disabled={submitting}
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <CalendarPlus className="w-5 h-5" />
                )}
                {submitting ? "Booking..." : "Book Table"}
              </button>
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Reservations</h2>

          {reservations.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No reservations yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Book your first table above!
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation._id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-lg font-semibold">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        {formatDate(reservation.date)}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {reservation.timeSlot}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        {reservation.guests}{" "}
                        {reservation.guests === 1 ? "Guest" : "Guests"}
                      </div>
                      <div className="text-sm text-gray-500">
                        Table #{reservation.table.tableNumber} (Capacity:{" "}
                        {reservation.table.capacity})
                      </div>
                    </div>

                    <button
                      onClick={() => handleCancel(reservation._id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition cursor-pointer"
                      title="Cancel reservation"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
