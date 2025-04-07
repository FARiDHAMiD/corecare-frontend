import { useContext, useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import Spinner from "./Spinner";
import AuthContext from "../Context/AuthContext";

const PatientsAppointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAppointments = async () => {
    let response = await AxiosInstance.get(`appointments/`);
    setAppointments(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="card mb-4 mb-md-0">
      <div className="card-body">
        {loading ? (
          <Spinner />
        ) : (
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                {user.role !== "PATIENT" && <th>Patient</th>}
                {user.role !== "DOCTOR" && <th>Doctor</th>}
                <th scope="col">Department</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment.id}>
                  <th scope="row">{index + 1}</th>
                  {user.role !== "PATIENT" && (
                    <td>{appointment.patient_name}</td>
                  )}
                  {user.role !== "DOCTOR" && <td>{appointment.doctor_name}</td>}
                  <td>{appointment.department}</td>
                  <td>{new Date(appointment.time).toLocaleString()}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientsAppointments;
