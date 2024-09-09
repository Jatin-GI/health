import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MyAppointment = () => {
  const { appointmentId } = useParams(); // Get the appointmentId from the URL params
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(appointmentId);
  // Fetch appointment details when the component mounts
  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/appointments/${appointmentId}`
      );
      const info = response.data;
      setAppointmentDetails(info);
      setLoading(false);
      console.log(info);
    } catch (err) {
      console.error("Error fetching appointment details:", err);
      setError("Failed to load appointment details.");
      setLoading(false);
    }
  };
  console.log(setAppointmentDetails);

  useEffect(() => {
    if (appointmentId) {
      fetchAppointmentDetails();
    }
  }, [appointmentId]);

  if (loading) {
    return <div>Loading appointment details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    appointmentDetails && (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Appointment Details</h1>
        <div className="border p-4 rounded-lg bg-gray-100">
          <p className="text-lg">
            <strong>Doctor:</strong> {appointmentDetails.name}
          </p>
          <p className="text-lg">
            <strong>Date:</strong>{" "}
            {new Date(appointmentDetails.date).toDateString()}
          </p>
          <p className="text-lg">
            <strong>Time:</strong> {appointmentDetails.time}
          </p>
          <p className="text-lg">
            <strong>Patient Name:</strong>
          </p>
        </div>
      </div>
    )
  );
};

export default MyAppointment;
