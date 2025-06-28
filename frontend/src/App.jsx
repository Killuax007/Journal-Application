import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protect-route";
import AddJournal from "./components/add-journal";
import UpdateJournal from "./components/update-journal";

import DeleteJournal from "./components/delete-journal";
function App() {
  return (
    <div className="bg-neutral-950 min-h-screen  text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<Otpverification />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-journal"
          element={
            <ProtectedRoute>
              <AddJournal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delete-journal/:id"
          element={
            <ProtectedRoute>
              <DeleteJournal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-journal/:id"
          element={
            <ProtectedRoute>
              <UpdateJournal />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
