import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";

const AllAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments"
      ); // API call to fetch all appointments
      setAppointments(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load appointments.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(); // Fetch all appointments when the component mounts
  }, []);

  // Delete an appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/appointments/${appointmentId}`
      );
      // Remove the deleted appointment from the state
      setAppointments(
        appointments.filter((appointment) => appointment._id !== appointmentId)
      );
      alert("Appointment deleted successfully!");
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("There was an error deleting the appointment.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        All Appointments
      </h1>

      {appointments.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border border-gray-300 rounded-lg p-6 bg-white shadow-md flex flex-col justify-between "
            >
              {/* Doctor Image with background */}
              <div className=" border-b-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                <img
                  src={appointment.image} // assuming doctorImage is the property for the image URL
                  alt="Doctor"
                  className="bg-blue-50"
                />
              </div>

              <div className="mb-4 mt-4">
                <p className="text-lg font-medium">
                  <span className="font-semibold ">Appointment ID:</span>{" "}
                  {appointment._id}
                </p>
                <p className="text-lg mt-2">
                  <span className="font-semibold">Doctor:</span>{" "}
                  {appointment.name}
                </p>
                <p className="text-lg mt-2">
                  <span className="font-semibold">Date:</span>{" "}
                  {appointment.date}
                </p>
                <p className="text-lg mt-2">
                  <span className="font-semibold">Time:</span>{" "}
                  {appointment.time}
                </p>
                <p className="text-lg mt-2">
                  <span className="font-semibold">Speciality:</span>{" "}
                  {appointment.speciality}
                </p>
              </div>

              {/* HR tag for separation */}
              <hr className="my-4" />

              <div className="flex justify-center">
                <button
                  onClick={() => deleteAppointment(appointment._id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <MdDeleteOutline className="h-8 w-8" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No appointments found.</p>
      )}
    </div>
  );
};

export default AllAppointment;
