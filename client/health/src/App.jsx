import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Login from "./pages/Login";
import MyAppointment from "./pages/MyAppointment";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import NavBar from "./components/NavBar";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import AllAppointment from "./pages/AllAppointment";
import { useEffect, useState } from "react";
import axios from "axios";
// Protected route for authenticated users
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking auth
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Redirect authenticated users away from login/signup
const AuthRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check",
          { withCredentials: true }
        );
        console.log(response);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking auth
  }

  return isAuthenticated ? <Navigate to="/my-profile" /> : children;
};
function App() {
  return (
    <div className="mx-6 sm:mx-[10%]">
      <NavBar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/doctor/:speciality" element={<Doctor />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />{" "}
            </AuthRoute>
          }
        />
        {/* <Route path="/my-appointment" element={<MyAppointment />} /> */}
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointment/:docId"
          element={
            <PrivateRoute>
              <Appointment />
            </PrivateRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/appointment-details/:appointmentId"
          element={
            <PrivateRoute>
              <MyAppointment />
            </PrivateRoute>
          } // Route for appointment details
        />{" "}
        <Route
          path="/my-appointments"
          element={
            <PrivateRoute>
              <AllAppointment />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
